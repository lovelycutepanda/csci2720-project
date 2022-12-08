import { useEffect, useState } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';


const SingleLocation = () => {

  const navigate = useNavigate(); 

  const { locationId } = useParams();

  const locationList = useOutletContext();

  const [location, setLocation] = useState({});

  const back = () => {
    navigate('/user');
  }

  useEffect(() => {
    if (!locationList.length)
      return;
    let location = locationList.find((loc) => loc.locationId === parseInt(locationId));
    if (!location)
      back();
    setLocation(location);
  }, [locationList])

  return (
    <>
        Location ID: {locationId}
        <button onClick={() => back()}>Return to all locations</button>

        <table className="container-fluid">
          <thead>
            <tr>
              <th>Title</th>
              <th>Venue</th>
              <th>Date</th>
              <th>Description</th>
              <th>Presenter</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {location?.eventList?.map(({title, date, description, presenter, price}, index) => {
              return (
                <tr key={index}>
                  <td>{title}</td>
                  <td>{location.name}</td>
                  <td>{date.join(', ')}</td>
                  <td>{description}</td>
                  <td>{presenter}</td>
                  <td>{price}</td>
                </tr>)
            })}
          </tbody>
        </table>
    </>
    
  );
}

export default SingleLocation;