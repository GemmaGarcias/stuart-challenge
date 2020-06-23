import React, { useState, useEffect } from 'react';
import { getGeocodeAddress, getJobsCoordinates } from '../service/service';
import { WrappedMap } from './map/Map';
import Addresses from './form/Addresses';
import ToastrPanel from './toastrPanel/ToastrPanel';
import './App.css';

export default function App() {
  const [coordinates, setCoordinates] = useState({ pickup: null, dropoff: null });
  const [error, setError] = useState({ pickup: false, dropoff: false });
  const [loading, setLoading] = useState(false);
  const [displayToastr, setDisplayToastr] = useState(false);

  const handleOnBlur = async (event) => {
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

  const submit = async (event) => {
    event.preventDefault();
    const jobsQuery = {pickup: coordinates.pickup.address, dropoff: coordinates.dropoff.address};
    setLoading(true);
    await getJob(jobsQuery);
  }

  const getJob = async (jobsQuery) => { 
    try {
      await getJobsCoordinates(jobsQuery);
      setDisplayToastr(true);
      setLoading(false);
    } catch(error) {
      console.log(error)
      setLoading(false);
    }
  } 

  useEffect(() => {
    if(displayToastr){
      setTimeout(() => {
        setDisplayToastr(false)
      }, 5000);
    }
  },[displayToastr]);

  return (
    <React.Fragment>
      <div style={{width: "70vw", height: "90vh"}}>
        <div className="container-app">
          <Addresses 
            handleOnBlur={handleOnBlur} 
            submit={submit} 
            addressData={coordinates} 
            error={error}
            loading={loading}/>
            {displayToastr && <ToastrPanel>Job has been created successfully!</ToastrPanel>}
        </div>
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
