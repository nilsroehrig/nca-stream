<script>
	let { form } = $props();
</script>

<article>
	{#if form && form.messages}
		<dl>
			{#each form.messages as message}
				<div class={message.role}>
					<dt>{message.role}</dt>
					<dd>{message.content}</dd>
				</div>
			{/each}
		</dl>
	{/if}

	<form method="post" role="group">
		<input type="text" name="input" placeholder="Your topic, question, command..." />
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
