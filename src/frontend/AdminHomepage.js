/*
 * Group members:
 * Tam King Man 1155160072
 * Ku Nok Tik 1155143829
 * Tung Yuen Lok 1155143226
 * Lai Cheuk Lam 1155159309
 * Wong Wai Chun 1155159536
 */

import { React, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import './AdminHomepage.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdminHomepage = (props) => {

  const navigate = useNavigate();

  // states
  const [menu, setMenu] = useState(false);

  const logout = () => {
    window.sessionStorage.clear();
    props.switchAccount("");
  }

  const setAction = (action) => {
    navigate(`/admin/action/${action}`);
  }

  return (
    <div id="admin" className="container-fluid">

      <div id="sidebar" className="side-bar" style={{width: `${menu? "20%" : "0%"}`}}>
        <h2>Action Menu</h2>
        <button className="btn" onClick={() => {setAction("createuser")}}>Create user <i className="fa-solid fa-user-plus"></i></button>
        <button className="btn" onClick={() => {setAction("showuser")}}>Show users <i className="fa-regular fa-user"></i></button>
        <button className="btn" onClick={() => {setAction("updateuser")}}>Update user <i className="fa-solid fa-pencil"></i></button>
        <button className="btn" onClick={() => {setAction("deleteuser")}}>Delete user <i className="fa-solid fa-user-minus"></i></button>
        <button className="btn" onClick={() => {setAction("createlocation")}}>Create location <i className="fa-solid fa-location-dot"></i></button>
        <button className="btn" onClick={() => {setAction("showlocation")}}>Show locations <i className="fa-solid fa-location-crosshairs"></i></button>
        <button className="btn" onClick={() => {setAction("updatelocation")}}>Update location <i className="fa-solid fa-pen-nib"></i></button>        
        <button className="btn" onClick={() => {setAction("deletelocation")}}>Delete location <i className="fa-solid fa-trash-can"></i></button>
        <button className="btn" onClick={() => {setAction("createevent")}}>Create Event<i className="fa fa-calendar-plus-o" aria-hidden="true"></i></button>
        <button className="btn" onClick={() => {setAction("showevent")}}>Show Events<i className="fa fa-calendar-o"></i></button>
        <button className="btn" onClick={() => {setAction("updateevent")}}>Update Event<i className="fa fa-pencil-square-o"></i></button>
        <button className="btn" onClick={() => {setAction("deleteevent")}}>Delete Event<i className="fa fa-calendar-times-o"></i></button>
      </div>
      
      <div id="contentarea" style={{marginLeft: `${menu? "20%" : "0%"}`}}>
        <div className="d-flex justify-content-between">
          <div>
            <h2>Welcome to Admin's page.</h2>
            <button className="btn" onClick={() => {setMenu(!menu)}}>&#9776; Admin User Action</button>
          </div>

          <div className="ml-auto right">
            <div className="identity">
              <i className="fa-regular fa-circle-user fa-3x"></i>
              <span className='username'>{window.sessionStorage.getItem("user")}</span>
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn" onClick={() => {logout()}} id="logOut">Log Out<i className="fa-solid fa-right-from-bracket fa-xl"></i></button>
            </div>
            
          </div>
        </div>

        <Outlet />

      </div>

      

      <ToastContainer position="bottom-right" autoClose={3000} pauseOnFocusLoss={false} />
    </div>
  );
}

export default AdminHomepage;