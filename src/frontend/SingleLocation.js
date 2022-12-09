import { useEffect, useState } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import './SingleLocation.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

  // load comment

  var username = sessionStorage.getItem("user");

  // get input comment
  const getComment = (e) => {
    console.log('input: ' + e.target.value);
    setComment(e.target.value);

  }

  // send comment to database and clear the textarea
  const sendSubmit = async () => {
    let newComment = {
      user: username,
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

  return (
    <div>
        Location ID: {locationId}
        <button onClick={() => back()}>Return to all locations</button>

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
              onChange={(e) => getComment(e)}></textarea>
          </form>
          <button onClick={() => sendSubmit()}>Submit</button>
        </div>
        <ToastContainer position="bottom-right" autoClose={3000} pauseOnFocusLoss={false} />
    </div>
    
  );
}

export default SingleLocation;