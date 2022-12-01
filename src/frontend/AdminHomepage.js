import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AdminHomepage = () => {

  const navigate = useNavigate();  

  useEffect(() => {
    console.log(window.sessionStorage.getItem("user"));
  }, []);

  const getAllUser = async () => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
      method: "GET",
      headers: new Headers({
          "Content-Type": 'application/json',
      })
  })
      .then((res) => res.json())
      .then((obj) => {
        obj.map(({username, password, favourite}, index) => {
          console.log(favourite);
          let str = `
          user ${index}
          username: ${username}
          password: ${password}
          favourite locations: ${favourite}
          `
          str = str.replace(/^ +/gm, '');
          console.log(str);
        });
      });
  }

  const logout = () => {
    window.sessionStorage.removeItem("user");
    navigate("/");
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-10 col-sm-8 col-lg-9 col-xl-10">
        <p>This is admin's home page</p>
          <button className="btn btn-success mx-1" onClick={() => {getAllUser()}}>Get users</button>
        </div>

        <div className="col-2 col-sm-4 col-lg-3 col-xl-2">
          <p>User: {window.sessionStorage.getItem("user")}</p>
          <button className="btn btn-success" onClick={() => {logout()}}>Log out</button>
        </div>
      </div>
    </div>
  );
}

export default AdminHomepage;