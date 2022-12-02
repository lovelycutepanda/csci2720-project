import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AdminHomepage = () => {

  const navigate = useNavigate();  

  // states
  const [userList, setUserList] = useState([]);
  const [action, setAction] = useState("");
  const [updateTarget, setUpdateTarget] = useState("");

  // componentDidMount
  useEffect(() => {
    console.log(window.sessionStorage.getItem("user"));
  }, []);

  // retrieval, called when "Show Users" button is clicked
  const findAllUser = async () => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/user/findall`, {
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
  const showCreateForm = () => {
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

  // displayed when "Update User" button is clicked
  const showUpdateForm = () => {

    const findUser = async (e) => {
      e.preventDefault();
      await fetch(`${process.env.REACT_APP_SERVER_URL}/user/findone`, {
        method: "POST",
        headers: new Headers({
            "Content-Type": 'application/json',
        }),
        body: JSON.stringify({
          username: document.getElementById("username").value
        })
    })
        .then((res) => res.json())
        .then((obj) => {
          if (obj.err) 
            console.log(obj.err);
          else
            setUpdateTarget(obj.username);
        });
    }

    return(
      <>
        <p id="getdata">
          Input user name to load the user information: 
          <input type="text" id="username" name="username" />
          <button className="btn btn-success" onClick={(e) => {findUser(e)}}>Load user</button>
        </p>

        {updateTarget && <form id="inputForm" method="get">
        <br />
        Update to: <br />

        <label htmlFor="username">Username (Original: {updateTarget})</label>
        <input type="text" id="updatedUsername" name="updatedUsername" />
        <br />

        <label htmlFor="password">Password</label>
        <input type="text" id="updatedPassword" name="updatedPassword" />
        <br />

        <button className="btn btn-success" onClick={(e) => {updateUser(e)}}>Update</button>
        </form>}

      </>
  )}

  // update, called when "Update" button is clicked
  const updateUser = async (e) => {
    e.preventDefault();

    let username = document.getElementById("updatedUsername").value;
    let password = document.getElementById("updatedPassword").value;

    if (username.length < 4 || username.length > 20)
      return console.log("Username is of 4-20 characters.");
    if (password.length < 4 || password.length > 20)
      return console.log("Password is of 4-20 characters.");

    await fetch(`${process.env.REACT_APP_SERVER_URL}/user/update`, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": 'application/json',
        }),
        body: JSON.stringify({
          username: updateTarget,
          newUsername: username,
          newPassword: password
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

  // displayed when "Create User" button is clicked
  const showDeleteForm = () => {
    return(
      <form>
      Delete user <br/>
      <br/>

      <label htmlFor="username">Username</label>
      <input type="text" id="username" name="username" />
      <br/>

      <button className="btn btn-success" onClick={(e) => {deleteUser(e)}}>Delete</button>

      </form>
    )
  }

  // update, called when "Update" button is clicked
  const deleteUser = async (e) => {
    e.preventDefault();

    let username = document.getElementById("username").value;

    await fetch(`${process.env.REACT_APP_SERVER_URL}/user/delete`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": 'application/json',
        }),
        body: JSON.stringify({
          username: username,
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
      {action === "createUser" && showCreateForm()}
      {action === "updateUser" && showUpdateForm()}
      {action === "deleteUser" && showDeleteForm()}
    </div>;
  }

  return (
    <div className="container-fluid">

      {/* please work on frontend design */}
      
      <div className="row">
        <div className="col-10 col-sm-8 col-lg-9 col-xl-10">
          <h2>This is admin's home page</h2>
          <button className="btn btn-success mx-1" onClick={() => {findAllUser()}}>Show users</button>
          <button className="btn btn-success mx-1" onClick={() => {setAction("createUser")}}>Create user</button>
          <button className="btn btn-success mx-1" onClick={() => {setAction("updateUser"); setUpdateTarget("");}}>Update user</button>
          <button className="btn btn-success mx-1" onClick={() => {setAction("deleteUser")}}>Delete user</button>
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