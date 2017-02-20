import Document, { Head, Main, NextScript } from 'next/document'

import Header from '../components/header'
import Footer from '../components/footer'

// ---------------------------------------------

export default class CustomDocument extends Document {
	static async getInitialProps(ctx) {
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
				<Header />
				<Main {...this.props} />
				<Footer />
				<NextScript />
				<script src="/static/bundle.js" />
			</body>
		</html>
		)
	}
}