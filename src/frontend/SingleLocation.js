import { useEffect, useState } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';


const SingleLocation = () => {

  const navigate = useNavigate(); 

  const { locationId } = useParams();

  const locationList = useOutletContext();

  const [location, setLocation] = useState({});

  const [comment, setComment] = useState({});

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

  // add comment function

  var username = sessionStorage.getItem("user");

  // get input comment
  const getEvaluate = (e) => {
    console.log('input: ' + e.target.value);
    setComment(e.target.value);

  }

  // send comment to database and clear the textarea
  const sendSubmit = () => {
    let newComment = {
      user: username,
      comment: comment
    };
    console.log(newComment);
    
  }


  return (
    <div>
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
        
        <div>
          {/* show all comments in history */}
          <div className='comment'>
            
          </div>

          {/* input new comment  */}
          <h2>Leave your comment below: </h2>
          <br/>
          <form>
            <textarea className='submit-comment' placeholder='Enter your comment' id='commentContent'
              onChange={(e) => getEvaluate(e)}></textarea>
          </form>
          <button onClick={() => sendSubmit()}>Submit</button>
        </div>

    </div>
    
  );
}

export default SingleLocation;