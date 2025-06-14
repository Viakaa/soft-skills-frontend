import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, getUserInfo } from "../../Redux/Actions/userActions";
import "./Navbar.css";
import NotificationSidebar from "../Notifications/Notifications";
import UserIcon from "../../Assets/Images/UserIcon.png";
import NotificationIcon from "../../Assets/Images/notifications.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNotifications } from "../Notifications/NotificationsContext";

const NavbarMain = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const storedToken = localStorage.getItem("authToken");
  const isLoggedIn = Boolean(userInfo?.token || storedToken);
    const isAdmin = userInfo?.role === "ADMIN";

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const { unreadCount } = useNotifications();

  const openSidebar = useCallback(() => setIsSidebarVisible(true), []);
  const closeSidebar = useCallback(() => setIsSidebarVisible(false), []);

  const { setUnreadCount } = useNotifications();

const handleUnreadCountChange = useCallback(
  (count) => {
    setUnreadCount(count);
  },
  [setUnreadCount]
);


  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && !userInfo) {
      dispatch(getUserInfo());
    }
  }, [dispatch, isLoggedIn, userInfo]);
  

  return (
    <div className="navbar_main">
      <Navbar expand="lg" className="bg-body-tertiary navbar text-center">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ width: "100%" }}
              navbarScroll
            >
              {isLoggedIn && (
                <Nav.Link className="navbar_link" href="/main">
                  Головна
                </Nav.Link>
              )}
              {isAdmin && (
  <NavDropdown
    className="navbar_link"
    title="Адмін"
    id="navbarScrollingDropdown"
  >
    <NavDropdown.Item href="/adminpanel">
      Адмін Панель
    </NavDropdown.Item>

    <div className="desktop-only">
      <NavDropdown.Item href="/test_constructor">
        Конструктор
      </NavDropdown.Item>
      <NavDropdown.Item href="/adminnotifications">
      Адмін Нотифікації
    </NavDropdown.Item>
    </div>

  
  </NavDropdown>
)}

              {!isLoggedIn && (
                <>
                  <Nav.Link className="navbar_link" href="/login">
                    Увійти
                  </Nav.Link>
                  <Nav.Link className="navbar_link" href="/registration">
                    Реєстрація
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            {isLoggedIn && (
              <>
                <div
                  className="notification"
                  onClick={openSidebar}
                  style={{ position: "relative" }}
                >
                  <img
                    id="notification-icon"
                    src={NotificationIcon}
                    alt="Notification Icon"
                  />
                  {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                  )}
                </div>
                <div
                  className="user-profile"
                  onClick={() => (window.location.href = "/profile")}
                  style={{ cursor: "pointer", marginRight: "10px" }}
                >
                  <img
                    style={{
                      width: "50px",
               
                      backgroundColor: "white",
                    }}
                    src={UserIcon}
                    alt="User Icon"
                  />
                </div>

                <Nav.Link
                  className="navbar_link_end"
                  onClick={handleLogout}
                  style={{ width: "85px", backgroundColor: "white" }}
                >
                  Вийти
                </Nav.Link>
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
