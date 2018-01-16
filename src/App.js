import React, { Component } from 'react'
import NodeContainer from './components/Node'
import AddNode from './containers/AddNode'

export default class App extends Component {
    render() {
        return (
        	<div>
	            <NodeContainer />
	        	<AddNode />
        	</div>
        )
    }
}

