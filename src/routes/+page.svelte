<script lang="ts">
	import { ChatMessage } from '$lib/ChatMessage.svelte';
	import { EventSourceParserStream } from 'eventsource-parser/stream';

	let messages = $state(new Array<ChatMessage>());
	let messageInput = $state('');

	async function onsubmit(event: SubmitEvent) {
		event.preventDefault();

		const userMessage = new ChatMessage('user', messageInput);
		messages.push(userMessage);

		messageInput = '';

		const response = await fetch('/api/stream', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ messages })
		});

		if (!response.ok) {
			return;
		}

		const resultStream = response
			.body!.pipeThrough(new TextDecoderStream())
			.pipeThrough(new EventSourceParserStream());
		const reader = resultStream.getReader();

		const assistantMessage = new ChatMessage('assistant', '');
		messages.push(assistantMessage);

		let done, value;
		while (!done) {
			({ value, done } = await reader.read());

			if (value!.data === '[DONE]') {
				return;
			}

			const { response } = JSON.parse(value!.data);

			assistantMessage.content += response;
		}
	}
</script>

<article>
	<dl>
		{#each messages as message}
			<div class={message.role}>
				<dt>{message.role}</dt>
				<dd>{message.content}</dd>
			</div>
		{/each}
	</dl>

	<form method="post" role="group" {onsubmit}>
		<input
			type="text"
			name="input"
			placeholder="Your topic, question, command..."
			bind:value={messageInput}
		/>
		<button type="submit">Send</button>
	</form>
</article>

<style>
	dl {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	dl > div {
		width: 80%;
	}

	dt {
		font-weight: bold;
	}

	dd {
		margin-left: 0;
	}

	.assistant {
		margin-right: auto;
	}

	.user {
		padding: var(--pico-spacing);
		background: rgba(0, 0, 0, 0.1);
		border-radius: var(--pico-border-radius);
		margin-left: auto;
	}
</style>
