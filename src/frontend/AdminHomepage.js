import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShowUser, CreateUser, UpdateUser, DeleteUser } from './AdminUserAction/Actions';


const AdminHomepage = () => {

  const navigate = useNavigate();  

  // states
  const [action, setAction] = useState("");

  // componentDidMount
  useEffect(() => {
    console.log(window.sessionStorage.getItem("user"));
  }, []);

  const logout = () => {
    window.sessionStorage.removeItem("user");
    navigate("/");
  }

  const actionSwitch = () => {
    return <div className="py-4">
      {action === "getUser" && <ShowUser />}
      {action === "createUser" && <CreateUser />}
      {action === "updateUser" && <UpdateUser />}
      {action === "deleteUser" && <DeleteUser />}
      {/*
      {action === "getLocation" && showLocation()}
      {action === "createLocation" && showCreateLocationForm()}
      {action === "updateLocation" && showUpdateLocationForm()}
      {action === "deleteLocation" && showDeleteLocationForm()}
      */}
    </div>;
  }

  return (
    <div className="container-fluid">

      {/* please work on frontend design */}
      
      <div className="row">
        <div className="col-10 col-sm-8 col-lg-9 col-xl-10">
          <h2>This is admin's home page</h2>
          <button className="btn btn-success mx-1" onClick={() => {setAction("getUser")}}>Show users</button>
          <button className="btn btn-success mx-1" onClick={() => {setAction("createUser")}}>Create user</button>
          <button className="btn btn-success mx-1" onClick={() => {setAction("updateUser")}}>Update user</button>
          <button className="btn btn-success mx-1" onClick={() => {setAction("deleteUser")}}>Delete user</button>
          {/*
          <button className="btn btn-success mx-1" onClick={() => {findAllLocation()}}>Show users</button>
          <button className="btn btn-success mx-1" onClick={() => {setAction("createLocation")}}>Create user</button>
          <button className="btn btn-success mx-1" onClick={() => {setAction("updateLocation"); setUpdateTarget("");}}>Update user</button>
          <button className="btn btn-success mx-1" onClick={() => {setAction("deleteLocation")}}>Delete user</button>
          */}
          {actionSwitch()}
        </div>

        <div className="col-2 col-sm-4 col-lg-3 col-xl-2">
          <p>User: {window.sessionStorage.getItem("user")}</p>
          <button className="btn btn-success" onClick={() => {logout()}}>Log Out</button>
        </div>

      </div>
    </div>
  );
}

export default AdminHomepage;