export const ADD_NODE = 'ADD_NODE'
export const EDIT_NODE = 'EDIT_NODE'
export const REMOVE_NODE = 'REMOVE_NODE'
export const RESET_TREE = 'RESET_TREE'

export function addNode(nodeText) {
	return {
		type: ADD_NODE,
		payload: nodeText
	}
}

export function editNode(nodeId) {
	return {
		type: EDIT_NODE,
		payload: nodeId
	}
}

export function removeNode(nodeId) {
	return {
		type: REMOVE_NODE,
		payload: nodeId
	}
}

export function resetTree() {
	return {
		type: RESET_TREE
	}
}