// under construction

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
            return console.log("Location ID required.");

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
                console.log(obj.err);
            else
                console.log(obj.msg);
        });
    }

    // displayed when "Create Location" button is clicked
    return(
        <form>
        Create location <br/>
        <br/>

        <label htmlFor="locationId">Location ID</label>
        <input type="text" id="locationId" name="locationId" />
        <br/>

        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <br/>

        Position <br/>

        <label htmlFor="longitude">Longitude</label>
        <input type="text" id="longitude" name="longitude" />
        <br/>

        <label htmlFor="latitude">Latitude</label>
        <input type="text" id="latitude" name="latitude" />
        <br/>

        <button className="btn btn-success" onClick={(e) => {submitCreate(e)}}>Create</button>

        </form>
    )
}

export default CreateLocation;