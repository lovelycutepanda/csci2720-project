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
        User List:
        <br/><br/>
        {userList.map(({username, password, favourite}, index) => {
            return(
            <p key={index}>
                user {index+1} <br/>
                username: {username} <br/>
                password (hashed): {password} <br/>
                favourite locations (Location _id): {favourite.join(', ')} <br/>
            </p>
            );
        })}
        </div>
    ) 

}

export default ShowUser;