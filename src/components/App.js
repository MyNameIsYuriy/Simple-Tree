import React, { Component } from 'react'
import NodeContainer from '../containers/NodeContainer'
import AddNode from '../containers/AddNode'
import DeleteNode from '../containers/DeleteNode'

export default class App extends Component {
    render() {
        var allChildIds = []
        this.props.data.map(node => allChildIds = allChildIds.concat(node.childIds))

        return (
        	<div>
				<ul id='nav'>
				{
	        		this.props.data.map(node => (
                        allChildIds.includes(node.id) ?
                        ''
                        :
                        <NodeContainer key={node.id} id={node.id} />
                    ))
        		}	
        		</ul>
                <table>
                    <tbody>
                    <tr>
                        <td><AddNode /></td>
                        <td><DeleteNode /></td>
                    </tr>
                    </tbody>
                </table>
        	</div>
        )
    }
}

