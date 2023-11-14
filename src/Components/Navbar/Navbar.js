import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css';
import UserIcon from '../../Assets/Images/UserIcon.svg'
export default function NavbarMain(){
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
            <Nav.Link className='navbar_link' href="#action1">Page 1</Nav.Link>
            <Nav.Link className='navbar_link' href="#action2">Link</Nav.Link>

            <Nav.Link className='navbar_link' href="/login">Login</Nav.Link>
            <Nav.Link className='navbar_link' href="/registration">Registration</Nav.Link>
           
       
          </Nav>
         
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
        <Nav.Link className='navbar_link_end' href="/profile" >
              <img style={{width:'45px'}} src={UserIcon}/>
            </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
);
}