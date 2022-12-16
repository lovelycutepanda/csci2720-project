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


const ShowUser = () => {

    // states
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);

    // componentDidMount
    useEffect(() => {
        fetch(`${window.location.origin}/api/user/findall`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": 'application/json',
            })
        })
        .then((res) => res.json())
        .then((obj) => {
            setUserList(obj);
            setLoading(false);
        })
    }, []);

    // retrieval, called when "Show Users" button is clicked
    return(
        <div style={{position: "relative"}}>
            <h4>User List:</h4><hr/>

            <div style={{overflowX: "auto"}} >

                <Spinner display={loading} />
                <table>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Username</th>
                            <th>Password (hashed):</th>
                            <th>Favourite Locations (Location ID):</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map(({username, password, favourite}, index) => {
                            return(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{username}</td>
                                <td>{password}</td>
                                <td>{favourite.map((loc) => loc.locationId).join(', ')}</td>
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    ) 

}

export default ShowUser;