import { connect } from 'react-redux'
import App from '../components/App'

const mapStateToProps = (state) => {
	return {
		data: state.data
	}
}

const AppContainer = connect(
  mapStateToProps)(App)
export default AppContainer