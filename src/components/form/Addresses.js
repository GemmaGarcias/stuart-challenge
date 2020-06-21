import React, { useEffect } from 'react';
import { getJobsCoordinates } from '../../service/service';
import pickUpBadgeBlank from '../../assets/pickUpBadgeBlank.svg';
import dropOffBadgeBlank from '../../assets/dropOffBadgeBlank.svg';

export default function Addresses() {

  function handleOnBlur() {
    try {
      const response = getJobsCoordinates();
      console.log(response)
    } catch(error) {
      console.log(error)
    }
  } 

  return (
    <div className="container">
      <form>
        <label className="label">
          <img src={pickUpBadgeBlank} className="imgIcon"/>
          <input type="text" name="pickUp" className="input" placeholder="Pick up address" onBlur={ handleOnBlur }/>
        </label>
        <label className="label">
          <img src={dropOffBadgeBlank} className="imgIcon"/>
          <input type="text" name="dropOff" className="input" placeholder="Dropp off address"/>
        </label>
        <input type="submit" value="Create job" className="button" />
      </form>
    </div>
  );
}
