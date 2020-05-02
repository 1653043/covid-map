import React from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Typography from '@material-ui/core/Typography';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    NavLink
} from "react-router-dom";

// import logo from './logo.svg';
import './App.css';
// import CovidGoogleMap from "./components/CovidGoogleMap";
// import PatientInfo from "./components/PatientInfo";
import CovidDashboard from "./components/CovidDashboard";
import CovidStats from "./components/CovidStats";

const App =() => [
    <Router basename={process.env.PUBLIC_URL}>
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#">Covid App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={NavLink} to={`/map`}>Map</Nav.Link>
                        <Nav.Link as={NavLink} to={`/stats`}>Stats</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            
            <Switch>
                <Route path={`/`} exact>
                    <Redirect to={`/map`}/>
                </Route>
                <Route path={`/map`}>
                    <div className="my-3">
                        <Typography align="center" variant="h2">Covid Map</Typography>
                    </div>
                    <CovidDashboard/>
                </Route>
                <Route path={`/stats`}>
                    <div className="my-3">
                        <Typography align="center" variant="h2">Covid Stats</Typography>
                    </div>
                    <CovidStats/>
                </Route>
            </Switch>
        </div>
    </Router>
]

export default App;
