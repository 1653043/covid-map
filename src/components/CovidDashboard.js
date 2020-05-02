import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CovidGoogleMap from "./CovidGoogleMap";
import PatientInfo from "./PatientInfo";
import PatientList from "./PatientList";
import Container from "react-bootstrap/Container";
import CovidMap from "./CovidMap";
import DateSlider from "./DateSlider";

const CovidDashboard = (props) => {
    const [currentPatientIdx, setCurrentPatientIdx] = useState(0);
    const [currentPatient, setCurrentPatient] = useState();
    const [currentMapPos, setCurrentMapPos] = useState({lat: 10.762887, long: 106.6800684});
    const [patients, setPatients] = useState([]);
    const [patientRefs, setPatientRefs] = useState([]);
    const [selectedTime, setSelectedTime] = useState(new Date(2019, 11, 8).getTime());
    const [isPlaying, setIsPlaying] = useState(false);
    const dayInMs = 86400000; // 1 day converted to milliseconds
    const currentTime = new Date().getTime();

    const sortPatientsByVerifyDateDesc = ((patients) => {
        patients.sort((p1, p2) => {
            let a = new Date(p1.verifyDate);
            let b = new Date(p2.verifyDate);
            return b-a;
        });
    });

    function inTimeRange(patient) {
        const patientTime = new Date(patient.verifyDate).getTime();
        return patientTime <= selectedTime;
    }

    const prunePatientsOutsideTimeRange = ((patients) => {
        // console.log("Filtering patient list");
        return patients.filter(inTimeRange)
        //return patients.filter((patient) => new Date(patient.verifyDate).getTime() > currentTime)
    })

    useEffect(() => {
        fetch(`https://maps.vnpost.vn/apps/covid19/api/patientapi/list`)
            .then(res => res.json())
            .then(
                (result) => {
                    let patients = prunePatientsOutsideTimeRange(result.data);
                    sortPatientsByVerifyDateDesc(patients);
                    setPatients(patients);
                    setCurrentPatient(result.data[0]);
                    setCurrentPatientIdx(0);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    // setIsLoaded(true);
                    // setError(error);
                }
            );
        if (isPlaying) {
            setTimeout(() => {
                const newTime =
                    selectedTime + dayInMs > currentTime ?
                    currentTime :
                    selectedTime + dayInMs;
                setSelectedTime(newTime);
                // console.log("Updated current time");
            }, 100);
        }
    }, [isPlaying, selectedTime]);

    const patientMarkerClickedHandler = (patient, index) => {
        setCurrentPatient(patient);
        setCurrentPatientIdx(index);
        setCurrentMapPos({lat: patient.lat || currentMapPos.lat, long: patient.lng || currentMapPos.long})
        patientRefs[index].scrollIntoView({behavior: 'smooth', block: 'start'});
    }

    const dateSliderChangedHandler = (event, sliderValue) => {
        setSelectedTime(sliderValue);
    }

    const playButtonPressedHandler = () => {
        setIsPlaying(!isPlaying);
    }

    // console.log('Covid Dashboard render');
    return <Container>
        <Row className="my-3" style={{maxHeight: '400px'}}>
            <Col xs={2} style={{maxHeight: '400px'}}>
                <Card>
                    <Card.Body>
                        <Card.Title>Patient list</Card.Title>
                        <Card.Text>
                        <PatientList currentPatientIdx={currentPatientIdx} patients={patients} patientRefs={patientRefs} onPatientMarkerClicked={patientMarkerClickedHandler}></PatientList>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={10}><CovidMap patients={patients} currentMapPos={currentMapPos} onPatientMarkerClicked={patientMarkerClickedHandler}/></Col>
        </Row>
        <Row className="my-3">
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>Patient Information</Card.Title>
                        {currentPatient &&
                        <PatientInfo name={currentPatient.name} address={currentPatient.address} note={currentPatient.note}
                        verifyDate={currentPatient.verifyDate}/>}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Row className="my-3">
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>Timeline</Card.Title>
                        <Card.Text>Number of records: {patients.length}</Card.Text>
                        <DateSlider
                            currentTime={selectedTime}
                            isPlaying={isPlaying}
                            onDateSliderChange={dateSliderChangedHandler}
                            onPlayButtonPressed={playButtonPressedHandler}/>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
};

export default CovidDashboard;