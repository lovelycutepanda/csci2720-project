/*
 * Group members:
 * Tam King Man 1155160072
 * Ku Nok Tik 1155143829
 * Tung Yuen Lok 1155143226
 * Lai Cheuk Lam 1155159309
 * Wong Wai Chun 1155159536
 */

import { toast } from "react-toastify";

const CreateLocation = () => {

    // creation, called when "Create" button is clicked
    const submitCreate = async (e) => {
        e.preventDefault();

        const obj = {
            locationId: parseInt(document.getElementById("locationId").value),
            name: document.getElementById("name").value,
            longitude: parseFloat(document.getElementById("longitude").value),
            latitude: parseFloat(document.getElementById("latitude").value)
        }

        if (!obj.locationId)
            return toast.error("Location ID is invalid.");

        if (obj.longitude && (obj.longitude > 180 || obj.longitude < -180))
            return toast.error("invalid longitude.");

        if (obj.latitude && (obj.latitude > 90 || obj.latitude < -90))
            return toast.error("invalid latitude.");

        await fetch(`${window.location.origin}/api/location/create`, {
            method: "POST",
            headers: new Headers({
                "Content-Type": 'application/json',
            }),
            body: JSON.stringify(obj)
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

    // displayed when "Create Location" button is clicked
    return(
        <form>

            <h4>Create location</h4><hr/>

            <label htmlFor="locationId"><b>Location ID</b></label>
            <input type="text" id="locationId" name="locationId" placeholder="Enter LocationId"/>

            <label htmlFor="name"><b>Name</b></label>
            <input type="text" id="name" name="name" placeholder="Enter Name"/>

            <h4>Position </h4><hr/>

            <label htmlFor="longitude"><b>Longitude</b></label>
            <input type="text" id="longitude" name="longitude" placeholder="Enter Longitude"/>

            <label htmlFor="latitude"><b>Latitude</b></label>
            <input type="text" id="latitude" name="latitude" placeholder="Enter Latitude"/>

            <button className="btn btn-success" onClick={(e) => {submitCreate(e)}}>Create</button>

        </form>
    )
}

export default CreateLocation;