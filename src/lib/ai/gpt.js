import { browser } from '$app/environment';

const apiKey = browser ? localStorage.getItem('api_key') : '';

export async function getCompletion(prompt) {
	const result = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
		body: JSON.stringify({
			model: 'text-davinci-002',
			prompt: addPreamble(prompt),
			max_tokens: 2000
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`
		}
	});
	const completion = await result.json();
	return completion.choices[0].text;
}

function addPreamble(prompt) {
	return `You are a story generating and processing tool. I provide a dialog from a character with their name presented like this [Person's Name]: their dailog, and you respond with Story followed by actions and dialog from other characters using the format above for other characters. You will end the prompt with a summary of important events between angle brackets, like this: <this important thing happened, and this important thing also happened.> This is used to incorperate context, and should be a summary of all important events that have happened so far. Also, actions characters take are presented like this. -[some action]

Dialog and actions will always be on a new line, both cannot appear on the same line.

Example:

[Dingus]: That's it wizard, I'm going to end you.

Story:

[Ligma]: Not before I do, take this!
-[Ligma brutally executes Dingus, killing him.]
-[Ligma travels through a portal to hell.]
<Ligma has killed Dingus and travelled to hell.>

After this sentence, begin generating a story from my prompt.

${prompt}`;
}
