import React, { useState, useEffect, Suspense } from 'react';
import { getGeocodeAddress, getJobsCoordinates } from '../service/service';
import { WrappedMap } from './map/GoogleMap';
const Addresses = React.lazy(() => import('./form/Addresses'));
const ToastrPanel = React.lazy(() => import('./toastrPanel/ToastrPanel'));
import './App.css';

const API_KEY = process.env.API_KEY;
let mapUrl = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`; 

export default function App() {
  const [coordinates, setCoordinates] = useState({ pickup: null, dropoff: null });
  const [error, setError] = useState({ pickup: false, dropoff: false });
  const [loading, setLoading] = useState(false);
  const [displayToastr, setDisplayToastr] = useState(false);

  const handleOnChange = async (event) => {
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
      
      <Suspense fallback={<div>Loading...</div>}>
        <div style={{width: "70vw", height: "90vh"}}>
          <div className="container-app">
            <Addresses 
              handleOnChange={handleOnChange} 
              submit={submit} 
              addressData={coordinates} 
              error={error}
              loading={loading}/>
              {displayToastr && <ToastrPanel>Job has been created successfully!</ToastrPanel>}
          </div>
          <WrappedMap 
            isMarkerShown={coordinates.pickup || coordinates.dropoff}
            googleMapURL={mapUrl} 
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
            addressData={coordinates} />   
        </div>
      </Suspense>
    </React.Fragment>
  );
}
