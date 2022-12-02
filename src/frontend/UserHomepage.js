import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const UserHomepage = () => {

  const navigate = useNavigate();  

  useEffect(() => {
    console.log(window.sessionStorage.getItem("user"));
  }, []);

  const getAllEvent = async () => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/event`, {
      method: "GET",
      headers: new Headers({
          "Content-Type": 'application/json',
      })
  })
      .then((res) => res.json())
      .then((obj) => {
        let { message } = obj;
        console.log(message);
      });
  }

  const getAllLocation = async () => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/location`, {
      method: "GET",
      headers: new Headers({
          "Content-Type": 'application/json',
      })
  })
      .then((res) => res.json())
      .then((obj) => {
        let { message } = obj;
        console.log(message);
      });
  }

  const logout = () => {
    window.sessionStorage.removeItem("user");
    navigate("/");
  }

  return (
    <div className="container-fluid">

      {/* please work on frontend design */}

      <div className="row">
        <div className="col-10 col-sm-8 col-lg-9 col-xl-10">
          <h2>This is user's home page</h2>
          <button className="btn btn-success mx-1" onClick={() => {getAllEvent()}}>Get events</button>
          <button className="btn btn-success mx-1" onClick={() => {getAllLocation()}}>Get locations</button>
        </div>

        <div className="col-2 col-sm-4 col-lg-3 col-xl-2">
          <p>User: {window.sessionStorage.getItem("user")}</p>
          <button className="btn btn-success" onClick={() => {logout()}}>Log out</button>
        </div>
      </div>
    </div>
  );
}

export default UserHomepage;