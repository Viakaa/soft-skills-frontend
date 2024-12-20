import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Navbar.css";
import UserIcon from "../../Assets/Images/UserIcon.svg";
import { useSelector, useDispatch } from "react-redux";
import { logout, getUserInfo } from "../../Redux/Actions/userActions";
import React, { useEffect, useState } from "react";
import NotificationSidebar from "../Notifications/Notifications";
import NotificationIcon from "../../Assets/Images/notifications.png"

const NavbarMain = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const isLoggedIn = Boolean(userInfo);
  const isAdmin = userInfo?.role === 'ADMIN';

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const openSidebar = () => setIsSidebarVisible(true);
  const closeSidebar = () => setIsSidebarVisible(false);


  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserInfo());
    }
  }, [dispatch, isLoggedIn]);

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
            <Nav className="me-auto my-2 my-lg-0" style={{ width: "100%" }} navbarScroll>
              {isLoggedIn && (
                <Nav.Link className="navbar_link" href="/main">
                  Main
                </Nav.Link>
              )}
              {isAdmin && (
                <NavDropdown className='navbar_link' title="Admin" id="navbarScrollingDropdown">
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
                 <>
                 <div className="notification" onClick={openSidebar}>
                   <img id="notification-icon" src={NotificationIcon} />
                 </div>
                 <div>
                   <Nav.Link className="navbar_link_end" onClick={handleLogout}>
                     <img style={{ width: "45px", marginRight: "5px" }} src={UserIcon} alt="User Icon" />
                     Logout
                   </Nav.Link>
                 </div>
               </>
               
            ) : null}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <NotificationSidebar isVisible={isSidebarVisible} onClose={closeSidebar} />
  </div>
  );
}
export default NavbarMain;