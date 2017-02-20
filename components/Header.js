import React from 'react'
import Link from 'next/link'

// ---------------------------------------------

export default class Header extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
		<header>
			<h1>Logo</h1>

			<nav>
				<Link href="/">Home</Link>
				<Link href="/sample">Sample</Link>
			</nav>
		</header>
		)
	}
}