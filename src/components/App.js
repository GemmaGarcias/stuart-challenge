import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

function Map() {
  return (
    <GoogleMap 
        defaultZoom={10}
        defaultCenter={{ lat: 45.421532, lng: -75.697189}}
    />
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function App() {
  return (
    <div style={{width: "50vw", height: "50vh"}}>
      <WrappedMap 
        isMarkerShown 
        googleMapURL={'https://maps.googleapis.com/maps/api/js?key=AIzaSyD42XFQV9gGgBclEgi2z3B-SsjAgrw55Jk&callback=initMap'} 
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
        />
        
    </div>
  );
}
