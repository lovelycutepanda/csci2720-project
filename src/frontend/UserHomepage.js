import { useRef, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './UserHomepage.css';
import loadLocation from './FetchAPI.js';
import Spinner from './Spinner.js';
import { render } from '@testing-library/react';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN;

const UserHomepage = () => {

  const navigate = useNavigate(); 

  // states
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(114.1315);
  const [lat, setLat] = useState(22.3725);
  const [zoom, setZoom] = useState(9.39);

  const [locationList, setLocationList] = useState([]);
  const [searchLocationList, setSearchLocationList] = useState([]);
  const [loading, setLoading] = useState(true);


  // basic map setting
  useEffect(() => {

    // retrieve event 
    console.log(window.sessionStorage.getItem("user"));

    loadLocation()
    .then((locList) => {
      console.log(locList);
      setLocationList(locList);
      setSearchLocationList(locList);
      setLoading(false);
    });
    
    // initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: process.env.REACT_APP_MAPBOXGL_STYLE,
      center: [lng, lat],
      zoom: zoom
    });  
    
  }, []);

  // change map position
  useEffect(() => {
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, [lng, lat, zoom]);

  // create some markers on the map
  var currentMarkers = []
  // change marker on map
  useEffect(() => {

    searchLocationList.forEach(({locationId, name, position}) => {
      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'marker';

      // make a marker for each feature and add to the map
      var oneMarker = new mapboxgl.Marker(el)
      .setLngLat([position.longitude, position.latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 10 }) // add popups
          .setHTML(
            `<h3>Location ID: ${locationId}</h3><h5>${name}</h5>`
          )
      )
      .addTo(map.current);
      
      currentMarkers.push(oneMarker)
    })
  }, [searchLocationList]);

  //////////////////////////////////////////////////////////////////////////////////////////
  // Search for locations which contain keywords in the name

  const keywordSearch = (list, keyWord) => {
    var reg = new RegExp(keyWord);
    return list.filter((obj) => reg.test(obj.name));
  }

  const showSearching = (e) => {
    
    // prevent reload, need to delete after update html element
    e.preventDefault();

    var keyword = document.getElementById('SearchingKeyword').value;

    var searchingResult = keywordSearch(locationList, keyword);

    // remove markers 
    currentMarkers.forEach((marker) => marker.remove());

    // show result
    setSearchLocationList(searchingResult);
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  var showLocationTable = () => {

    var str = searchLocationList.map(({locationId, name, position}, index) => {
      return <p key={index}> {locationId}, {name}, {position.longitude}, {position.latitude}</p>
    })
    return(
      <div>
        {str}
      </div>
    )
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  // logout

  const logout = () => {
    window.sessionStorage.removeItem("user");
    navigate("/");
  }

  return (
    <>
      <Spinner display={loading}/>
      <div id="user" className="container-fluid">

        {/* please work on frontend design */}

        <div className="row">
          <div className="col-10 col-sm-8 col-lg-9 col-xl-10">
            <h2>This is user's home page</h2>

          </div>

          <div className="col-2 col-sm-4 col-lg-3 col-xl-2">
            <p>User: {window.sessionStorage.getItem("user")}</p>
            <button className="btn btn-success" onClick={() => {logout()}}>Log out</button>
          </div>
        </div>

        <div id="map">
          <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
          <div ref={mapContainer} className="map-container" />
        </div>

        <div>
          <label> Search location </label>
          <input type="text" id="SearchingKeyword" onChange={(e) => showSearching(e)}></input>
        </div>

        <div>
          <span>{showLocationTable()}</span>
        </div>

      </div>
    </>
    
  );
}

export default UserHomepage;