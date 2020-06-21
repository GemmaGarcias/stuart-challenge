import React from 'react';
import { WrappedMap } from './map/Map';
import Addresses from './form/Addresses';
import './App.css';

export default function App() {
  return (
    <React.Fragment>
    <div style={{width: "50vw", height: "100vh"}}>
      <Addresses />
      <WrappedMap 
        isMarkerShown 
        googleMapURL={'https://maps.googleapis.com/maps/api/js?key=AIzaSyD42XFQV9gGgBclEgi2z3B-SsjAgrw55Jk&callback=initMap'} 
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
        />   
    </div>
    </React.Fragment>
  );
}
