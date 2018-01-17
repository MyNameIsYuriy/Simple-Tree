import { ADD_NODE, EDIT_NODE, REMOVE_NODE, TOGGLE_NODE, RESET_TREE } from '../actions'

var globalNodeId = 7

const INITIAL_STATE = {
    selectedNodeId: 4,
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

const nodeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_NODE: {
            var childId = globalNodeId++
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
            var nodeToToggle = state.data.find(node => node.id === state.selectedNodeId)
            if (!nodeToToggle || (nodeToToggle && nodeToToggle.removed)) {
                return state
            }

            return {
                ...state,
                selectedNodeId: action.payload
            }
        }
        case REMOVE_NODE: {
            var removedNodeId = state.selectedNodeId
            var removedIds = []
            traverseTreeForChildIds(state.data, removedNodeId, (id) => { removedIds = removedIds.concat(id) })
            return {
                selectedNodeId: 1,
                data: [ 
                    ...state.data.map(node => removedIds.includes(node.id) 
                                                ?
                                                {...node, removed: true}
                                                :
                                                node)
                ]
            }
        }
        default:
            return state
    }
}
export default nodeReducer
