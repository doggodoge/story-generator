import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	apiKey: import.meta.env.VITE_OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const prompt = await request.text();

	const completion = await openai.createCompletion({
		model: 'text-davinci-002',
		prompt,
		max_tokens: 2000
	});

	return new Response(completion.data.choices[0].text, {
		status: 200,
		headers: {
			'Content-Type': 'text/plain'
		}
	});
}
