import { useEffect, useState} from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import './UserHomepage.css';
import loadLocation from './FetchAPI.js';
import Spinner from './Spinner.js';
import 'https://kit.fontawesome.com/d97b87339f.js';



const UserHomepage = (props) => {

  const navigate = useNavigate(); 

  const [locationList, setLocationList] = useState([]);
  const [searchLocationList, setSearchLocationList] = useState([]);

  const [loading, setLoading] = useState(false);
  
  
  useEffect(() => {

    //if (!window.sessionStorage.getItem("user"))
    //  history_redirect.push("/");

    // retrieve locationList
    if ("locationList" in window.sessionStorage) {
      const locList = JSON.parse(window.sessionStorage.getItem("locationList"))
      setLocationList(locList);
      setSearchLocationList(locList);
    }
    else {
      setLoading(true);
      loadLocation()
      .then((locList) => {
        console.log(locList);
        setLocationList(locList);
        setSearchLocationList(locList);
        setLoading(false);
        window.sessionStorage.setItem("locationList", JSON.stringify(locList));
      });
    }
    
  }, []);


  const logout = () => {
    window.sessionStorage.removeItem("locationList");
    props.switchAccount("");
  }
    
  return (
    <>
      <Spinner display={loading} />
      <div id="user" className="container-fluid">
        <div className="row">
          <div className="col-6">
            <h2>Hello, <span>{window.sessionStorage.getItem("user")}</span></h2>
            <h6>Choose your favourite locations</h6>
          </div>
          <div className="col-6 text-end">
            <i className="fa-regular fa-circle-user fa-2xl"></i>
            <span className='username'>&nbsp;{window.sessionStorage.getItem("user")}</span>
            <button className="btn btn-primary" onClick={() => {logout()}} id="logOut">Sign Out <i className="fa-solid fa-right-from-bracket fa-xl"></i></button>
          </div>
        </div>

      <Outlet context={locationList}/>

    </div>

  </>
    
  );
}

export default UserHomepage;