import { connect } from 'react-redux'
import Node from '../components/Node'

const mapStateToProps = (state) => {
	return {
		data: state.data
	}
}

const mapDispatchToProps = {
 
}

const NodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Node)
export default NodeContainer