import moo from 'moo';

const storyLexer = moo.compile({
	prelude: /Story:/,
	newline: { match: /\r?\n/, lineBreaks: true },
	comment: { match: /\/\/.*/, value: (x) => x.slice(3) },
	character: { match: /\[[^\]]+]/, value: (x) => x.slice(1, -1) },
	dialog: { match: /: .*/, value: (x) => x.slice(2) },
	action: { match: /-\[.*]/, value: (x) => x.slice(2, -1) },
	context: { match: /<.*>/, value: (x) => x.slice(1, -1) }
});

function parse(text) {
	let tokens = [];
	storyLexer.reset(text.trim());
	let token;
	while ((token = storyLexer.next())) {
		tokens.push(token);
	}
	return tokens;
}

export { parse };
