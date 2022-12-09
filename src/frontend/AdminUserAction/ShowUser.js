import { useEffect, useState } from 'react';


const ShowUser = () => {

    // states
    const [userList, setUserList] = useState([]);

    // componentDidMount
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/user/findall`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": 'application/json',
            })
        })
        .then((res) => res.json())
        .then((obj) => {
            setUserList(obj);
        })
    }, []);

    // retrieval, called when "Show Users" button is clicked
    return(
        <div>
        <h4>User List</h4>
        <hr/>
    
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Password (hashed):</th>
                    <th>Favourite Locations (Location ID):</th>
                </tr>
            </thead>
            <tbody>
                {userList.map(({username, password, favourite}, index) => {
                    return(
                    <tr key={index}>
                        <td>{username}</td>
                        <td>{password}</td>
                        <td>{favourite.map((loc) => loc.locationId).join(', ')}</td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
        </div>
    ) 

}

export default ShowUser;