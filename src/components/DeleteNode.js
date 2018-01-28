import React, {Component} from 'react'

export default class DeleteNode extends Component {
  render() {
		return (
			<button onClick={() => this.props.onRemoveBtnClick(this.props.selectedNodeId)}>
				Delete
			</button>
		)
	}
}