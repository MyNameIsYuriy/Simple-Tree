import React, { Component } from 'react'
import { connect } from 'react-redux'
import NodeContainer from '../containers/NodeContainer'
import AddNode from '../containers/AddNode'
import EditNode from '../containers/EditNode'
import DeleteNode from '../containers/DeleteNode'
import ResetTree from '../containers/ResetTree'

class App extends Component {
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
                <p style={{color: 'grey'}}>Tip: click on a node twice to unfocus it.</p>
                <table>
                    <tbody>
                    <tr>
                        <td><AddNode /></td>
                        <td><EditNode /></td>                        
                        <td><DeleteNode /></td>
                        <td><ResetTree /></td>
                    </tr>
                    </tbody>
                </table>
        	</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}

const AppContainer = connect(
  mapStateToProps)(App)
export default AppContainer

