import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, getUserInfo } from "../../Redux/Actions/userActions";
import "./Navbar.css";
import NotificationSidebar from "../Notifications/Notifications";
import UserIcon from "../../Assets/Images/UserIcon.svg";
import NotificationIcon from "../../Assets/Images/notifications.png";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavbarMain = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const isLoggedIn = Boolean(userInfo);
  const isAdmin = userInfo?.role === 'ADMIN';

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const openSidebar = useCallback(() => setIsSidebarVisible(true), []);
  const closeSidebar = useCallback(() => setIsSidebarVisible(false), []);

  const handleUnreadCountChange = useCallback((count) => {
    setUnreadCount(count);
  }, []);  

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserInfo());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div className="navbar_main">
      <Navbar expand="lg" className="bg-body-tertiary navbar text-center">
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
                <NavDropdown className="navbar_link" title="Admin" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/adminpanel">Admin Panel</NavDropdown.Item>
                  <NavDropdown.Item href="/test_constructor">Constructor</NavDropdown.Item>
                  <NavDropdown.Item href="/adminnotifications">Admin Notifications</NavDropdown.Item>
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
            {isLoggedIn && (
              <>
                <div className="notification" onClick={openSidebar} style={{ position: "relative" }}>
                  <img id="notification-icon" src={NotificationIcon} alt="Notification Icon" />
                  {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                  )}
                </div>
                <div className="navbar_link_end">
                  <Nav.Link href="/profile" className="navbar_link">
                    <img style={{ width: "40px",  }} src={UserIcon} alt="User Icon" />
                  </Nav.Link>
                </div>
                <div className="navbar_link_end">
                  <Nav.Link className="navbar_link" onClick={handleLogout}>
                    Logout
                  </Nav.Link>
                </div>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <NotificationSidebar 
        isVisible={isSidebarVisible} 
        onClose={closeSidebar} 
        onUnreadCountChange={handleUnreadCountChange} 
      />
    </div>
  );
};

export default NavbarMain;
