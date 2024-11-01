import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Navbar.css";
import UserIcon from "../../Assets/Images/UserIcon.svg";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/Actions/userActions";
import { getUserInfo } from "../../Redux/Actions/userActions.js";
import React, { useState, useEffect } from "react";

export default function NavbarMain() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  // const isLoggedIn = userData || userInfo;
  const isAdmin = userInfo?.role === 'ADMIN';


  const authToken = localStorage.getItem("authToken");
  const isLoggedIn = authToken !== null;

  const handleLogout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if(isLoggedIn) {
    dispatch(getUserInfo());
    }
  }, [dispatch]);

  return (
    <div className="navbar_main">
      <Navbar
        expand="lg"
        style={{ height: "auto" }}
        className="bg-body-tertiary navbar text-center"
      >
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 "
              style={{ width: "100%" }}
              navbarScroll
            >
               {isLoggedIn ? (
              <Nav.Link className="navbar_link" href="/main">
                Main
              </Nav.Link>
              ) : (
                <></>
              )}
              {isAdmin && (
                <NavDropdown className='navbar_link ' title="Admin" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/adminpanel">Admin Panel</NavDropdown.Item>
                  <NavDropdown.Item href="/test_constructor">Constructor</NavDropdown.Item>

                </NavDropdown>
              )}

              {!isLoggedIn && (
                <>
                  <Nav.Link className="navbar_link" href="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link className="navbar_link" href="/registration">
                    Sign up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            {isLoggedIn ? (
              <div>
                <Nav.Link className="navbar_link_end" href="/profile">
                  <img
                    style={{ width: "45px" }}
                    src={UserIcon}
                    alt="User Icon"
                  />
                </Nav.Link>
                <Nav.Link variant="navbar_link_end " style={{color:'#2A2E46'}} onClick={handleLogout}>
                  Logout
                </Nav.Link>
              </div>
            ) : (
              <></>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
