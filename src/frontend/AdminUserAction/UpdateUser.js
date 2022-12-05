import { useState } from 'react';


const UpdateUser = () => {

    // states
    const [updateTarget, setUpdateTarget] = useState("");

    const findUser = async (e) => {
        e.preventDefault();

        let username = document.getElementById("username").value;

        if (username === "admin")
            return console.log("Cannot change admin data.");
        
        await fetch(`${process.env.REACT_APP_SERVER_URL}/user/findone`, {
            method: "POST",
            headers: new Headers({
                "Content-Type": 'application/json',
            }),
            body: JSON.stringify({
                username: username
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

    // update, called when "Update" button is clicked
    const submitUpdate = async (e) => {
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

    // displayed when "Update User" button is clicked
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
  
          <button className="btn btn-success" onClick={(e) => {submitUpdate(e)}}>Update</button>
          </form>}
  
        </>
    )
  

}

export default UpdateUser;