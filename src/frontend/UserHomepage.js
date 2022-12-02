import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const UserHomepage = () => {

  const navigate = useNavigate();  

  useEffect(() => {
    console.log(window.sessionStorage.getItem("user"));
    getEvent();
  }, []);

  const xml2json = (xml) => {
    let event = xml.getElementsByTagName("event");
    let dataList = [];
    for (let e of event) {
      let obj = {}
      obj.event_id = e.getAttribute("id");
      obj.title = e.getElementsByTagName("titlee")[0].childNodes[0].nodeValue;
      obj.description = (e.getElementsByTagName("desce")[0].childNodes[0])? e.getElementsByTagName("desce")[0].childNodes[0].nodeValue : "";

      // add more

      dataList.push(obj);
    }
    return dataList;
  }

  const getEvent = async () => {

    fetch("https://s3-ap-southeast-1.amazonaws.com/historical-resource-archive/2022/11/17/https%253A%252F%252Fwww.lcsd.gov.hk%252Fdatagovhk%252Fevent%252Fevents.xml/1347")
    .then((res) => res.text())
    .then((data) => {
      //console.log(data);
      data = data.substr(data.indexOf("\n") + 1);
      let parser = new DOMParser();
      let xml = parser.parseFromString(data, "application/xml");

      let obj = xml2json(xml);   // here is the list of objects after fetch
      console.log(obj);

      // handle obj here

    })
    .catch((err) => console.log("error: " + err));
    
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
          <button className="btn btn-success mx-1" onClick={() => {getAllLocation()}}>Get locations</button>
        </div>

        <div className="col-2 col-sm-4 col-lg-3 col-xl-2">
          <p>User: {window.sessionStorage.getItem("user")}</p>
          <button className="btn btn-success" onClick={() => {logout()}}>Log out</button>
        </div>
      </div>
    </div>
  );
}

export default UserHomepage;