import reducer, {INITIAL_STATE} from './'
import { ADD_NODE, TOGGLE_NODE, REMOVE_NODE, RESET_TREE } from '../actions'

describe('reducer', () => {
	it('should handle initial state', () => {
		expect(reducer({}, {type:''})).toEqual({})
	})

	it('should handle ADD_NODE', () => {
		const state = {
			data: []
		}
		const action = {
			type: ADD_NODE,
			payload: 'node'
		}

		const nextState = reducer(state, action)
		expect(nextState).toEqual({
			data: [
				{
                    name: 'node',
                    id: 1,
                    removed: false,
                    childIds: []
                }
			]
		})
	})

	it('should handle ADD_NODE with an existing node in state', () => {
		const state = {
			data: [{
				name: 'first_node',
				id: 1,
				removed: false,
				childIds: []
			}]
		}
		const action = {
			type: ADD_NODE,
			payload: 'node'
		}

		const nextState = reducer(state, action)
		expect(nextState).toEqual({
			data: [
				{
					name: 'first_node',
					id: 1,
					removed: false,
					childIds: []
				},
				{
                    name: 'node',
                    id: 2,
                    removed: false,
                    childIds: []
                }
			]
		})
	})

	it('should handle TOGGLE_NODE', () => {
    	const state = {				
      		selectedNodeId: 0,
      		data: [
	      		{
					name: 'first_node',
					id: 1,
					removed: false,
					childIds: []
				},
				{
	                name: 'second_node',
	                id: 2,
	                removed: false,
	                childIds: []
	            }
        	]
    	}

    	const action = {
    		type: TOGGLE_NODE,
    		payload: 1
    	}

    	const nextState = reducer(state, action)
	    expect(nextState).toEqual({				
      		selectedNodeId: 1,
      		data: [
	      		{
					name: 'first_node',
					id: 1,
					removed: false,
					childIds: []
				},
				{
	                name: 'second_node',
	                id: 2,
	                removed: false,
	                childIds: []
	            }
        	]
    	})
  	})

  	it('should handle repeated TOGGLE_NODE', () => {
    	const state = {				
      		selectedNodeId: 1,
      		data: [
	      		{
					name: 'first_node',
					id: 1,
					removed: false,
					childIds: []
				},
				{
	                name: 'second_node',
	                id: 2,
	                removed: false,
	                childIds: []
	            }
        	]
    	}

    	const action = {
    		type: TOGGLE_NODE,
    		payload: 1
    	}

    	const nextState = reducer(state, action)
	    expect(nextState).toEqual({				
      		selectedNodeId: 0,
      		data: [
	      		{
					name: 'first_node',
					id: 1,
					removed: false,
					childIds: []
				},
				{
	                name: 'second_node',
	                id: 2,
	                removed: false,
	                childIds: []
	            }
        	]
    	})
  	})

  	it('should handle REMOVE_NODE', () => {
    	const state = {				
      		selectedNodeId: 1,
      		data: [
	      		{
					name: 'first_node',
					id: 1,
					removed: false,
					childIds: []
				},
				{
	                name: 'second_node',
	                id: 2,
	                removed: false,
	                childIds: []
	            }
        	]
    	}

    	const action = {
    		type: REMOVE_NODE
    	}

    	const nextState = reducer(state, action)
	    expect(nextState).toEqual({				
      		selectedNodeId: 0,
      		data: [
	      		{
					name: 'first_node',
					id: 1,
					removed: true,
					childIds: []
				},
				{
	                name: 'second_node',
	                id: 2,
	                removed: false,
	                childIds: []
	            }
        	]
    	})
  	})

  	it('should handle REMOVE_NODE with the same state', () => {
    	const state = {				
      		selectedNodeId: 0,
      		data: [
	      		{
					name: 'first_node',
					id: 1,
					removed: false,
					childIds: []
				},
				{
	                name: 'second_node',
	                id: 2,
	                removed: false,
	                childIds: []
	            }
        	]
    	}

    	const action = {
    		type: REMOVE_NODE
    	}

    	const nextState = reducer(state, action)
	    expect(nextState).toEqual({				
      		selectedNodeId: 0,
      		data: [
	      		{
					name: 'first_node',
					id: 1,
					removed: false,
					childIds: []
				},
				{
	                name: 'second_node',
	                id: 2,
	                removed: false,
	                childIds: []
	            }
        	]
    	})
  	})

  	it('should handle REMOVE_NODE with children', () => {
    	const state = {				
      		selectedNodeId: 1,
      		data: [
	      		{
					name: 'first_node',
					id: 1,
					removed: false,
					childIds: [2]
				},
				{
	                name: 'second_node',
	                id: 2,
	                removed: false,
	                childIds: []
	            }
        	]
    	}

    	const action = {
    		type: REMOVE_NODE
    	}

    	const nextState = reducer(state, action)
	    expect(nextState).toEqual({				
      		selectedNodeId: 0,
      		data: [
	      		{
					name: 'first_node',
					id: 1,
					removed: true,
					childIds: [2]
				},
				{
	                name: 'second_node',
	                id: 2,
	                removed: true,
	                childIds: []
	            }
        	]
    	})
  	})

  	it('should handle REMOVE_NODE with the deepest child', () => {
    	const state = {				
      		selectedNodeId: 2,
      		data: [
	      		{
					name: 'first_node',
					id: 1,
					removed: false,
					childIds: [2]
				},
				{
	                name: 'second_node',
	                id: 2,
	                removed: false,
	                childIds: []
	            }
        	]
    	}

    	const action = {
    		type: REMOVE_NODE
    	}

    	const nextState = reducer(state, action)
	    expect(nextState).toEqual({				
      		selectedNodeId: 0,
      		data: [
	      		{
					name: 'first_node',
					id: 1,
					removed: false,
					childIds: [2]
				},
				{
	                name: 'second_node',
	                id: 2,
	                removed: true,
	                childIds: []
	            }
        	]
    	})
  	})

  	it('should handle RESET_TREE', () => {
    	const state = {				
      		selectedNodeId: 0,
      		data: [
	      		{
					name: 'first_node',
					id: 1,
					removed: false,
					childIds: []
				}
        	]
    	}

	   	const action = {
    		type: RESET_TREE
    	}
    	const nextState = reducer(state, action)
	    expect(nextState).toEqual(INITIAL_STATE)
  	})
 })