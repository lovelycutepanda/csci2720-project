import { useState } from 'react';
import { toast } from 'react-toastify';


const UpdateUser = () => {

    // states
    const [updateTarget, setUpdateTarget] = useState({});
    const [key, setKey] = useState(true);

    const findUser = async (e) => {
        e.preventDefault();

        let username = document.getElementById("username").value;

        if (username === "admin")
            return toast.error("Cannot change admin data.");
        
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
                toast.error(obj.err);
            else {
                setUpdateTarget(obj);
                console.log(obj);
                setKey(!key);
            }
                
        });
    }

    // update, called when "Update" button is clicked
    const submitUpdate = async (e) => {
        e.preventDefault();

        let username = document.getElementById("newUsername").value;
        let password = document.getElementById("newPassword").value;
        
        if (username.length < 4 || username.length > 20)
            return toast.error("Username is of 4-20 characters.");
        if (password.length < 4 || password.length > 20)
            return toast.error("Password is of 4-20 characters.");

        await fetch(`${process.env.REACT_APP_SERVER_URL}/user/update`, {
            method: "PUT",
            headers: new Headers({
                "Content-Type": 'application/json',
            }),
            body: JSON.stringify({
                username: updateTarget.username,
                newUsername: username,
                newPassword: password
            })
        })
        .then((res) => res.json())
        .then((obj) => {
            // if error is found
            if (obj.err)
                toast.error(obj.err);
            else
                toast.success(obj.msg);
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
    
            {updateTarget.username && <form id="inputForm" method="get" key={key}>
            <br />
            Update to: <br />
    
            <label htmlFor="newUsername">Username</label>
            <input type="text" id="newUsername" name="newUsername" defaultValue={updateTarget.username}/>
            <br />
    
            <label htmlFor="newPassword">Password</label>
            <input type="text" id="newPassword" name="newPassword" />
            <br />
    
            <button className="btn btn-success" onClick={(e) => {submitUpdate(e)}}>Update</button>
            </form>}
  
        </>
    )
  
}

export default UpdateUser;