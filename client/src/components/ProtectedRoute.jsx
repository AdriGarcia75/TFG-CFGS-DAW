import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token'); 

  if (!token) {
    return <Navigate to="/login" />;
  } else {
    //used to allow child routes to be accessed   
    return <Outlet />;
  }
};

export default ProtectedRoute;
