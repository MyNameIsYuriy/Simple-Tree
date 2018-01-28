import { connect } from 'react-redux'
import { removeNode } from '../actions'
import DeleteNode from '../components/DeleteNode'

const mapStateToProps = (state) => {
    return {
        selectedNodeId: state.selectedNodeId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRemoveBtnClick: (nodeId) => { dispatch(removeNode(nodeId)) }
    }
}

const DeleteNodeContainer = connect(mapStateToProps, mapDispatchToProps)(DeleteNode)
export default DeleteNodeContainer
