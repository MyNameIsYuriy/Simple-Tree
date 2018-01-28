import { INIT_UI_VALUES, GET_TREE_SUCCESS, OPERATION_FAILURE, 
         TOGGLE_NODE, EDIT_NODE,
         CONFIRM_NODE_EDITION, REMOVE_NODE, RESET_TREE } from '../actions'

const selectedDefaultValue = '-1'
const editDefaultValue = '-1'

const INITIAL_STATE = {
    data: [],
    error: null,
    selectedNodeId: selectedDefaultValue,
    editNodeId: editDefaultValue
}

function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case INIT_UI_VALUES: {
            return {
                ...state,
                error: null,
                selectedNodeId: action.payload === REMOVE_NODE ||
                                    action.payload === RESET_TREE
                                ?
                                selectedDefaultValue
                                :
                                state.selectedNodeId,
                editNodeId: action.payload === CONFIRM_NODE_EDITION ||
                                action.payload === RESET_TREE 
                                ?
                                editDefaultValue
                                :
                                state.editNodeId
            }
        }
        case GET_TREE_SUCCESS: {
            return {
                ...state,
                data: action.payload.map(node => 
                            true 
                            ?
                            { 
                                ...node, 
                                childIds: node.childIds.split(',').filter(el => el !== '') 
                            }
                            :
                            ''
                        ) 
                
            }
        }
        case OPERATION_FAILURE: { 
            //var error = action.payload || {message: action.payload.message} //2nd one is network or server down errors
            var error = action.payload.message
            return {
                ...state, 
                error: error
            }
        }
        case TOGGLE_NODE: {
            var nodeToToggle = state.data.find(node => node.id === action.payload)
            if (state.editNodeId !== editDefaultValue || nodeToToggle.isRemoved) {
                return state
            }

            return {
                ...state,
                selectedNodeId: state.selectedNodeId === action.payload ? 
                                    selectedDefaultValue
                                    :
                                    action.payload
            }
        }
        case EDIT_NODE: {
            return {
                ...state,
                editNodeId: state.selectedNodeId !== selectedDefaultValue ? 
                                state.selectedNodeId
                                :
                                state.editNodeId
            }
        }
        default:
            return state
    }
}
export default reducer
