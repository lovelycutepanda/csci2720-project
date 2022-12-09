import { useRef, useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import updownIcon from '../photos/updown_logo.png';
import 'https://kit.fontawesome.com/d97b87339f.js';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN;


const AllLocation = () => {

  const navigate = useNavigate(); 

  // states
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(114.1315);
  const [lat, setLat] = useState(22.3725);
  const [zoom, setZoom] = useState(9.39);

  const [keyWord, setKeyWord] = useState("");

  const [showOrder, setShowOrder] = useState(1);

  const [favourite, setFavourite, locationList] = useOutletContext();
  const [searchLocationList, setSearchLocationList] = useState([]);

  const [baseLocationList, setBaseLocationList] = useState([]);
  const [favouriteSwitch, setFavouriteSwitch] = useState(false);
  
  // create some markers on the map
  const [markerList, setMarkerList] = useState([])

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
    setBaseLocationList(locationList);
  }, [locationList]);


  // change marker on map
  useEffect(() => {
    const markers = searchLocationList.map(({locationId, name, position}) => {
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
      
      return oneMarker;
    });
    markerList.forEach((marker) => marker.remove());
    setMarkerList(markers);
  }, [searchLocationList]);


  // Search for locations which contain keywords in the name
  useEffect(() => {
    let searchingResult = baseLocationList.filter((loc) => loc.name.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1);

    // show result
    setSearchLocationList(searchingResult);
  }, [keyWord, baseLocationList])


  const visitLocation = (locationId) => {
    navigate(`/user/location/${locationId}`);
  }

  // switch to view all locations or favourite locations only 
  const switchFavourite = () => {
    if (favouriteSwitch) {
      setBaseLocationList(locationList);
    } else {
      const newLocation = locationList.filter((loc) => favourite.indexOf(loc.locationId) !== -1)
      setBaseLocationList(newLocation);
    }
    setFavouriteSwitch(!favouriteSwitch);
  }


  return (
    <div>
      <div id="map">
        <div ref={mapContainer} className="map-container">
          <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
        </div>
      </div>

      <div className='search-box'>
        <input className='search-input' type="text" id="SearchingKeyword" 
               placeholder="Search location.." onChange={(e) => setKeyWord(e.target.value)} value={keyWord}></input>
        <button className="search-btn"><i className="fas fa-search"></i></button>
      </div>

      <button onClick={() => {switchFavourite()}}>{favouriteSwitch? "Show all locations" : "Show favourite locations"}</button>

      <table className="container-fluid">
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
              <tr key={index} onClick={() => {visitLocation(locationId)}}>
                <td>{locationId}</td>
                <td>{name}</td>
                <td>{eventList.length}</td>
              </tr>)
          })}
        </tbody>
      </table>

  </div>
    
  );
}

export default AllLocation;