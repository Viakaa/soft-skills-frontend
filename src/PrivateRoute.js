import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const { userInfo } = useSelector((state) => state.auth);
    const storedToken = localStorage.getItem("authToken");
    
    if (userInfo?.token || storedToken) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}
