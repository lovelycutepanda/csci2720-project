import { useState } from 'react';
import { toast } from 'react-toastify';


const processDate = (date) => {
    // convert date from string to list of string
    const dateListStr = date.replace(/ /g, '').split(',');
    const dateList = [];
    for (let d of dateListStr) {
        const newDate = new Date(parseInt(d.slice(0, 4)), parseInt(d.slice(4, 6)) - 1, parseInt(d.slice(6)), 8, 0, 0);
        if (isNaN(newDate.valueOf()))
            throw "error";
        dateList.push(newDate);
    }
    return dateList;
}

const UpdateEvent = () => {

    // states
    const [updateTarget, setUpdateTarget] = useState({});
    //const [key, setKey] = useState(true);

    const findEvent = async (e) => {
        e.preventDefault();

        let eventId = parseInt(document.getElementById("eventId").value);

        if (!eventId)
            return toast.error("Event ID is invalid.");
        
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
        let date;
        let description = document.getElementById("newDescription").value;
        let presenter = document.getElementById("newPresenter").value;
        let price = document.getElementById("newPrice").value;

        if (!eventId)
            return toast.error("Event ID is invalid.");

        if (!venue)
            return toast.error("Location ID is invalid.");

        try {
            date = document.getElementById("newDate").value? processDate(document.getElementById("newDate").value) : [];
        } catch (e) {
            return toast.error("Date data are invalid.");
        }

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
    const unProcessDate = (dateList) => {
        let dateStrList = dateList.map((d) => {return d.toString().slice(0, 10).replace(/-/g, '')});
        return dateStrList.join(', ');
    }

    // displayed when "Update Location" button is clicked
    return(
        <>
            <h4>Load the event information:</h4><hr/>

            <input type="text" id="eventId" name="eventId" placeholder='Input an event ID'/>
            <button className="btn btn-success" onClick={(e) => {findEvent(e)}}>Load event</button>
    
            {updateTarget.eventId && <form id="inputForm" method="get">
                <br />
                <h4>Update to:</h4><hr/>
        
                <label htmlFor="newEventId"><b>Event ID</b></label>
                <input type="text" id="newEventId" name="newEventId" defaultValue={updateTarget.eventId} />
                <br />
        
                <label htmlFor="newTitle"><b>Title</b></label>
                <input type="text" id="newTitle" name="newTitle" defaultValue={updateTarget.title} />
                <br />

                <label htmlFor="newVenue"><b>Venue ID</b></label>
                <input type="text" id="newVenue" name="newVenue" defaultValue={updateTarget.venue.locationId} />
                <br/>

                <label htmlFor="newDate"><b>Date (Please enter in yyyymmdd format, separated by comma)</b></label>
                <input type="text" id="newDate" name="newDate" defaultValue={unProcessDate(updateTarget.date)} />
                <br/>

                <label htmlFor="newDescription"><b>Description</b></label>
                <input type="text" id="newDescription" name="newDescription" defaultValue={updateTarget.description} />
                <br/>

                <label htmlFor="newPresenter"><b>Presenter</b></label>
                <input type="text" id="newPresenter" name="newPresenter" defaultValue={updateTarget.presenter} />
                <br/>

                <label htmlFor="newPrice"><b>Price</b></label>
                <input type="text" id="newPrice" name="newPrice" defaultValue={updateTarget.price} />
                <br/>

                <button className="btn btn-success" onClick={(e) => {submitUpdate(e)}}>Update</button>
            </form>}

        </>
    )
  
}

export default UpdateEvent;