require('es6-promise').polyfill()
require('isomorphic-fetch')

import Document, { Head, Main, NextScript } from 'next/document'
import Store from '../stores/Store'

import Header from '../components/Header'
import Footer from '../components/Footer'

export default class CustomDocument extends Document {
	render() {
		return (
		<html>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="stylesheet" href="/static/main.css" />
			</Head>

			<body>
				<Header />
				<Main />
				<Footer />

				<NextScript />
				<script src="/static/bundle.js" />
			</body>
		</html>
		)
	}
}