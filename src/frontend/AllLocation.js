import { useRef, useState, useEffect } from 'react';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import updownIcon from '../photos/updown_logo.png';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN;


const AllLocation = () => {

  const navigate = useNavigate(); 

  // states
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(114.1315);
  const [lat, setLat] = useState(22.3725);
  const [zoom, setZoom] = useState(9.39);

  const [showOrder, setShowOrder] = useState(1);

  const locationList = useOutletContext();
  const [searchLocationList, setSearchLocationList] = useState([]);

  useEffect(() => {
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

  useEffect(() => {
    setSearchLocationList(locationList);
  }, [locationList]);

  // create some markers on the map
  let currentMarkers = []
  // change marker on map
  useEffect(() => {

    searchLocationList.forEach(({locationId, name, position}) => {
      // create a HTML element for each feature
      let el = document.createElement('div');
      el.className = 'marker';

      // make a marker for each feature and add to the map
      let oneMarker = new mapboxgl.Marker(el)
      .setLngLat([position.longitude, position.latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 10 }) // add popups
          .setHTML(
            `<h3>Location ID: ${locationId}</h3>
             <h5>${name}</h5>`
          )
      )
      .addTo(map.current);
      
      currentMarkers.push(oneMarker)
    })
  }, [searchLocationList]);

  const visitLocation = (locationId) => {
    navigate(`/user/location/${locationId}`);
  }

  // Search for locations which contain keywords in the name
  const keywordSearch = (list, keyWord) => {
    let reg = new RegExp(keyWord);
    return list.filter((obj) => reg.test(obj.name));
  }

  const showSearching = (e) => {
  
    // prevent reload, need to delete after update html element
    e.preventDefault();

    let keyword = document.getElementById('SearchingKeyword').value;
    let searchingResult = keywordSearch(locationList, keyword);

    // remove markers 
    currentMarkers.forEach((marker) => marker.remove());

    // show result
    setSearchLocationList(searchingResult);
  }


  return (
    <div>
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
        <table>
          <thead>
            <tr>
              <th>Location ID</th>
              <th>Location name</th>
              <th>Event number<img id="updownIcon" src={updownIcon} onClick={() => setShowOrder(-showOrder)} /></th>
            </tr>
          </thead>
          <tbody>
            {searchLocationList
            .sort((a, b) => showOrder * (a.eventList.length - b.eventList.length))
            .map(({locationId, name, eventList}, index) => {
              return (
                <tr key={index}>
                  <td>{locationId}</td>
                  <td>{name}</td>
                  <td>{eventList.length}</td>
                  <td><button onClick={() => {visitLocation(locationId)}}>GO</button></td>
                </tr>)
            })}
          </tbody>
        </table>
      </div>

  </div>
    
  );
}

export default AllLocation;