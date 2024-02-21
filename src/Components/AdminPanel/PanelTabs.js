import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import ManageSkills from './ManageSkills.js';
import UserList from './UserList.js';
import TestList from './TestList.js';
import "./PanelTabs.css";

function PanelTabs() {
  return (
    <div className='adm_nav' style={{paddingRight:'40px'}}>
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col className="navcol" sm={3}>
          <Nav   variant="pills" className="flex-column">
            <h2 style={{textAlign:'center'}}>Admin Panel</h2>
            <Nav.Item>
              <Nav.Link className="navitm"  eventKey="first">Manage Skills</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="navitm" eventKey="second">Users</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="navitm" eventKey="third">Tests</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col style={{maxWidth:'73%'}} sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first"><ManageSkills/></Tab.Pane>
            <Tab.Pane eventKey="second"><UserList/></Tab.Pane>
            <Tab.Pane eventKey="third"><TestList/></Tab.Pane>

          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    </div>
  );
}

export default PanelTabs;