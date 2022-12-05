import { useEffect, useState } from 'react';


const ShowUser = () => {

    // states
    const [userList, setUserList] = useState([]);

    // componentDidMount, called when "Show Users" button is clicked
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

    // displayed when getUser() is called
    return(
        <div>
        User List:
        <br/><br/>
        {userList.map(({username, password, favourite}, index) => {
            return(
            <p key={index}>
                user {index+1} <br/>
                username: {username} <br/>
                password: {password} <br/>
                favourite locations: {favourite} <br/>
            </p>
            );
        })}
        </div>
    ) 

}

export default ShowUser;