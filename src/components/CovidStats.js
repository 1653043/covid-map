import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Legend, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CovidStats = (props) => {
  const [VNStats, setVNStats] = useState();
  const [WorldStats, setWorldStats] = useState();

  useEffect(() => {
    console.log("Fetching data");
    fetch(`https://td.fpt.ai/corona/corona-chart-vn.json`)
      .then(res => res.json())  
      .then((result) => {
        let vnData = [];
        for (let [key, value] of Object.entries(result)) {
          const date = key.substring(5);
          vnData.push({date, ...value});
        }
        setVNStats(vnData);
      });
    fetch(`https://td.fpt.ai/corona/corona-total.json`)
      .then(res => res.json())
      .then((result) => {
        let worldData = [];
        for (let [key, value] of Object.entries(result)) {
          worldData.push({date: key, ...value});
        }
        setWorldStats(worldData);
      });
  }, []);

  return <div>
    <Container className="my-3">
      <Row>
        <Col xs={6}>
          <ResponsiveContainer width="100%" height={600}>
            <LineChart data={VNStats}
              margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid stroke="#f5f5f5" />
              <Legend />
              <XAxis dataKey="date"/>
              <YAxis domain={[0, 500]}/>
              <Tooltip />
              <Line dataKey="0" name="Infected" stroke="#B39DDB" />
              <Line dataKey="1" name="Quarantined" stroke="#80CBC4" />
              <Line dataKey="2" name="Recovered" stroke="#FFB74D" />
            </LineChart>
          </ResponsiveContainer>
        </Col>
        <Col xs={6}>
          <ResponsiveContainer width="100%" height={600}>
            <LineChart data={WorldStats}
              margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid stroke="#f5f5f5"/>
              <Legend />
              <XAxis dataKey="date"/>
              <YAxis domain={[0, 500]}/>
              <Tooltip />
              <Line dataKey="0" name="Infected" stroke="#B39DDB" />
              <Line dataKey="1" name="Quarantined" stroke="#80CBC4" />
              <Line dataKey="2" name="Recovered" stroke="#FFB74D" />
            </LineChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Container>
  </div>
}

export default CovidStats;

