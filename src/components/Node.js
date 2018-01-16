import React, {Component} from 'react'

export default class Node extends Component {
	render() {
		console.log(this.props)
		return (
			<div>
				<ul id='nav'>
				{
					this.props.data.map(node => (
						node.children ? 
						<div key={node.id}>
							<li key={node.id}><a href="#">{node.name}</a></li>
							<Node data={node.children} /> 
						</div>
						: 
						<li key={node.id}><a href="#">{node.name}</a></li>
					))
				}
				</ul>
			</div>		
		)
	}
}
