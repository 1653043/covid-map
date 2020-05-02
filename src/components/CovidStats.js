import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Legend, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Typography from '@material-ui/core/Typography';

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
    <Container fluid className="my-3">
      <Row>
        <Col xs={6}>
          <ResponsiveContainer width="95%" height={600}>
            <LineChart data={VNStats}
              margin={{ top: 15, right: 15, bottom: 15, left: 15 }}>
              <CartesianGrid stroke="#f5f5f5" />
              <Legend />
              <XAxis dataKey="date"/>
              <YAxis tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
              <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
              <Line type="monotone" dataKey="0" name="Infected" stroke="#B39DDB" strokeWidth={2} dot={false}/>
              <Line type="monotone" dataKey="1" name="Quarantined" stroke="#80CBC4" strokeWidth={2} dot={false}/>
              <Line type="monotone" dataKey="2" name="Recovered" stroke="#FFB74D" strokeWidth={2} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
          <Typography align="center" variant="h4">
            Vietnam's covid stats
          </Typography>
        </Col>
        <Col xs={6}>
          <ResponsiveContainer width="95%" height={600}>
            <LineChart data={WorldStats}
              margin={{ top: 15, right: 15, bottom: 15, left: 15 }}>
              <CartesianGrid stroke="#f5f5f5"/>
              <Legend />
              <XAxis dataKey="date"/>
              <YAxis tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}/>
              <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
              <Line type="monotone" dataKey="0" name="Infected" stroke="#B39DDB" strokeWidth={2} dot={false}/>
              <Line type="monotone" dataKey="1" name="Deaths" stroke="#80CBC4" strokeWidth={2} dot={false}/>
              <Line type="monotone" dataKey="2" name="Recovered" stroke="#FFB74D" strokeWidth={2} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
          <Typography align="center" variant="h4">
            World covid stats
          </Typography>
        </Col>
      </Row>
    </Container>
  </div>
}

export default CovidStats;

