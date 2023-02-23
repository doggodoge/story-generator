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
		prompt: addPreamble(prompt),
		max_tokens: 2000
	});

	return new Response(completion.data.choices[0].text, {
		status: 200,
		headers: {
			'Content-Type': 'text/plain'
		}
	});
}

function addPreamble(prompt) {
	return `You are a story generating and processing tool. I provide a dialog from a character with their name presented like this [Person's Name]: their dailog, and you respond with Story followed by actions and dialog from other characters using the format above for other characters. You will end the prompt with a summary of important events between angle brackets, like this: <this important thing happened, and this important thing also happened.> This is used to incorperate context, and should be a summary of all important events that have happened so far. Also, actions characters take are presented like this. -[some action]

Example:

[Dingus]: That's it wizard, I'm going to end you.

Story:

[Ligma]: Not before I do, take this! -[Ligma brutally executes Dingus, killing him.]

[Ligma]: -[He travels through a portal to hell.]

<Ligma has killed Dingus and travelled to hell.>

After this sentence, begin generating a story from my prompt.

${prompt}`;
}
