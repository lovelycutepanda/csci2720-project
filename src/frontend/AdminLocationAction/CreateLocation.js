// under construction

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
            return toast.error("Location ID required.");

        await fetch(`${process.env.REACT_APP_SERVER_URL}/location/create`, {
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
        <h4>Create location</h4>
        <hr/>

        <label htmlFor="locationId"><b>Location ID</b></label>
        <input type="text" id="locationId" name="locationId" placeholder="Enter LocationId"/>
        <hr/>

        <label htmlFor="name"><b>Name</b></label>
        <input type="text" id="name" name="name" placeholder="Enter Name"/>
        <hr/>

        <h4>Position </h4>
        <hr/>

        <label htmlFor="longitude"><b>Longitude</b></label>
        <input type="text" id="longitude" name="longitude" placeholder="Enter Longitude"/>
        <hr/>

        <label htmlFor="latitude"><b>Latitude</b></label>
        <input type="text" id="latitude" name="latitude" placeholder="Enter Latitude"/>
        <hr/>

        <button className="btn btn-success" onClick={(e) => {submitCreate(e)}}>Create</button>

        </form>
    )
}

export default CreateLocation;