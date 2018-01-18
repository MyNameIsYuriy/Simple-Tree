import { ADD_NODE, TOGGLE_NODE, REMOVE_NODE, RESET_TREE,
	addNode, toggleNode, removeNode, resetTree } from './'


describe ('node actions', () => {
	it('addNode should create ADD_NODE action', () => {
		const action = {
			type: ADD_NODE,
			payload: 'node'
		}

		expect(addNode('node')).toEqual(action)
	})

	it('removeNode should create REMOVE_NODE action', () => {
		const action = {
			type: REMOVE_NODE
		}

		expect(removeNode()).toEqual(action)
	})

	it('toggleNode should create TOGGLE_NODE action', () => {
		const action = {
			type: TOGGLE_NODE,
			payload: 1
		}

		expect(toggleNode(1)).toEqual(action)
	})

	it('resetTree should create RESET_TREE action', () => {
		const action = {
			type: RESET_TREE
		}

		expect(resetTree()).toEqual(action)
	})
})