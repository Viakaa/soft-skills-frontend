import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarMain from "./Components/Navbar/Navbar.js";
import LoginForm from "./Components/Forms/LoginPage.js";
import RegistrationForm from "./Components/Forms/RegistrationPage.js";
import MainPage from "./Pages/MainPage.js";
import ProfilePage from "./Pages/ProfilePage.js";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

import BelbinTest from "./Components/BelbinTest/BelbinTest.js";
import BelbinResult from "./Components/BelbinTest/BelbinResult.js";
import DNDconstructor from "./Components/DNDconstructor/DNDconstructor";
import DNDcons from "./Components/DNDconstructor/DNDcons1";
import NotificationForm from "./Components/AdminNotifications/AdminNotifications.js";
import UserGrid from './Components/AllUsers/AllUsers.js'

import AdminPage from "./Pages/AdminPage";
import TestPage from "./Pages/TestPage";
import NotFoundPage from './Pages/NotFoundPage'; 
import Article1 from './Components/Articles/ArticleTeamwork.js';
import Article2 from './Components/Articles/ArticleChangeLife.js';
import NotificationSidebar from "./Components/Notifications/Notifications.js";

function App() {
  return (
    <>
      <NavbarMain />

      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/" element={<PrivateRoute><MainPage /></PrivateRoute>} />

          <Route path="/main" element={<PrivateRoute><MainPage /></PrivateRoute>} />
          <Route path="/adminpanel" element={<AdminRoute><AdminPage /></AdminRoute>} />
          <Route path="/adminnotifications" element={<AdminRoute><NotificationForm /></AdminRoute>} />
          <Route path="/allusers" element={<AdminRoute><UserGrid /></AdminRoute>}/>

          <Route path="/steps-to-building-a-successful-team" element={<PrivateRoute><Article1 /></PrivateRoute>} />
          <Route path="/methods-to-change-your-life" element={<PrivateRoute><Article2 /></PrivateRoute>} />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="/test_constructor1" element={<DNDconstructor />} />
          <Route
            path="/test_constructor"
            element={
              <AdminRoute>
                <DNDcons />
                </AdminRoute>
            }
          />
        

          <Route path="/test/:id" element={<TestPage />} />

          <Route path="/belbin" element={<BelbinTest />} />
          <Route path="/belbinresult" element={<BelbinResult />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <NotificationSidebar />
    </>
  );
}

export default App;
