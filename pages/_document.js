import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDoc extends Document {
	static async getInitialProps (ctx) {
		const props = await Document.getInitialProps(ctx)
		return { ...props }
	}

	render() {
		return (
		<html>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="stylesheet" href="/static/main.css" />
			</Head>

			<body>
				<Main />
				<NextScript />
			</body>

			<script src="/static/bundle.js" />
			<script src="//localhost:9091" />
		</html>
		)
	}
}