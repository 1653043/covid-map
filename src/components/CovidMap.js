import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const CovidMap = ({patients, currentMapPos, onPatientMarkerClicked}) => {
    return <Map center={[currentMapPos.lat, currentMapPos.long]} zoom={16}>
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png   "
        />
        {patients.map((patient, index) => <Marker position={[patient.lat, patient.lng]} onClick={() => {onPatientMarkerClicked(patient, index); }}>
            <Popup>
                <ul>
                    <li key="name">Name: {patient.name}</li>
                    <li key="address">Address: {patient.address}</li>
                    <li key="note">Note: {patient.note}</li>
                    <li key="verifyDate">Verify date: {patient.verifyDate}</li>
                </ul>
            </Popup>
        </Marker>)}
    </Map>;
};

export default CovidMap;
