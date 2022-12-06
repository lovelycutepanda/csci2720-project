import { useEffect, useState } from 'react';


const ShowLocation = () => {

    // states
    const [locationList, setLocationList] = useState([]);

    // componentDidMount
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/location/findall`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": 'application/json',
            })
        })
        .then((res) => res.json())
        .then((obj) => {
            setLocationList(obj);
        })
    }, []);

    // retrieval, called when "Show Locations" button is clicked
    return(
        <div>
        Location List:
        <br/><br/>
        {locationList.map(({locationId, name, position, eventList, comment}, index) => {
            return(
            <p key={index}>
                location {index+1} <br/>
                locationId: {locationId} <br/>
                name: {name} <br/>
                position (longitude, latitude): {position? `${position.longitude}, ${position.latitude}` : ""} <br/>
                eventList (Event _id): {eventList} <br/>
                comment: {comment} <br/>
            </p>
            );
        })}
        </div>
    ) 

}

export default ShowLocation;