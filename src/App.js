import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarMain from './Components/Navbar/Navbar.js';
import LoginForm from './Components/Forms/LoginPage.js';
import RegistrationForm from './Components/Forms/RegistrationPage.js';
import ProfilePage from './Pages/ProfilePage.js';

function App() {
  return (
    <>
     <NavbarMain />
     
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
