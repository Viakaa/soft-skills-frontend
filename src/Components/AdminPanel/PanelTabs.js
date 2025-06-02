import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import ManageSkills from './ManageSkills.js';
import UserList from './UserList.js';
import TestList from './TestList.js';
import "./PanelTabs.css";
import CharacteristicList from './CharacteristicList.js';

function PanelTabs() {
  const [activeKey, setActiveKey] = useState(null); 

  return (
    <div className='adm_nav' style={{ padding: '40px' }}>
      <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
        <Row>
          <Col className="navcol d-flex flex-column" sm={3}>
            <Nav variant="pills" className="flex-column w-100">
              <h2 style={{ textAlign: 'center' }}>Адмін Панель</h2>
              <Nav.Item>
                <Nav.Link className="navitm" eventKey="first">Керування Скілами</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="navitm" eventKey="fourth">Характеристики</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="navitm" eventKey="second">Користувачі</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="navitm" eventKey="third">Тести</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">{activeKey === 'first' && <ManageSkills />}</Tab.Pane>
              <Tab.Pane eventKey="second">{activeKey === 'second' && <UserList />}</Tab.Pane>
              <Tab.Pane eventKey="third">{activeKey === 'third' && <TestList />}</Tab.Pane>
              <Tab.Pane eventKey="fourth">{activeKey === 'fourth' && <CharacteristicList />}</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default PanelTabs;
