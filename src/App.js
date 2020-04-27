import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

import logo from './logo.svg';
import './App.css';
import CovidGoogleMap from "./components/CovidGoogleMap";
import PatientInfo from "./components/PatientInfo";
import CovidDashboard from "./components/CovidDashboard";

const App =() => [
    <div className="my-2" style={{fontSize: 40, textAlign: "center"}}><p>Covid Map</p></div>,
    <CovidDashboard/>
]

export default App;
