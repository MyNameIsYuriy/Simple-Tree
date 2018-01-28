import { connect } from 'react-redux'
import { addNode } from '../actions'
import AddNode from '../components/AddNode'

const mapStateToProps = (state) => {
    return {
        selectedNodeId: state.selectedNodeId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddBtnClick: (nodeName, parentNodeId) => { dispatch(addNode(nodeName, parentNodeId)) }
    }
}
 
const AddNodeContainer = connect(mapStateToProps, mapDispatchToProps)(AddNode)
export default AddNodeContainer
