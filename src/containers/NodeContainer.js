import React, {Component} from 'react'
import { connect } from 'react-redux'
import { toggleNode } from '../actions'

class Node extends Component {
	
	renderChilds(childIds) {
		if (childIds) {
			return (
				<ul>
				{
					childIds.map(childId => (
						<NodeContainer key={childId} id={childId} />
					))
				}
				</ul>
			)
		}
	}

	render() {
		const { name, id, childIds } = this.props.nodeData
		
		return (
			<li key={id} 
				id={id === this.props.selectedNodeId ? 'liFont' : ''}
				onClick={e => {
					        e.stopPropagation()
					        this.props.onNodeClick(id)
						}}>
				<span>{name}</span>
				{ this.renderChilds(childIds) }
			</li>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		nodeData: state.data.find(node => node.id === ownProps.id),
		selectedNodeId: state.selectedNodeId
	}
}

const mapDispatchToProps = {
	onNodeClick: toggleNode
}

const NodeContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Node)
export default NodeContainer
