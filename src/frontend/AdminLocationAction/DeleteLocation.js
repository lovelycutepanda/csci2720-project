/*
 * Group members:
 * Tam King Man 1155160072
 * Ku Nok Tik 1155143829
 * Tung Yuen Lok 1155143226
 * Lai Cheuk Lam 1155159309
 * Wong Wai Chun 1155159536
 */

import { toast } from 'react-toastify';


const DeleteLocation = () => {

    // deletion, called when "Delete" button is clicked
    const submitDelete = async (e) => {
        e.preventDefault();

        let locationId = parseInt(document.getElementById("locationId").value);

        if (!locationId)
            return toast.error("Location ID is invalid.");

        await fetch(`${window.location.origin}/api/location/delete`, {
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

            <h4>Delete location</h4><hr/>

            <label htmlFor="locationId"></label>
            <input type="text" id="locationId" name="locationId" placeholder='Enter a location'/>
            <button className="btn btn-success" onClick={(e) => {submitDelete(e)}}>Delete</button>
  
        </form>
    )
}

export default DeleteLocation;