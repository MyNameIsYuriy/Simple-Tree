import { ADD_NODE, EDIT_NODE, CONFIRM_NODE_EDITION, REMOVE_NODE, TOGGLE_NODE, RESET_TREE } from '../actions'

export const INITIAL_STATE = {
    selectedNodeId: 0,
    nodeOnEdit: -1,
    data: [
        {
            name: 'node1',
            id: 1,
            removed: false,
            childIds: [2]
        },
        {
            name: 'node2',
            id: 2,
            removed: false,
            childIds: [3, 4]
        },
        {
            name: 'node3',
            id: 3,
            removed: false,
            childIds: []
        },
        {
            name: 'node4',
            id: 4,
            removed: false,
            childIds: []
        },
        {
            name: 'node5',
            id: 5,
            removed: false,
            childIds: [6]
        },
        {
            name: 'node6',
            id: 6,
            removed: false,
            childIds: []
        }
    ]
}


function traverseTreeForChildIds(data, startNodeId, callback) {
    var queue = [] 
    var currentNode = data.find(node => node.id === startNodeId)
 
    while (currentNode) {
        if (currentNode.childIds) {
            for (var i = 0, length = currentNode.childIds.length; i < length; i++) {
                queue.push(data.find(node => node.id === currentNode.childIds[i]));
            }
        }
 
        callback(currentNode.id);
        currentNode = queue.shift();
    }
};

function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_NODE: {
            var childId = state.data.length + 1
            return {
                ...state,
                data: [
                    ...state.data.map(node => 
                            (node.id === state.selectedNodeId)
                            ?
                            { ...node, childIds: node.childIds.concat(childId) }
                            :
                            node
                    ),
                    {
                        name: action.payload,
                        id: childId,
                        removed: false,
                        childIds: []
                    }
                ]
            }
        }
        case TOGGLE_NODE: {
            var nodeToToggle = state.data.find(node => node.id === action.payload)
            if (state.nodeOnEdit !== -1 || nodeToToggle.removed) {
                return state
            }

            return {
                ...state,
                selectedNodeId: state.selectedNodeId === action.payload ? 0 : action.payload
            }
        }
        case EDIT_NODE: {
            return {
                ...state,
                nodeOnEdit: state.selectedNodeId > 0 ? state.selectedNodeId : state.nodeOnEdit
            }
        }
        case CONFIRM_NODE_EDITION: {
            return {
                ...state,
                data: [ 
                    ...state.data.map(node => node.id === state.nodeOnEdit 
                                                ?
                                                {...node, name: action.payload}
                                                :
                                                node)
                ],
                nodeOnEdit: -1
            }
        }
        case REMOVE_NODE: {
            var removedNodeId = state.selectedNodeId
            var removedIds = []
            traverseTreeForChildIds(state.data, removedNodeId, (id) => { removedIds = removedIds.concat(id) })
            return {
                ...state,
                selectedNodeId: 0,
                data: [ 
                    ...state.data.map(node => removedIds.includes(node.id) 
                                                ?
                                                {...node, removed: true}
                                                :
                                                node)
                ]
            }
        }
        case RESET_TREE: {
            return INITIAL_STATE
        }
        default:
            return state
    }
}
export default reducer
