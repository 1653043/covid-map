import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import CovidGoogleMap from "./components/CovidGoogleMap";
import PatientInfo from "./components/PatientInfo";
import CovidDashboard from "./components/CovidDashboard";
import CovidStats from "./components/CovidStats";

const App =() => [
    <Router basename="/">
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#">Covid App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/map">Map</Nav.Link>
                        <Nav.Link href="/stats">Stats</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/map"/>
                </Route>
                <Route path="/map" exact>
                    <div className="my-2" style={{fontSize: 40, textAlign: "center"}}>
                        <p>Covid Map</p>
                    </div>
                    <CovidDashboard/>
                </Route>
                <Route path="stats" exact>
                    <div className="my-2" style={{fontSize: 40, textAlign: "center"}}>
                        <p>Covid Stats</p>
                    </div>
                    <CovidStats/>
                </Route>
            </Switch>
        </div>
    </Router>
    
]

export default App;
