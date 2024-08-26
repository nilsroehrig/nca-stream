import { EventSourceParserStream } from 'eventsource-parser/stream';

export async function POST({ request, platform }) {
	const body = await request.json();
	const messages = body.messages ?? null;

	if (!messages) {
		return new Response('No messages provided', { status: 400 });
	}

	const resultStream = await platform!.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
		messages,
		stream: true
	});

	return new Response(resultStream, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache'
		}
	});
}
