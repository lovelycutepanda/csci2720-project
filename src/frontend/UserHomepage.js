import { useEffect, useState} from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import './UserHomepage.css';
import loadLocation from './FetchAPI.js';
import Spinner from './Spinner.js';


const UserHomepage = () => {

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
    window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("locationList");
    navigate("/");
  }

  return (
    <>
      <Spinner display={loading} />
      <div id="user" className="container-fluid">

        <div className="row">
          <div className="col-10 col-sm-8 col-lg-9 col-xl-10">
            <h2>This is user's home page</h2>
          </div>

          <div className="col-2 col-sm-4 col-lg-3 col-xl-2">
            <p>User: {window.sessionStorage.getItem("user")}</p>
            <button className="btn btn-success" onClick={() => {logout()}}>Log out</button>
          </div>
        </div>

      <Outlet context={locationList}/>

    </div>

  </>
    
  );
}

export default UserHomepage;