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
import BelbinChart from "./Components/BelbinTest/BelbinGraphicResult.js"
import DNDconstructor from "./Components/DNDconstructor/DNDconstructor";
import DNDcons from "./Components/DNDconstructor/DNDcons1";
import NotificationForm from "./Components/AdminNotifications/AdminNotifications.js";
import NotificationsPage from "./Components/Notifications/NotificationsPage.js"
import NotificationsBar from "./Components/Notifications/Notifications.js";
import { NotificationsProvider } from "./Components/Notifications/NotificationsContext.js"

import AdminPage from "./Pages/AdminPage";
import TestPage from "./Pages/TestPage";
import NotFoundPage from './Pages/NotFoundPage'; 
import Article1 from './Components/Articles/ArticleTeamwork.js';
import Article2 from './Components/Articles/ArticleChangeLife.js';

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
        <Route path="/steps-to-building-a-successful-team" element={<PrivateRoute><Article1 /></PrivateRoute>} />
        <Route path="/methods-to-change-your-life" element={<PrivateRoute><Article2 /></PrivateRoute>} />
        <Route path="/test_constructor1" element={<DNDconstructor />} />
        <Route path="/test_constructor" element={<AdminRoute><DNDconstructor /></AdminRoute>} />
        <Route path="/test/:id" element={<TestPage />} />
        <Route path="/test/677ffc10bc648d0df2743ff7" element={<BelbinTest />} />
        <Route path="/belbinresult" element={<BelbinResult />} />
        <Route path="/belbinchart" element={<PrivateRoute><BelbinChart /></PrivateRoute>} />
        <Route path="*" element={<NotFoundPage />} />
        
      </Routes>
    </Router>
  </NotificationsProvider>
  );
}

export default App;
