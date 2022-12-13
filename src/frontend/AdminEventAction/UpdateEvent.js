// under construction
import { useState } from 'react';
import { toast } from 'react-toastify';


const UpdateEvent = () => {

    // states
    const [updateTarget, setUpdateTarget] = useState({});
    //const [key, setKey] = useState(true);

    const findEvent = async (e) => {
        e.preventDefault();

        let eventId = parseInt(document.getElementById("eventId").value);

        if (!eventId)
            return toast.error("Event ID required.");
        
        await fetch(`${process.env.REACT_APP_SERVER_URL}/event/findone`, {
            method: "POST",
            headers: new Headers({
                "Content-Type": 'application/json',
            }),
            body: JSON.stringify({
                eventId: eventId
            })
        })
        .then((res) => res.json())
        .then((obj) => {
            if (obj.err) 
                toast.error(obj.err);
            else {
                setUpdateTarget(obj);
                //setKey(!key);
            }
        });
    }

    // update, called when "Update" button is clicked
    const submitUpdate = async (e) => {
        e.preventDefault();

        let eventId = parseInt(document.getElementById("newEventId").value);
        let title = document.getElementById("newTitle").value;
        let venue = parseInt(document.getElementById("newVenue").value);
        let date = document.getElementById("newDate").value;
        let description = document.getElementById("newDescription").value;
        let presenter = document.getElementById("newPresenter").value;
        let price = document.getElementById("newPrice").value;

        if (!eventId)
            return toast.error("Event ID required.");

        await fetch(`${process.env.REACT_APP_SERVER_URL}/event/update`, {
            method: "PUT",
            headers: new Headers({
                "Content-Type": 'application/json',
            }),
            body: JSON.stringify({
                eventId: updateTarget.eventId,
                newEventId: eventId,
                newTitle: title,
                newVenue: venue,
                newDate: date,
                newDescription: description,
                newPresenter: presenter,
                newPrice: price
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
    
    // convert Array of Date() object to Array of string to string
    const processDate = (dateList) => {
        let dateStrList = dateList.map((d) => {return d.toString().slice(0, 10)});
        return dateStrList.join(', ');
    }

    // displayed when "Update Location" button is clicked
    return(
        <>
            <p id="getdata">
                <h4>Load the event information:</h4><hr/>
                <input type="text" id="eventId" name="eventId" placeholder='Input an event ID'/>
                <button className="btn btn-success" onClick={(e) => {findEvent(e)}}>Load event</button>
            </p>
    
            {updateTarget.eventId && <form id="inputForm" method="get">
            <br />
            Update to: <br />
    
            <label htmlFor="newEventId">Event ID</label>
            <input type="text" id="newEventId" name="newEventId" defaultValue={updateTarget.eventId} />
            <br />
    
            <label htmlFor="newTitle">Title</label>
            <input type="text" id="newTitle" name="newTitle" defaultValue={updateTarget.title} />
            <br />

            <label htmlFor="newVenue">Venue ID</label>
            <input type="text" id="newVenue" name="newVenue" defaultValue={updateTarget.venue.locationId} />
            <br/>

            <label htmlFor="newDate">Date</label>
            <input type="text" id="newDate" name="newDate" defaultValue={processDate(updateTarget.date)} />
            <br/>

            <label htmlFor="newDescription">Description</label>
            <input type="text" id="newDescription" name="newDescription" defaultValue={updateTarget.description} />
            <br/>

            <label htmlFor="newPresenter">Presenter</label>
            <input type="text" id="newPresenter" name="newPresenter" defaultValue={updateTarget.presenter} />
            <br/>

            <label htmlFor="newPrice">Price</label>
            <input type="text" id="newPrice" name="newPrice" defaultValue={updateTarget.price} />
            <br/>

            <button className="btn btn-success" onClick={(e) => {submitUpdate(e)}}>Update</button>
            </form>}

        </>
    )
  
}

export default UpdateEvent;