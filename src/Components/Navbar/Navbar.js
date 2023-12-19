import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css';
import UserIcon from '../../Assets/Images/UserIcon.svg'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Redux/Actions/userActions'; 
export default function NavbarMain(){
  const dispatch = useDispatch();
  const { userData, userInfo } = useSelector((state) => state.auth);
 // const isLoggedIn = userData || userInfo;

  const authToken = localStorage.getItem('authToken');
const isLoggedIn = authToken !== null;
  
  const handleLogout = () => {
    dispatch(logout());
  };
return(
  <div className='navbar_main'>
<Navbar expand="lg" style={{height:'auto'}} className="bg-body-tertiary navbar text-center">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 "
            style={{ width:'100%' }}
            navbarScroll
          >
            <Nav.Link className='navbar_link' href="/main">Main</Nav.Link>
            <Nav.Link className='navbar_link' href="/test_constructor">Constructor</Nav.Link>

            {!isLoggedIn && (
                <>
                  <Nav.Link className='navbar_link' href="/login">Login</Nav.Link>
                  <Nav.Link className='navbar_link' href="/registration">Registration</Nav.Link>
                </>
              )}
           
       
          </Nav>
         
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
        {isLoggedIn ? (
          <div>
          <Nav.Link className='navbar_link_end' href="/profile">
          <img style={{ width: '45px' }} src={UserIcon} alt="User Icon" />
        </Nav.Link>
              <Nav.Link  variant="navbar_link_end " onClick={handleLogout}>Logout</Nav.Link>
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