import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const SingleLocation = () => {

  const navigate = useNavigate(); 

  const { locationId } = useParams();

  const back = (e) => {
    navigate('/user');
  }

  return (
    <>
        Location ID: {locationId}
        <button onClick={() => back()}>Return to all locations</button>
    </>
    
  );
}

export default SingleLocation;