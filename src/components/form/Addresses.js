import React from 'react';
import pickUpBadgeBlank from '../../assets/pickUpBadgeBlank.svg';
import pickUpBadgeError from '../../assets/pickUpBadgeError.svg';
import pickUpBadgePresent from '../../assets/pickUpBadgePresent.svg';
import dropOffBadgeBlank from '../../assets/dropOffBadgeBlank.svg';
import dropOffBadgeError from '../../assets/dropOffBadgeError.svg';
import dropOffBadgePresent from '../../assets/dropOffBadgePresent.svg';

export default function Addresses(props) {
  const {handleOnBlur, addressData, submit, error, loading} = props;
  
  const validateIcon = (error, type) => {
    switch (type){
        case 'pickup':
          if(!error.pickup && isNull(addressData.pickup)){
            return pickUpBadgeBlank;
          } else if(error.pickup && isNull(addressData.pickup)){
            return pickUpBadgeError;
          } else {
            return pickUpBadgePresent;
          }
        case 'dropoff':
          if(!error.dropoff && isNull(addressData.dropoff)){
            return dropOffBadgeBlank;
          } else if(error.dropoff && isNull(addressData.dropoff)){
            return dropOffBadgeError;
          } else {
            return dropOffBadgePresent;
          }
        default:
          return;
    }
  }

  const validateSubmit = () => {
    let disableButton = isNull(addressData.pickup) || isNull(addressData.dropoff) || error.pickup || error.dropoff;
    return disableButton;
  }

  const isNull = (item) => {
    return item === null;
  }

  return (
    <div className="container">
      <form onSubmit={submit}>
        <label className="label">
          <img src={validateIcon(error, "pickup")} className="imgIcon"/>
          <input 
            type="text" 
            name="pickup" 
            className="input" 
            placeholder="Pick up address" 
            onBlur={ handleOnBlur } />
        </label>
        <label className="label">
          <img src={validateIcon(error, "dropoff")} className="imgIcon"/>
          <input 
            type="text" 
            name="dropoff" 
            className="input" 
            placeholder="Dropp off address"
            onBlur={ handleOnBlur }/>
        </label>
        <input type="submit" value={loading ? "Creating..." : "Create job"} 
          className={validateSubmit() || loading ? "button button--state-disabled" : "button"} />
      </form>
    </div>
  );
}
