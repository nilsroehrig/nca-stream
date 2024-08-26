import { EventSourceParserStream } from 'eventsource-parser/stream';

export async function POST({ request, platform }) {
	const body = await request.json();
	const input = body.input ?? null;

	if (typeof input != 'string' || input.length == 0) {
		return new Response(
			JSON.stringify({
				errors: {
					input: 'Invalid input'
				}
			}),
			{
				status: 400
			}
		);
	}

	const userMessage = {
		role: 'user',
		content: input
	};

	const resultStream = await platform!.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
		messages: [userMessage],
		stream: true
	});

	return new Response(
		resultStream,
		{
			headers: {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache'
			}
		}
	);
}
