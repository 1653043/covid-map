import React, {useEffect, useState} from 'react';
const PatientList = ({currentPatientIdx, patients, patientRefs, onPatientMarkerClicked}) => {
  console.log('Rendering PatientList...');

  return <ul className="patient-list" style={{overflow: 'auto', maxHeight: '300px'}}>
    {patients.map((patient, index) => (
      <li
        key={index}
        ref={elem => (patientRefs.push(elem))}
        onClick={() => {onPatientMarkerClicked(patient, index); }}
        className={index === currentPatientIdx ? "highlighted" : ""}
      >
        {patient.name}
      </li>
    ))}
  </ul>
};

export default PatientList;