import { connect } from 'react-redux'
import { resetTree } from '../actions'
import ResetTree from '../components/ResetTree'

const mapDispatchToProps = {
	resetTree: resetTree
}

const ResetTreeContainer = connect(null, mapDispatchToProps)(ResetTree)
export default ResetTreeContainer
