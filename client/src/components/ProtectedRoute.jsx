import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = () => {
	const token = localStorage.getItem('token');

	if (!token) {
		return <Navigate to="/login" />;
	}

	try {
		const decodedToken = jwtDecode(token);

		if (decodedToken?.exp < Date.now() / 1000) {
			localStorage.removeItem('token');
			localStorage.removeItem('token_created_at');
			return <Navigate to="/login" />;
		}

		// used to allow child routes to be accessed
		return <Outlet />;
	} catch (error) {
		// unexpected error
		localStorage.removeItem('token');
		return <Navigate to="/login" />;
	}
};

export default ProtectedRoute;
