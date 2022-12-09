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
        <br />
        Venue: {location.name}
        <br />
        <button className='btn btn-outline-dark m-2' onClick={() => back()}>Return to all locations</button>
        <button className='btn btn-outline-dark m-2' onClick={() => addFavourite()}>{isFavourite? "Remove from favourite" : "Add to favourite"}</button>

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
              let simplifiedDate = [];
              for (let d in date){
                if (simplifiedDate.length === 0 
                    || simplifiedDate[simplifiedDate.length - 1].slice(4, 6) !== date[d].slice(4, 6)
                    || (simplifiedDate[simplifiedDate.length - 1].slice(6).length === 2 && Number(simplifiedDate[simplifiedDate.length - 1].slice(6)) + 1 !== Number(date[d].slice(6)))
                    || (simplifiedDate[simplifiedDate.length - 1].slice(6).length === 4 && Number(simplifiedDate[simplifiedDate.length - 1].slice(9)) + 1 !== Number(date[d].slice(6)))){
                  /* This matches 4 cases:
                  (1) No elements in simplifiedDate 
                  (2) New element's (d) month does not match that of last element
                  (3) Last element's date is not a range (i.e. not xx~yy) and the new date (d) is not the next day
                      e.g. last element is 20220708 then d is 20220710
                  (4) Last element's date is a range (i.e. xx~yy) and the new date (d) is not the next day
                      e.g. last element is 20220708~10 (i.e. 08~10/07/2022), then d is 20220712
                  Any of these 4 cases results in a new element in simplifiedDate
                  */
                  simplifiedDate.push(date[d]);
                } else {
                  //The remaining case must be the new date (d) is the next day of the last element of simplifiedDate
                  if (simplifiedDate[simplifiedDate.length - 1].length === 8){
                    //date is not a range (i.e. not xx~yy)
                    simplifiedDate[simplifiedDate.length - 1] += '~' + date[d].slice(6);
                    //console.log('~' + date[d].slice(6));
                  } else {
                    //date is a range
                    simplifiedDate[simplifiedDate.length - 1] = simplifiedDate[simplifiedDate.length - 1].slice(0, 9) + date[d].slice(6);
                    //console.log(simplifiedDate[simplifiedDate.length - 1].slice(0, 9) + date[d].slice(6));
                  }
                  //console.log(simplifiedDate);
                }
              }
              return (
                <tr key={index}>
                  <td>{title}</td>
                  <td>{location.name}</td>
                  <td>{simplifiedDate.map((str) => `${str.slice(6)}/${str.slice(4,6)}/${str.slice(0,4)}`).join(', ')}</td>
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