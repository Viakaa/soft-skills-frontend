import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarMain from './Components/Navbar/Navbar.js';
import LoginForm from './Components/Forms/LoginPage.js';
import RegistrationForm from './Components/Forms/RegistrationPage.js';
import MainPage from './Pages/MainPage.js';
import ProfilePage from './Pages/ProfilePage.js';
import PrivateRoute from './PrivateRoute';

import BelbinTest from "./Components/BelbinTest/BelbinTest.js"
import DNDconstructor from './Components/DNDconstructor/DNDconstructor';

function App() {
  return (
    <>
     <NavbarMain />
     
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/profile" element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        } />
        <Route path="/test_constructor" element={<DNDconstructor />} />

        <Route path="/belbin" element={<BelbinTest />} />

      </Routes>
    </Router>
    </>
  );
}

export default App;
