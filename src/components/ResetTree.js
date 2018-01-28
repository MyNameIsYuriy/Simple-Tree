import React, {Component} from 'react'

export default class ResetTree extends Component {
	render() {
		return (
		    <button onClick={() => this.props.resetTree()}>
	    	   Reset
	        </button>
	    )
	}
}