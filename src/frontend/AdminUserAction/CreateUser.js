/*
 * Group members:
 * Tam King Man 1155160072
 * Ku Nok Tik 1155143829
 * Tung Yuen Lok 1155143226
 * Lai Cheuk Lam 1155159309
 * Wong Wai Chun 1155159536
 */

import { toast } from 'react-toastify';


const CreateUser = () => {

    // creation, called when "Create" button is clicked
    const submitCreate = async (e) => {
        e.preventDefault();

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        if (username.length < 4 || username.length > 20)
            return toast.error("Username is of 4-20 characters.");
        if (password.length < 4 || password.length > 20)
            return toast.error("Password is of 4-20 characters.");

        await fetch(`${window.location.origin}/api/user/create`, {
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
                toast.error(obj.err);
            else
                toast.success(obj.msg);
        });
    }

    // displayed when "Create User" button is clicked
    return(
        <form>

            <h4>Create user</h4><hr/>

            <label htmlFor="username"><b>Username</b></label>
            <input type="text" id="username" name="username" placeholder="Enter Username"/>

            <label htmlFor="password"><b>Password</b></label>
            <input type="text" id="password" name="password" placeholder="Enter Password"/>

            <button className="btn btn-success" onClick={(e) => {submitCreate(e)}}>Create</button>

        </form>
    )
}

export default CreateUser;