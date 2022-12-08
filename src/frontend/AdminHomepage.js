import { React, useState } from 'react';
import { ShowUser, CreateUser, UpdateUser, DeleteUser } from './AdminUserAction/index.js';
import { ShowLocation, CreateLocation, UpdateLocation, DeleteLocation } from './AdminLocationAction/index.js';
import './AdminHomepage.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'https://kit.fontawesome.com/7663343623.js';


const AdminHomepage = (props) => {

  // states
  const [action, setAction] = useState("");
  const [menu, setMenu] = useState(false);

  const logout = () => {
    window.sessionStorage.clear();
    props.switchAccount("");
  }

  const actionSwitch = () => {
    return <div className="py-4">
      {action === "showUser" && <ShowUser />}
      {action === "createUser" && <CreateUser />}
      {action === "updateUser" && <UpdateUser />}
      {action === "deleteUser" && <DeleteUser />}
      {action === "showLocation" && <ShowLocation />}
      {action === "createLocation" && <CreateLocation />}
      {action === "updateLocation" && <UpdateLocation />}
      {action === "deleteLocation" && <DeleteLocation />}
    </div>;
  }

  return (
    <div id="admin" className="container-fluid">

      {/* please work on frontend design */}
      <div id="sidebar" className="side-bar" style={{width: `${menu? "20%" : "0%"}`}}>
      <h2>Action Menu</h2>
      <button className="btn" onClick={() => {setAction("createUser")}}>Create user <i className="fa-solid fa-user-plus"></i></button>
      <button className="btn" onClick={() => {setAction("showUser")}}>Show users <i className="fa-regular fa-user"></i></button>
      <button className="btn" onClick={() => {setAction("updateUser")}}>Update user <i className="fa-solid fa-pencil"></i></button>
      <button className="btn" onClick={() => {setAction("deleteUser")}}>Delete user <i className="fa-solid fa-user-minus"></i></button>
      <button className="btn" onClick={() => {setAction("createLocation")}}>Create location <i class="fa-solid fa-location-dot"></i></button>
      <button className="btn" onClick={() => {setAction("showLocation")}}>Show locations <i className="fa-solid fa-location-crosshairs"></i></button>
      <button className="btn" onClick={() => {setAction("updateLocation")}}>Update location <i class="fa-solid fa-pen-nib"></i></button>        
      <button className="btn" onClick={() => {setAction("deleteLocation")}}>Delete location <i class="fa-solid fa-trash-can"></i></button>
      </div>
      
      <div id="contentarea" className="row" style={{marginLeft: `${menu? "20%" : "0%"}`}}>
        <div className="col-10 col-sm-8 col-lg-9 col-xl-10">
          <h2 className='testing'>This is admin's home page</h2>
          <button className="btn" onClick={() => {setMenu(!menu)}}>&#9776; Admin User Action</button>
          {actionSwitch()}
        </div>

        <div className="col-2 col-sm-4 col-lg-3 col-xl-2">
          <i className="fa-regular fa-circle-user fa-3x"></i>
          <span className='username'>&nbsp;{window.sessionStorage.getItem("user")}</span>
          <button className="btn" onClick={() => {logout()}} id="logOut">Log Out<i className="fa-solid fa-right-from-bracket fa-xl"></i></button>
        </div>

      </div>

      <ToastContainer position="bottom-right" autoClose={3000} pauseOnFocusLoss={false} />
    </div>
  );
}

export default AdminHomepage;