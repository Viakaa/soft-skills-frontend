import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserInfo } from './Redux/Actions/userActions';

const AdminRoute = ({ children }) => {
  const dispatch = useDispatch();
  const [isUserChecked, setIsUserChecked] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const authToken = window.localStorage.getItem("authToken");

  useEffect(() => {
    //get user info
    if (!userInfo && authToken) {
      dispatch(getUserInfo());
    } else {
      setIsUserChecked(true);
    }
  }, [dispatch, userInfo, authToken]);

  useEffect(() => {
    if (userInfo || !authToken) {
      setIsUserChecked(true);
    }
  }, [userInfo, authToken]);

  //return div while waiting for user info
  if (!isUserChecked) {
    return <div></div>;
  }

  if (!authToken || (authToken && userInfo?.role !== 'ADMIN')) {
    return <Navigate to="/main" replace />;
  }

  return children;
};

export default AdminRoute;
