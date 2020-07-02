import React from "react";
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from "react-google-maps";

export function Map(props) {
  const {addressData, isMarkerShown} = props;
  const addressMakers = [addressData.pickup, addressData.dropoff].filter((el) => el !== null);

  return (
    <GoogleMap 
        defaultZoom={12}
        defaultCenter={{ lat: 48.86982, lng: 2.334579}}
    >
    {isMarkerShown && addressMakers && addressMakers.map((coord, index) => (
      <Marker 
        key={index}
        position={{ lat: coord.latitude, lng: coord.longitude }} />
    ))}
    </GoogleMap>
  )
}

export const WrappedMap = withScriptjs(withGoogleMap(Map))