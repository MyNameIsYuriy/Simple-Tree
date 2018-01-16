import { ADD_NODE, EDIT_NODE, REMOVE_NODE, RESET_TREE } from '../actions'
import queue from 'queue'

var globalNodeId = 7

const INITIAL_STATE = {
    selectedNodeId: 3,
    data: {
        1: {
            name: 'node1',
            id: 1,
            children: 
            {
                2: {
                    name: 'node2',
                    id: 2,
                    children: {
                       3: {
                            name: 'node3',
                            id: 3,
                            children: {}
                        },
                       4: {
                            name: 'node4',
                            id: 4,
                            children: {}
                        }
                    }
                }
            }
        },
        5: {
            name: 'node5',
            id: 5,
            children: {
                6: {
                    name: 'node6',
                    id: 6,
                    children: {}
                }
            }
        }
    }
}

const nodeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_NODE: {
            var child = {
                name: action.payload,
                id: globalNodeId++,
                children: []
            }
            return {
                ...state,
                data: state.data.map(node => (node.id === state.selectedNodeId) 
                                            ? {...node, children: 
                                                [
                                                    ...node.children,
                                                    child
                                                ]
                                              }
                                            : node) 
            }
        }
        default:
            return state
    }
}
export default nodeReducer

function findNode(startNode, nodeId, child) {
	var q = queue()

	q.push(startNode)
	var currentNode = q.shift()
	var resultNode = null

	while (currentNode) {
		if (currentNode.id === nodeId) {
			resultNode = currentNode
			break
		}

		if (currentNode.children) {
			for (var i = 0, length = currentNode.children.length; i < length; i++) {
				q.push(currentNode.children[i])
			}
		}

		currentNode = q.shift()
	}

    if (resultNode) {
        resultNode.children.push(child)
    } else {
        resultNode = startNode
    }

	return resultNode
}

