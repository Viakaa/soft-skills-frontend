import "./UserInfo.css";
import avatar from "../../Assets/Images/avatar.png";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../../Redux/Actions/userActions.js';

export default function UserInfo() {
  const Skeleton = () => (
    <div className="skeleton-container">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
    </div>
  );

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isLoading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    if (!userInfo) {
      dispatch(getUserInfo());
    }
  }, [dispatch, userInfo]);
  

  if (isLoading || !userInfo) {
    return <Skeleton />;
  }

  return (
    <div className="userinfo_main">
      <div className="container rounded mt-2 mb-5 userinfo">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3">
              <img className="avatar" src={avatar} alt="Avatar" />
              <span className="font-weight-bold">
                {userInfo.firstName} {userInfo.lastName}
              </span>
            </div>
          </div>
          <div className="col-md-9 border-right">
            <div className="p-4">
              <div className="basic_info">
                <div className="row">
                  <div className="col-md-12">
                    <div className="info">
                      <label className="labels">Роль у команді:</label>
                      <span className="infotext">{userInfo.direction}</span>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="info">
                      <label className="labels">Курс:</label>
                      <span className="infotext">{userInfo.course}</span>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="info">
                      <label className="labels">Пошта:</label>
                      <span className="infotext">{userInfo.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </div>
  );
}
