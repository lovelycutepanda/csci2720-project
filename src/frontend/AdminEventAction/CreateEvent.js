import { toast } from "react-toastify"

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


const CreateEvent = () => {
    const submitCreate = async (e) => {
        e.preventDefault();
    
        const obj = {
            eventId: parseInt(document.getElementById("eventId").value),
            title: document.getElementById("title").value,
            venue: parseInt(document.getElementById("venue").value),
            description: document.getElementById("description").value,
            presenter: document.getElementById("presenter").value,
            price: document.getElementById("price").value
        }

        if (!obj.eventId) 
            return toast.error("Event ID is invalid.");

        if (!obj.venue)
            return toast.error("Location ID is invalid.");

        try {
            obj.date = document.getElementById("date").value? processDate(document.getElementById("date").value) : [];
        } catch (e) {
            return toast.error("Date data are invalid.");
        }
        
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

            <h4>Create event</h4><hr/>
        
            <label htmlFor="eventId"><b>Event ID</b></label>
            <input type="text" id="eventId" name="eventId" placeholder="Enter EventId"/>
        
            <label htmlFor="title"><b>Title</b></label>
            <input type="text" id="title" name="title" placeholder="Enter Title"/>
        
            <label htmlFor="venue"><b>Location ID of Venue</b></label>
            <input type="text" id="venue" name="venue" placeholder="Enter Venue"/>
            
            <label htmlFor="date"><b>Date (Please enter in yyyymmdd format, separated by comma)</b></label>
            <input type="text" id="date" name="date" placeholder="Enter Date"/>
        
            <label htmlFor="description"><b>Description</b></label>
            <input type="text" id="description" name="description" placeholder="Enter Description"/>
        
            <label htmlFor="presenter"><b>Presenter</b></label>
            <input type="text" id="presenter" name="presenter" placeholder="Enter Presenter"/>
        
            <label htmlFor="price"><b>Price</b></label><br/>
            <input type="text" id="price" name="price" placeholder="Enter Price"/>
        
            <button className="btn btn-success" onClick={(e) => {submitCreate(e)}}>Create</button>
    
        </form>
    )
}

export default CreateEvent;