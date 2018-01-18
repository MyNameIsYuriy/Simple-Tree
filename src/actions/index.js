export const ADD_NODE = 'ADD_NODE'
export const EDIT_NODE = 'EDIT_NODE'
export const CONFIRM_NODE_EDITION = 'CONFIRM_NODE_EDITION'
export const REMOVE_NODE = 'REMOVE_NODE'
export const TOGGLE_NODE = 'TOGGLE_NODE'
export const RESET_TREE = 'RESET_TREE'

export function addNode(nodeText) {
	return {
		type: ADD_NODE,
		payload: nodeText
	}
}

export function editNode() {
	return {
		type: EDIT_NODE
	}
}

export function confirmNodeEdition(newNodeText) {
	return {
		type: CONFIRM_NODE_EDITION,
		payload: newNodeText
	}
}

export function removeNode() {
	return {
		type: REMOVE_NODE
	}
}

export function toggleNode(nodeId) {
	return {
		type: TOGGLE_NODE,
		payload: nodeId
	}
}

export function resetTree() {
	return {
		type: RESET_TREE
	}
}
