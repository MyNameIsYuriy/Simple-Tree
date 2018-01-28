import React, { Component } from 'react'
import NodeContainer from '../containers/NodeContainer'
import AddNodeContainer from '../containers/AddNodeContainer'
import EditNodeContainer from '../containers/EditNodeContainer'
import DeleteNodeContainer from '../containers/DeleteNodeContainer'
import ResetTreeContainer from '../containers/ResetTreeContainer'

export default class App extends Component {
    componentWillMount() {
        this.props.getData()
    }    

    render() {
        var allChildIds = []
        this.props.data.map(node => allChildIds = allChildIds.concat(node.childIds))

        return (
        	<div>
                {
                    this.props.error ?
                    <div>Error: {this.props.error}</div>
                    :
                    ''
                }
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
                <p style={{color: 'grey'}}>Tip: click on a node twice to unfocus it.</p>
                <table>
                    <tbody>
                    <tr>
                        <td><AddNodeContainer /></td>
                        <td><EditNodeContainer /></td>                        
                        <td><DeleteNodeContainer /></td>
                        <td><ResetTreeContainer /></td>
                    </tr>
                    </tbody>
                </table>
        	</div>
        )
    }
}
