import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';

function App() {
	return (
		<Router>
			<Routes>
				{/* public routes */}
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				{/* protected routes (via webtoken) */}
				<Route element={<ProtectedRoute />}>
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>

				{/* redirect */}
				<Route path="/" element={<Navigate to="/login" />} />
				<Route path="*" element={<Navigate to="/login" />} />
			</Routes>
		</Router>
	);
}

export default App;
