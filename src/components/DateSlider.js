import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import IconButton from '@material-ui/core/IconButton';

const DateSlider = ({currentTime, isPlaying, onDateSliderChange, onPlayButtonPressed}) => {
  // console.log('Rendering DateSlider...');

  const dateStart = new Date(2019, 11, 8).getTime();
  const dateNow = new Date().getTime();
  const dayInMs = 86400000; // 1 day converted to milliseconds

  let playOrPauseIcon =
    isPlaying ?
    <PauseIcon hidden={!isPlaying}></PauseIcon> :
    <PlayArrowIcon hidden={isPlaying}></PlayArrowIcon>;

  return <Container>
    <Typography gutterBottom>
      Show cases up until: {new Date(currentTime).toDateString()}
    </Typography>
    <Row>
      <Col xs={1}>
        <IconButton onClick={onPlayButtonPressed}>
          {playOrPauseIcon}
        </IconButton>
      </Col>
      <Col xs={11}>
        <Slider
          defaultValue={dateStart}
          value={new Date(currentTime).getTime()}
          onChange={onDateSliderChange}
          disabled={isPlaying}
          aria-labelledby={isPlaying?"disabled-slider":"discrete-slider"}
          step={dayInMs}
          min={dateStart}
          max={dateNow}
          valueLabelDisplay="off"/>
      </Col>
    </Row>
  </Container>

  // return <ul className="date-slider">
  //   {patients.map((patient, index) => (
  //     <li
  //       key={index}
  //       ref={elem => (patientRefs.push(elem))}
  //       onClick={() => {onPatientMarkerClicked(patient, index); }}
  //       className={index === currentPatientIdx ? "highlighted" : ""}
  //     >
  //       {patient.name}
  //     </li>
  //   ))}
  // </ul>
};

export default DateSlider;