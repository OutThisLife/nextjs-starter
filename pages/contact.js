import React from 'react'
import _ from 'lodash'
import If from '../helpers/If'

// ---------------------------------------------

export default class ContactTemplate extends React.PureComponent {
	render() {
		return (<div>
			<div dangerouslySetInnerHTML={{ __html: this.props.content }} />

			<If test={!_.isEmpty(this.props.fields.address)}>
				<hr />
				<address dangerouslySetInnerHTML={{ __html: this.props.fields.address }} />
			</If>

			<If test={!_.isEmpty(this.props.fields.contact_links)}>
				<ul>
					{(this.props.fields.contact_links || []).map(link => {
						return (<li key={Math.random()}>
							<a
								href={link.url}
								dangerouslySetInnerHTML={{ __html: link.title }}
								target={Object.keys(link.target)[0]}
							/>
						</li>)
					})}
				</ul>
			</If>
		</div>)
	}
}

ContactTemplate.propTypes = {
	content: React.PropTypes.string.isRequired,
	fields: React.PropTypes.shape().isRequired,
}