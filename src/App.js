import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarMain from "./Components/Navbar/Navbar.js";
import LoginForm from "./Components/Forms/LoginPage.js";
import RegistrationForm from "./Components/Forms/RegistrationPage.js";
import MainPage from "./Pages/MainPage.js";
import ProfilePage from "./Pages/ProfilePage.js";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import './global.css';

import BelbinTest from "./Components/BelbinTest/BelbinTest.js";
import BelbinResult from "./Components/BelbinTest/BelbinResult.js";
import DNDconstructor1 from "./Components/DNDconstructor/Component/DNDconstructor1.js"
import ResultPage from "./Components/CurrentTest/Results.js";
import NotificationForm from "./Components/AdminNotifications/AdminNotifications.js";
import NotificationsPage from "./Components/Notifications/NotificationsPage.js"
import NotificationsBar from "./Components/Notifications/Notifications.js";
import { NotificationsProvider } from "./Components/Notifications/NotificationsContext.js"

import AdminPage from "./Pages/AdminPage";
import TestPage from "./Pages/TestPage";
import NotFoundPage from './Pages/NotFoundPage'; 


function App() {
  return (
    <NotificationsProvider>
    <NavbarMain />
    <NotificationsBar />

    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/" element={<PrivateRoute><MainPage /></PrivateRoute>} />
        <Route path="/main" element={<PrivateRoute><MainPage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/adminnotifications" element={<AdminRoute><NotificationForm /></AdminRoute>} />
        <Route path="/notifications" element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />
        <Route path="/adminpanel" element={<AdminRoute><AdminPage /></AdminRoute>} />
        <Route path="/test_constructor" element={<AdminRoute><DNDconstructor1 /></AdminRoute>} />
        <Route path="/results/:id" element={<PrivateRoute><ResultPage /></PrivateRoute>} />
        <Route path="/test/:id" element={<PrivateRoute><TestPage /></PrivateRoute>} />
        <Route path="/test/677ffc10bc648d0df2743ff7" element={<PrivateRoute><BelbinTest /></PrivateRoute>} />
        <Route path="/belbinresult/:userId" element={<PrivateRoute><BelbinResult /></PrivateRoute>} />
        <Route path="*" element={<NotFoundPage />} />
        
      </Routes>
    </Router>
  </NotificationsProvider>
  );
}

export default App;
