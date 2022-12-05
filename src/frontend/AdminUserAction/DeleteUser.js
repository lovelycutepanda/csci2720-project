const DeleteUser = () => {

    // deletion, called when "Delete" button is clicked
    const submitDelete = async (e) => {
        e.preventDefault();

        let username = document.getElementById("username").value;

        if (username === "admin")
            return console.log("Cannot delete admin data.")

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

    // displayed when "Create User" button is clicked
    return(
        <form>
        Delete user <br/>
        <br/>
  
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
        <br/>
  
        <button className="btn btn-success" onClick={(e) => {submitDelete(e)}}>Delete</button>
  
        </form>
    )
}

export default DeleteUser;