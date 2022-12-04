import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';


const UserHomepage = () => {

  const navigate = useNavigate();  

  useEffect(() => {
    console.log(window.sessionStorage.getItem("user"));
    getEvent();
  }, []);

  const eventxml2json = (xml) => {
    let event = xml.getElementsByTagName("event");
    let dataList = [];
    for (let e of event) {
      let obj = {}
      obj.event_id = e.getAttribute("id");
      obj.title = e.getElementsByTagName("titlee")[0].childNodes[0].nodeValue;
      if (e.getElementsByTagName("desce")[0].childNodes[0])
        obj.description = e.getElementsByTagName("desce")[0].childNodes[0].nodeValue;

      // add more

      dataList.push(obj);
    }
    return dataList;
  }

  const getEvent = async () => {

    let timestamp;

    // set yesterday date
    const url = "https%3A%2F%2Fwww.lcsd.gov.hk%2Fdatagovhk%2Fevent%2Fevents.xml";
    let date = new Date();
    date.setDate(date.getDate()-1);
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();
    date = yyyy + mm + dd;

    // gets latest data timestamp
    await fetch(`https://api.data.gov.hk/v1/historical-archive/list-file-versions?url=${url}&start=${date}&end=${date}`)
    .then((res) => res.json())
    .then((data) => {
      timestamp = data.timestamps[0];
    });

    // gets data 
    await fetch(`https://api.data.gov.hk/v1/historical-archive/get-file?url=${url}&time=${timestamp}`)
    .then((res) => res.text())
    .then((data) => {
      data = data.substr(data.indexOf("\n") + 1);
      let parser = new DOMParser();
      let xml = parser.parseFromString(data, "application/xml");

      let obj = eventxml2json(xml);   // here is the list of objects after fetch
      console.log("Event List:", obj);

      // handle obj here

    })
    .catch((err) => console.log("error: ", err));
  }

  const getAllLocation = async () => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/location`, {
      method: "GET",
      headers: new Headers({
          "Content-Type": 'application/json',
      })
  })
      .then((res) => res.json())
      .then((obj) => {
        
        let { message } = obj;
        console.log(message);
        
      });
  }

  // test
  const locationxml2json = (xml) => {
    let locations = xml.getElementsByTagName("venue");
    let dataList = [];
    for (let loc of locations) {
      if (loc.getElementsByTagName("longitude")[0].childNodes[0])
        dataList.push({
          locationId: loc.getAttribute("id"),
          name: loc.getElementsByTagName("venuee")[0].childNodes[0].nodeValue,
          position: {
            longitude: loc.getElementsByTagName("longitude")[0].childNodes[0].nodeValue,
            latitude: loc.getElementsByTagName("latitude")[0].childNodes[0].nodeValue
          }
        });
    }
    return dataList;
  }

  const location_obj = [];

  const getListOfOnlineLocations = async () => {

    let timestamp;

    // set yesterday date
    const url = "https%3A%2F%2Fwww.lcsd.gov.hk%2Fdatagovhk%2Fevent%2Fvenues.xml";
    let date = new Date();
    date.setDate(date.getDate()-1);
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();
    date = yyyy + mm + dd;

    // gets latest data timestamp
    await fetch(`https://api.data.gov.hk/v1/historical-archive/list-file-versions?url=${url}&start=${date}&end=${date}`)
    .then((res) => res.json())
    .then((data) => {
      timestamp = data.timestamps[0];
    });

    // gets data 
    await fetch(`https://api.data.gov.hk/v1/historical-archive/get-file?url=${url}&time=${timestamp}`)
    .then((res) => res.text())
    .then((data) => {
      data = data.substr(data.indexOf("\n") + 1);
      let parser = new DOMParser();
      let xml = parser.parseFromString(data, "application/xml");

      let obj = locationxml2json(xml);   // here is the list of objects after fetch
      console.log("Location List:", obj);

      location_obj = obj;
    })
    .catch((err) => console.log("error: ", err));
  }

  // processing map part

  mapboxgl.accessToken = 

  const showMap = (location_obj) => {
    
  }

  const logout = () => {
    window.sessionStorage.removeItem("user");
    navigate("/");
  }

  return (
    <div className="container-fluid">

      {/* please work on frontend design */}

      <div className="row">
        <div className="col-10 col-sm-8 col-lg-9 col-xl-10">
          <h2>This is user's home page</h2>
          <button className="btn btn-success mx-1" onClick={() => {getListOfOnlineLocations()}}>Get locations</button>
        </div>

        <div className="col-2 col-sm-4 col-lg-3 col-xl-2">
          <p>User: {window.sessionStorage.getItem("user")}</p>
          <button className="btn btn-success" onClick={() => {logout()}}>Log out</button>
        </div>
      </div>

      <div>
        This is for testing.
      </div>
    </div>
  );
}

export default UserHomepage;