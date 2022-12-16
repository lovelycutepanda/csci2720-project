/*
 * Group members:
 * Tam King Man 1155160072
 * Ku Nok Tik 1155143829
 * Tung Yuen Lok 1155143226
 * Lai Cheuk Lam 1155159309
 * Wong Wai Chun 1155159536
 */

import { useState } from 'react';
import { toast } from 'react-toastify';


const UpdateLocation = () => {

    // states
    const [updateTarget, setUpdateTarget] = useState({});
    const [key, setKey] = useState(true);

    const findLocation = async (e) => {
        e.preventDefault();

        let locationId = parseInt(document.getElementById("locationId").value);

        if (!locationId)
            return toast.error("Location ID is invalid.");
        
        await fetch(`${window.location.origin}/api/location/findone`, {
            method: "POST",
            headers: new Headers({
                "Content-Type": 'application/json',
            }),
            body: JSON.stringify({
                locationId: locationId
            })
        })
        .then((res) => res.json())
        .then((obj) => {
            if (obj.err) 
                toast.error(obj.err);
            else {
                setUpdateTarget(obj);
                setKey(!key);
            }
                
        });
    }

    // update, called when "Update" button is clicked
    const submitUpdate = async (e) => {
        e.preventDefault();

        let locationId = parseInt(document.getElementById("newLocationId").value);
        let name = document.getElementById("newName").value;
        let longitude = parseFloat(document.getElementById("newLongitude").value);
        let latitude = parseFloat(document.getElementById("newLatitude").value);

        if (!locationId)
            return toast.error("Location ID is invalid.");

        if (longitude && (longitude > 180 || longitude < -180))
            return toast.error("invalid longitude.");

        if (latitude && (latitude > 90 || latitude < -90))
            return toast.error("invalid latitude.");

        await fetch(`${window.location.origin}/api/location/update`, {
            method: "PUT",
            headers: new Headers({
                "Content-Type": 'application/json',
            }),
            body: JSON.stringify({
                locationId: updateTarget.locationId,
                newLocationId: locationId,
                newName: name,
                newLongitude: longitude,
                newLatitude: latitude
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

    // displayed when "Update Location" button is clicked
    return(
        <>
            <h4>Load the location information:</h4><hr/>

            <input type="text" id="locationId" name="locationId" placeholder='Input a location ID'/>
            <button className="btn btn-success" onClick={(e) => {findLocation(e)}}>Load location</button>
            
    
            {updateTarget.locationId && <form id="inputForm" method="get" key={key}>
                <br />
                <h4>Update to:</h4><hr/>
        
                <label htmlFor="newLocationId"><b>Location ID</b></label>
                <input type="text" id="newLocationId" name="newLocationId" defaultValue={updateTarget.locationId} />
                <br />
        
                <label htmlFor="newName"><b>Name</b></label>
                <input type="text" id="newName" name="newName" defaultValue={updateTarget.name} />
                <br />

                <h4>Position</h4><hr/>

                <label htmlFor="newLongitude"><b>Longitude</b></label>
                <input type="text" id="newLongitude" name="newLongitude" defaultValue={updateTarget.longitude} />
                <br/>

                <label htmlFor="newLatitude"><b>Latitude</b></label>
                <input type="text" id="newLatitude" name="newLatitude" defaultValue={updateTarget.latitude} />
                <br/>

                <button className="btn btn-success" onClick={(e) => {submitUpdate(e)}}>Update</button>
            </form>}

        </>
    )
  
}

export default UpdateLocation;