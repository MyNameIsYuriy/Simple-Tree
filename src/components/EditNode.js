import React, {Component} from 'react'

export default class EditNode extends Component {
	render() {
		return (
			<button onClick={() => this.props.editNode()}>
				Edit
			</button>
		)
	}
}