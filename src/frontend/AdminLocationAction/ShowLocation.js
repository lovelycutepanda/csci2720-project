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
        <hr/>
        <table>
        <tr>
            <th>Index</th>
            <th>Location Id</th>
            <th>Name</th>
            <th>Position (longitude, latitude)</th>
            <th>EventList (Event ID)</th>
            <th>Comment</th>
        </tr>
        {locationList.map(({locationId, name, position, eventList, comment}, index) => {
            return(
            <tr key={index}>
                <td>{index+1}</td>
                <td>{locationId}</td>
                <td>{name} </td>
                <td>{position? `${position.longitude}, ${position.latitude}` : ""} </td>
                <td>{
                    eventList
                    .map((event) => {return `${event.eventId}`})
                    .join(', ')
                }</td>
                <td>{
                    comment
                    .map(({user, message}) => {return `${message} (by ${user.username})`})
                    .join(', ')
                }</td>
            </tr>
            );
        })}
        </table>
        </div>
    ) 

}

export default ShowLocation;