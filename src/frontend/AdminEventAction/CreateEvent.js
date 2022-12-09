// under construction

import { toast } from "react-toastify"

const CreateEvent = () => {
    const submitCreate = async (e) => {
        e.preventDefault();
    
        const obj = {
            eventId: parseInt(document.getElementById("eventId").value),
            title: document.getElementById("title").value,
            venue: parseInt(document.getElementById("venue").value),
            date: document.getElementById("date").value,
            description: document.getElementById("description").value,
            presenter: document.getElementById("presenter").value,
            price: parseFloat(document.getElementById("price").value)
        }

        if (!obj.eventId) toast.error("Event ID is required.");
        
        await fetch(`${process.env.REACT_APP_SERVER_URL}/event/create`, {
            method: "POST",
            headers: new Headers({
                "Content-Type": 'application/json',
            }),
            body: JSON.stringify(obj)
        }).then((res) => res.json())
        .then((obj) => {
            if (obj.err) toast.error(obj.err);
            else toast.success(obj.msg);
        })
    }
    
    //Shown when "Create event" is clicked
    return(
        <form>
        <h4>Create event</h4>
        <hr/>
    
        <label htmlFor="eventId"><b>Event ID</b></label>
        <input type="text" id="eventId" name="eventId" placeholder="Enter EventId"/>
        <hr/>
    
        <label htmlFor="title"><b>Title</b></label>
        <input type="text" id="title" name="title" placeholder="Enter Title"/>
        <hr/>
    
        <label htmlFor="venue"><b>Location ID of Venue</b></label>
        <input type="text" id="venue" name="venue" placeholder="Enter Venue"/>
        <hr/>
        
        <label htmlFor="date"><b>Date (Please enter in yyyymmdd format, separated by comma)</b></label>
        <input type="text" id="date" name="date" placeholder="Enter Date"/>
        <hr/>
    
        <label htmlFor="description"><b>Description</b></label>
        <input type="text" id="description" name="description" placeholder="Enter Description"/>
        <hr/>
    
        <label htmlFor="presenter"><b>Presenter</b></label>
        <input type="text" id="presenter" name="presenter" placeholder="Enter Presenter"/>
        <hr/>
    
        <label htmlFor="price"><b>Price (Please enter without dollar sign)</b></label><br/>
        <input type="text" id="price" name="price" placeholder="Enter Price"/>
        <hr/>
    
        <button className="btn btn-success" onClick={(e) => {submitCreate(e)}}>Create</button>
    
        </form>
    )
}

export default CreateEvent;