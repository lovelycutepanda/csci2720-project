/*
 * Group members:
 * Tam King Man 1155160072
 * Ku Nok Tik 1155143829
 * Tung Yuen Lok 1155143226
 * Lai Cheuk Lam 1155159309
 * Wong Wai Chun 1155159536
 */

import { useEffect, useState } from 'react';
import Spinner from '../Spinner.js';
    

const ShowLocation = () => {

    // states
    const [locationList, setLocationList] = useState([]);
    const [loading, setLoading] = useState(true);

    // componentDidMount
    useEffect(() => {
        fetch(`${window.location.origin}/api/location/findall`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": 'application/json',
            })
        })
        .then((res) => res.json())
        .then((obj) => {
            setLocationList(obj);
            setLoading(false);
        })
    }, []);

    // retrieval, called when "Show Locations" button is clicked
    return(
        <div style={{position: "relative"}}>
            <h4>Location List:</h4><hr/>

            <div style={{overflowX: "auto"}} >

                <Spinner display={loading} />
                <table>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Location Id</th>
                            <th>Name</th>
                            <th>Position (longitude, latitude)</th>
                            <th>EventList (Event ID)</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
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
                    </tbody>
                </table>
            </div>
        </div>
    ) 

}

export default ShowLocation;