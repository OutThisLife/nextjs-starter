const
	{ createServer } = require('http'),
	{ parse } = require('url'),
	next = require('next'),
	dotenv = require('dotenv'),

	dev = process.env.NODE_ENV !== 'production',
	app = next({ dev }),
	handle = app.getRequestHandler()

dotenv.load()

app.prepare().then(() => {
	createServer((req, res) => {
		const
			parsedUrl = parse(req.url, true),
			{ pathname, query } = parsedUrl

		if (!/(\.|webpack)/.test(pathname))
			app.render(req, res, '/index', query)

		else handle(req, res, parsedUrl)
	}).listen(3000, err => {
		if (err) throw err
		console.log('Listening on http://localhost:3000')
	})
})