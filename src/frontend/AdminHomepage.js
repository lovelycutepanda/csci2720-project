import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AdminHomepage = () => {

  const navigate = useNavigate();  
  const [userList, setUserList] = useState([]);
  const [action, setAction] = useState("");

  // componentDidMount
  useEffect(() => {
    console.log(window.sessionStorage.getItem("user"));
  }, []);

  // retrieval, called when "Show Users" button is clicked
  const getUser = async () => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
      method: "GET",
      headers: new Headers({
          "Content-Type": 'application/json',
      })
  })
      .then((res) => res.json())
      .then((obj) => {
        setUserList(obj);
      })
      .finally(() => setAction("getUser"));
  }

  // displayed when getUser() is called
  const showUser = () => {
    return(
      <div>
        User List:
        <br/><br/>
        {userList.map(({username, password, favourite}, index) => {
          return(
            <p key={index}>
              user {index+1} <br/>
              username: {username} <br/>
              password: {password} <br/>
              favourite locations: {favourite} <br/>
            </p>
          );
        })}
      </div>
    ) 
  }

  // displayed when "Create User" button is clicked
  const showForm = () => {
    return(
      <form>
      Create user <br/>
      <br/>

      <label htmlFor="username">Username</label>
      <input type="text" id="username" name="username" />
      <br/>

      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" />
      <br/>

      <button className="btn btn-success" onClick={(e) => {createUser(e)}}>Create</button>

      </form>
    )
  }

  // creation, called when "Create" button is clicked
  const createUser = async (e) => {
    e.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username.length < 4 || username.length > 20)
      return console.log("Username is of 4-20 characters.");
    if (password.length < 4 || password.length > 20)
      return console.log("Password is of 4-20 characters.");

    await fetch(`${process.env.REACT_APP_SERVER_URL}/user/create`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": 'application/json',
        }),
        body: JSON.stringify({
          username: username,
          password: password
        })
    })
        .then((res) => res.json())
        .then((obj) => {
          // if error is found
          if (obj.err)
            console.log(obj.err);
          else
            console.log(obj.msg);
        });
  }

  const logout = () => {
    window.sessionStorage.removeItem("user");
    navigate("/");
  }

  const actionSwitch = () => {
    return <div className="py-4">
      {action === "getUser" && showUser()}
      {action === "createUser" && showForm()}
      {/*action === "updateUser" && ()*/}
      {/*action === "deleteUser" && ()*/}
    </div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-10 col-sm-8 col-lg-9 col-xl-10">
          <h2>This is admin's home page</h2>
          <button className="btn btn-success mx-1" onClick={() => {getUser()}}>Show users</button>
          <button className="btn btn-success mx-1" onClick={() => {setAction("createUser")}}>Create user</button>
          
          {actionSwitch()}
        </div>

        <div className="col-2 col-sm-4 col-lg-3 col-xl-2">
          <p>User: {window.sessionStorage.getItem("user")}</p>
          <button className="btn btn-success" onClick={() => {logout()}}>Log Out</button>
        </div>

      </div>
    </div>
  );
}

export default AdminHomepage;