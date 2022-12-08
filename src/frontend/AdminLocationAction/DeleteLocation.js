import { toast } from 'react-toastify';


const DeleteLocation = () => {

    // deletion, called when "Delete" button is clicked
    const submitDelete = async (e) => {
        e.preventDefault();

        let locationId = document.getElementById("locationId").value;

        await fetch(`${process.env.REACT_APP_SERVER_URL}/location/delete`, {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": 'application/json',
            }),
            body: JSON.stringify({
                locationId: locationId,
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

    // displayed when "Delete location" button is clicked
    return(
        <form>
        Delete location <br/>
        <br/>
  
        <label htmlFor="locationId">Location ID</label>
        <input type="text" id="locationId" name="locationId" />
        <br/>
  
        <button className="btn btn-success" onClick={(e) => {submitDelete(e)}}>Delete</button>
  
        </form>
    )
}

export default DeleteLocation;