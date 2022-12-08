import { useEffect, useState } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import './SingleLocation.css';


const SingleLocation = () => {

  const navigate = useNavigate(); 

  const { locationId } = useParams();

  const [favourite, setFavourite, locationList] = useOutletContext();

  const [location, setLocation] = useState({});
  const [comment, setComment] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);

  const back = () => {
    navigate('/user');
  }

  useEffect(() => {
    if (!favourite.length)
      return;
    setIsFavourite(favourite.indexOf(parseInt(locationId)) !== -1);
  }, [favourite]);

  useEffect(() => {
    if (!locationList.length)
      return;
    let loc = locationList.find((loc) => loc.locationId === parseInt(locationId));
    if (!loc)
      back();
    setLocation(loc);
  }, [locationList]);

  // send comment to database and clear the textarea
  const uploadComment = () => {
    let newComment = {
      user: sessionStorage.getItem("user"),
      comment: comment
    };
    console.log(newComment);
    // send newComment to database
  }

  const addFavourite = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/user/addfavourite`, {
      method: "PUT",
      headers: new Headers({
          "Content-Type": 'application/json',
      }),
      body: JSON.stringify({
          username: sessionStorage.getItem("user"),
          locationId: parseInt(locationId)
      })
    })
    if (isFavourite)
      setFavourite(favourite.filter((locId) => locId !== parseInt(locationId)));
    else
      setFavourite([...favourite, parseInt(locationId)]);
    setIsFavourite(!isFavourite);
  }

  return (
    <div>
        Location ID: {locationId}
        <button onClick={() => back()}>Return to all locations</button>
        <button onClick={() => addFavourite()}>{isFavourite? "Remove from favourite" : "Add to favourite"}</button>

        <div>
          
        </div>

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
                  <td>{date.map((str) => `${str.slice(6)}/${str.slice(4,6)}/${str.slice(0,4)}`).join(', ')}</td>
                  <td>{description}</td>
                  <td>{presenter}</td>
                  <td>{price}</td>
                </tr>)
            })}
          </tbody>
        </table>
        
        <div>
          <h2>Comments: </h2>
          <div className='comment'>
            {location?.comment?.map(({user, message}, index) => {
              return <p key={index}>{user.username} commented: {message}</p>
            })}
          </div>

          <h2>Leave your comment below: </h2>
          <br/>
          <form>
            <textarea className='submit-comment' placeholder='Enter your comment' id='commentContent'
              value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
          </form>
          <button onClick={() => uploadComment()}>Submit</button>
        </div>

    </div>
    
  );
}

export default SingleLocation;