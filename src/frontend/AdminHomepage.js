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
      
      <div id="contentarea" className="row" style={{marginLeft: `${menu? "20%" : "0%"}`}}>
        <div className="col-10 col-sm-8 col-lg-9 col-xl-10">
          <h2>Welcome to Admin's page.</h2>
          <button className="btn" onClick={() => {setMenu(!menu)}}>&#9776; Admin User Action</button>
          <Outlet />
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