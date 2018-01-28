import { connect } from 'react-redux'
import { editNode } from '../actions'
import EditNode from '../components/EditNode'

const mapDispatchToProps = (dispatch) => {
	return {
		editNode: () => {dispatch(editNode())}
	}
}

const EditNodeContainer = connect(null, mapDispatchToProps)(EditNode)
export default EditNodeContainer
