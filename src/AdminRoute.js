import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserInfo } from './Redux/Actions/userActions';

const AdminRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.auth);
  const isAdmin = userInfo?.role === 'ADMIN';
  const authToken = localStorage.getItem("authToken");
  const isLoggedIn = authToken !== null;

  //get user's data
  useEffect(() => {
    if (!userInfo) {
      dispatch(getUserInfo());
    }
  }, [dispatch, userInfo]);


  //wait for userInfo
  if (!userInfo) {
    return <div></div>;

  }
  //redirect to main if no admin
  if (!isAdmin) {
    return <Navigate to="/main"  />;
  }

  return children;
};

export default AdminRoute;
