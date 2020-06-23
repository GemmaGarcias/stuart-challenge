import React, { useState } from 'react';
import { getGeocodeAddress, getJobsCoordinates } from '../service/service';
import { WrappedMap } from './map/Map';
import Addresses from './form/Addresses';
import './App.css';

export default function App() {
  const [coordinates, setCoordinates] = useState({ pickup: null, dropoff: null });
  const [error, setError] = useState({ pickup: false, dropoff: false });
  const [loading, setLoading] = useState(false);

  async function handleOnBlur(event) {
    const { value, name } = event.target;
    try {
      const response = await getGeocodeAddress({address: value});
      setCoordinates({...coordinates, [name]: response.data});
      setError({...error, [name]: false})
      
    } catch (err) {
      setCoordinates({...coordinates, [name]: null});
      setError({...error, [name]: true})
    }
  } 

  async function submit(event) {
    event.preventDefault();
    const jobsQuery = {pickup: coordinates.pickup.address, dropoff: coordinates.dropoff.address};
    setLoading(true);
    await getJob(jobsQuery);
  }

  async function getJob(jobsQuery) { 
    try {
      await getJobsCoordinates(jobsQuery);
      setLoading(false);
    } catch(error) {
      console.log(error)
      setLoading(false);
    }
  } 

  return (
    <React.Fragment>
      <div style={{width: "60vw", height: "90vh"}}>
        <Addresses 
          handleOnBlur={handleOnBlur} 
          submit={submit} 
          addressData={coordinates} 
          error={error}
          loading={loading}/>
        <WrappedMap 
          isMarkerShown={coordinates.pickup || coordinates.dropoff}
          googleMapURL={'https://maps.googleapis.com/maps/api/js?key=AIzaSyD42XFQV9gGgBclEgi2z3B-SsjAgrw55Jk&callback=initMap'} 
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
          addressData={coordinates} />   
      </div>
    </React.Fragment>
  );
}
