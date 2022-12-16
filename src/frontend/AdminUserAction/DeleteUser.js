/*
 * Group members:
 * Tam King Man 1155160072
 * Ku Nok Tik 1155143829
 * Tung Yuen Lok 1155143226
 * Lai Cheuk Lam 1155159309
 * Wong Wai Chun 1155159536
 */

import { toast } from 'react-toastify';


const DeleteUser = () => {

    // deletion, called when "Delete" button is clicked
    const submitDelete = async (e) => {
        e.preventDefault();

        let username = document.getElementById("username").value;

        if (username === "admin")
            return toast.error("Cannot delete admin data.")

        await fetch(`${window.location.origin}/api/user/delete`, {
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
            toast.error(obj.err);
        else
            toast.success(obj.msg);
        });
    }

    // displayed when "Delete user" button is clicked
    return(
        <form>

            <h4>Delete user</h4><hr/>
            
            <label htmlFor="username"></label>
            <input type="text" id="username" name="username" placeholder='Enter an username'/>
            <button className="btn btn-success" onClick={(e) => {submitDelete(e)}}>Delete</button>
  
        </form>
    )
}

export default DeleteUser;