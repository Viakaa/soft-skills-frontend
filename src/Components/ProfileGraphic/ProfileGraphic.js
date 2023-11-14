import "./ProfileGraphic.css";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ProfileGraphic() {
  const data = [
    { name: "Skill 1", level: 3 },
    { name: "Skill 2", level: 9 },
    { name: "Skill 3", level: 6 },
    { name: "Skill 4", level: 10 },
  ];
  return (
    <>
      <div className="graphic_main">
      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
      <Card className='skillsCard' style={{ width: '46%' }}>
        <Card.Header style={{textAlign:'center',fontSize:'35px'}}>Level of soft skills</Card.Header>
        <ListGroup  variant="flush">
          {data.map((item, idx) => (
            <ListGroup.Item className='skill_item' key={idx}>{item.name}: <span style={{color:'white'}}>{item.level}</span></ListGroup.Item>
          ))}
        </ListGroup>
      </Card>

      <Card className="graph_card" style={{ width: '46%' }}>
        <Card.Header style={{textAlign:'center',fontSize:'35px'}}>Graphic display of changes:</Card.Header>
        <Card.Body>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 30,
                bottom: 5,
              }}
            >
              <XAxis style={{fontSize:'14px'}} dataKey="name" stroke="transparent" fill="transparent" />
              <Tooltip />
              <Line type="monotone" dataKey="level" stroke="#655BD2" fill="#655BD2"  strokeWidth={3} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    </div>
      </div>
    </>
  );
}
