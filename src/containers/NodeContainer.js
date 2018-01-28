import React, {Component} from 'react'
import { connect } from 'react-redux'
import { toggleNode, confirmNodeEdition } from '../actions'

class Node extends Component {
	
	componentDidMount(){
		if (this.textInput) {
			this.textInput.focus();
		} 
	}

	renderFormToEdit(name, id) {
		let input 

		return (
			<form onSubmit={e => {
			  e.preventDefault()
			  if (!input.value.trim() && !input.placeholder) {
			    return
			  }
			  var inputValue = input.value ? input.value : input.placeholder
			  this.props.onEditOkClick(inputValue, id)
			  input.value = ''
			}}>
			  <input placeholder={name} ref={node => {
			    input = node
			    this.textInput = input
			  }} />
			  <button type="submit">
			    OK
			  </button>
			</form>
		)
	}

	renderChilds(childIds) {
		if (childIds.length > 0) {
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
		const { name, id, isRemoved, childIds } = this.props.nodeData
		
		return (
			this.props.editNodeId === id ?
			<span>
				{ this.renderFormToEdit(name, id) }
    			{ this.renderChilds(childIds) }
    		</span>
    		:
			<li key={id} 
				id={id === this.props.selectedNodeId ? 'liFont' : ''}
				className={isRemoved ? 'isRemoved' : ''}
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
		selectedNodeId: state.selectedNodeId,
		editNodeId: state.editNodeId
	}
}

const mapDispatchToProps = {
	onNodeClick: toggleNode,
	onEditOkClick: confirmNodeEdition
}

const NodeContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Node)
export default NodeContainer
