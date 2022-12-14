/*
 * Group members:
 * Tam King Man 1155160072
 * Ku Nok Tik 1155143829
 * Tung Yuen Lok 1155143226
 * Lai Cheuk Lam 1155159309
 * Wong Wai Chun 1155159536
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShowUser, CreateUser, UpdateUser, DeleteUser } from './AdminUserAction/index.js';
import { ShowLocation, CreateLocation, UpdateLocation, DeleteLocation } from './AdminLocationAction/index.js';
import { ShowEvent, CreateEvent, UpdateEvent, DeleteEvent } from './AdminEventAction/index.js';


const AdminAction = () => {

    const { action } = useParams();

    const navigate = useNavigate();

    const [element, setElement] = useState("");

    const actions = {
        "showuser": <ShowUser />,
        "createuser": <CreateUser />,
        "updateuser": <UpdateUser />,
        "deleteuser": <DeleteUser />,
        "showlocation": <ShowLocation />,
        "createlocation": <CreateLocation />,
        "updatelocation": <UpdateLocation />,
        "deletelocation": <DeleteLocation />,
        "createevent": <CreateEvent />,
        "showevent": <ShowEvent />,
        "updateevent": <UpdateEvent />,
        "deleteevent": <DeleteEvent />,
    }

    useEffect(() => {
        if (!action)
            return;
        if (action in actions)
            setElement(action);
        else
            navigate('/admin');
    }, [action]);

    return (
        <div className="py-4">
            {actions[element]}
        </div>
    );
}

export default AdminAction;
