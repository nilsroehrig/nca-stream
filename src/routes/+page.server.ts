import { fail } from '@sveltejs/kit';

export const actions = {
	async default({ request, platform }) {
		const formData = await request.formData();
		const input = formData.get('input');

		if (typeof input != 'string' || input.length == 0) {
			return fail(400, {
        errors: {
          input: 'Invalid input'
        }
      });
		}

    const userMessage = {
      role: "user",
      content: input
    }

    const result = await platform!.env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
      messages: [userMessage]
    })

    return {
      messages: [
        userMessage,
        {
          role: "assistant",
          content: result.response
        }
      ]
    }
	}
};
