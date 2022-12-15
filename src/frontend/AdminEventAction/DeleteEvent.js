import { toast } from 'react-toastify';

const DeleteEvent = () => {

    // deletion, called when "Delete" button is clicked
    const submitDelete = async (e) => {
        e.preventDefault();

        let eventId = parseInt(document.getElementById("eventId").value);
        
        if (!eventId)
            return toast.error("Event ID is invalid.");

        await fetch(`${window.location.origin}/api/event/delete`, {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": 'application/json',
            }),
            body: JSON.stringify({
                eventId: eventId,
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

            <h4>Delete event</h4><hr/>

            <label htmlFor="event"></label>
            <input type="text" id="eventId" name="eventId" placeholder='Enter an event ID'/>
            <button className="btn btn-success" onClick={(e) => {submitDelete(e)}}>Delete</button>
  
        </form>
    )
}

export default DeleteEvent;