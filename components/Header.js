import React from 'react'
import Link from 'next/link'
import Store from '../stores/store'

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
			{Store.GetMenu('header').map(link => {
				const slug = link.url.replace(process.env.WP_URL, '') || '/'
				return <Link key={Math.random()} href={slug}>{link.title}</Link>
			})}
			</nav>
		</header>
		)
	}
}