import "./ProfileGraphic.css";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";
import React, {useState, useEffect} from "react";

export default function ProfileGraphic() {

  const [data, setData] = useState([]);

  const [skills, setSkills] = useState([]);
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    fetchSkills(authToken);
  }, []);

  const fetchSkills = async (authToken) => {
    try {
      const response = await axios.get(
        "http://ec2-34-239-91-8.compute-1.amazonaws.com/soft-skills",
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      const fetchedSkills = response.data.map((skill) => ({
        id: skill._id,
        title: skill.type,
        characteristics: skill.characteristics.map((c) => c.title),
      }));
      setSkills(fetchedSkills);
      generateData(fetchedSkills);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const generateData = (skills) => {
    const newData = skills.map((skill) => ({
      name: skill.title,
      level: Math.floor(Math.random() * 11),
    }));
    setData(newData);
  };
  return (
    <>
      <div className="graphic_main">
      <div className="mainWrapper" style={{ display: 'flex', justifyContent: 'space-between'}}>
      <Card className='skillsCard' style={{ width: '46%' }}>
        <Card.Header style={{textAlign:'center',fontSize:'40px', color: '#1E2631'}}>Soft Skills</Card.Header>
        <ListGroup  variant="flush">
          {skills.map((item, idx) => (
            <ListGroup.Item className='skill_item' key={idx}>{item.title}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card>

      <Card className="graph_card" style={{ width: '46%' }}>
        <Card.Header style={{textAlign:'center',fontSize:'40px'}}>Graphic display of changes:</Card.Header>
        <Card.Body>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 30,
                bottom: 5,
              }}
            >
              <XAxis style={{fontSize:'14px'}} dataKey="name" stroke="transparent" fill="transparent" />
              <Tooltip itemStyle={{ color: 'black' }}  />
              <Line type="monotone" dataKey="level" stroke="white" fill="white"  strokeWidth={3} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    </div>
      </div>
    </>
  );
}
