import "./UserInfo.css";
import avatar from "../../Assets/Images/avatar.png";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../../Redux/Actions/userActions.js';
import axios from "axios";

export default function UserInfo() {
  const Skeleton = () => (
    <div className="skeleton">
    
    </div>
  );
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isLoading = useSelector((state) => state.auth.loading);


  useEffect(() => {
      dispatch(getUserInfo());
    
  }, [dispatch]);

  if (isLoading || !userInfo) {
    return <Skeleton />;
  }


  return (
    <>
      <div className="userinfo_main">
        <div class="container rounded mt-2 mb-5 userinfo" >
          <div class="row">
            <div class="col-md-3 border-right">
              <div class="d-flex flex-column align-items-center text-center p-3 ">
                <img
                  class="rounded-circle  "
                  src={avatar}
                />
                <span style={{marginTop:'10px'}} class="font-weight-bold">           {userInfo.firstName} {userInfo.lastName}</span>
              </div>
            </div>
            <div class="col-md-4 border-right ">
              <div class="p-3 ">
              <div className='basic_info'>

                <div class="row">
                  <div class="col-md-12">
                    <label class="labels">{userInfo.direction}</label>
                  
                  </div>
                  <div class="col-md-12">
                    <label class="labels">Course: {userInfo.course}</label>
             
                  </div>
                  <div class="col-md-12">
                    <label class="labels">Sex: {userInfo.sex}</label>
             
                  </div>
                  <div class="col-md-12">
                    <label class="labels">Some other information</label>
             
                  </div>
                  </div>

                </div>
                <div style={{marginTop:'30px'}} className='basic_info'>
                <div class="row">
                
                  <div class="col-md-12">
                    <label class="labels">Test B Result</label>
                
                  </div>
                  
                </div>
                </div>
                
              </div>
            </div>
            <div class="col-md-5">
              <div class="p-3">

              <div  className='basic_info'>
                <div class="row">
                
                  <div class="col-md-12">
                    <label class="labels">{userInfo.email}</label>
                
                  </div>
                </div>
                </div>
                <div style={{marginTop:'20%'}} class="row text-center">
                
                <div class="col-md-12">
                  <button className='change_password_btn'>Change Password</button>
              
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
