import React from 'react';
import pickUpBadgeBlank from '../../assets/pickUpBadgeBlank.svg';
import dropOffBadgeBlank from '../../assets/dropOffBadgeBlank.svg';

export default function Addresses() {

  return (
    <div className="container">
      <form>
        <label className="label">
          <img src={pickUpBadgeBlank} className="imgIcon"/>
          <input type="text" name="pickUp" className="input" placeholder="Pick up address"/>
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
