import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import UserSummary from './components/UserSummary'
import Signup from './components/Signup'
import { ToastContainer } from 'react-toastify'

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<UserSummary />} />
					<Route path='/sign-up' element={<Signup />} />
				</Routes>
			</BrowserRouter>
			<ToastContainer />
		</>
	)
}

export default App
