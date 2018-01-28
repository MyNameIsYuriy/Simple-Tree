import axios from 'axios'

export const INIT_UI_VALUES = 'INIT_UI_VALUES'
export const GET_TREE_SUCCESS = 'GET_TREE_SUCCESS'
export const OPERATION_FAILURE = 'OPERATION_FAILURE'

export const TOGGLE_NODE = 'TOGGLE_NODE'
export const EDIT_NODE = 'EDIT_NODE'

export const CONFIRM_NODE_EDITION = 'CONFIRM_NODE_EDITION'
export const REMOVE_NODE = 'REMOVE_NODE'
export const RESET_TREE = 'RESET_TREE'

const ROOT_URL = 'http://localhost:32655/api'
export function getTree(operationType) {
	return function(dispatch) {
		dispatch(
			{
				type: INIT_UI_VALUES,
				payload: operationType
			}
		)

		axios.get(ROOT_URL + '/treeview')
		.then((response) => {
			dispatch(getTreeSuccess(response.data))
		})
		.catch((err) => {
			dispatch(operationFailure(err))
		})
	}
}

export function getTreeSuccess(data) {
	return {
		type: GET_TREE_SUCCESS,
		payload: data
	};
}

export function operationFailure(error) {
	return {
    	type: OPERATION_FAILURE,
    	payload: error
  	};
}

export function addNode(nodeName, selectedNodeId) {
	return function(dispatch) {
		axios.post(ROOT_URL + '/treeview',
			    {
					'nodeName': nodeName,
					'parentId': selectedNodeId 
				}
			)
			.then(() => {
				dispatch(getTree())
			})
			.catch((err) => {
				dispatch(operationFailure(err))
			})
	}
}

export function editNode() {
	return {
		type: EDIT_NODE
	}
}

export function confirmNodeEdition(newNodeName, nodeId) {
	return function(dispatch) {
		var url = ROOT_URL + '/treeview/' + nodeId
		axios.put(url,
			    { 'nodeName': newNodeName }
			)
			.then(() => {
				dispatch(getTree(CONFIRM_NODE_EDITION))
			})
			.catch((err) => {
				dispatch(operationFailure(err))
			})
	}
}

export function removeNode(nodeId) {
	if (nodeId === '-1') {
		return {
			type: ''
		}
	}

	return function(dispatch) {
		var url = ROOT_URL + '/treeview/' + nodeId
		axios.delete(url)
			.then(() => {
				dispatch(getTree(REMOVE_NODE))
			})
			.catch((err) => {
				dispatch(operationFailure(err))
		})
	}
}

export function toggleNode(nodeId) {
	return {
		type: TOGGLE_NODE,
		payload: nodeId
	}
}

export function resetTree() {
	return function(dispatch) {	
		var url = ROOT_URL + '/treeview/0'
		axios.get(url)
			.then(() => {
				dispatch(getTree(RESET_TREE))
			})
			.catch((err) => {
				dispatch(operationFailure(err))
			})
	}
}
