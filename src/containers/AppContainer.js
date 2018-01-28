import { connect } from 'react-redux'
import { getTree } from '../actions'
import App from '../components/App'

const mapStateToProps = (state) => {
    return {
        error: state.error,
        data: state.data
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		getData: () => {dispatch(getTree())}
	}
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)
export default AppContainer

