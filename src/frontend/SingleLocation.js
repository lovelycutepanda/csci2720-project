import { useEffect, useState } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import './SingleLocation.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
  const sendSubmit = async () => {

    let newComment = {
      user: sessionStorage.getItem("user"),
      comment: comment
    };
    console.log(`${process.env.REACT_APP_SERVER_URL}/user/location/${locationId}`);
    // send newComment to database
    if(Object.keys(newComment.comment).length === 0) console.log('there is no comment');
    if(Object.keys(newComment.comment).length === 0){
      // if the comment box is empty, we dont update
      toast.error("There are no comment.");
    } else {
      await fetch(`${process.env.REACT_APP_SERVER_URL}/user/location/${locationId}`, {
        method: "POST",
        headers: new Headers({
            "Content-Type": 'application/json',
        }),
        body: JSON.stringify({
          newComment: newComment,
        })
      })
      .then((res) => res.json())
      .then((obj) => {
      console.log(obj);
      // if error is found
      if (obj.err)
          toast.error(obj.err);
      else
          toast.success(obj.msg);
      });
    }

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
          <button onClick={() => sendSubmit()}>Submit</button>
        </div>
        <ToastContainer position="bottom-right" autoClose={3000} pauseOnFocusLoss={false} />
    </div>
    
  );
}

export default SingleLocation;