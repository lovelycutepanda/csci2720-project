/*
 * Group members:
 * Tam King Man 1155160072
 * Ku Nok Tik 1155143829
 * Tung Yuen Lok 1155143226
 * Lai Cheuk Lam 1155159309
 * Wong Wai Chun 1155159536
 */

import { useRef, useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import './UserHomepage.css';
import API from './FetchAPI.js';
import Spinner from './Spinner.js';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN;


const UserHomepage = (props) => {

  const navigate = useNavigate();

  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(114.1315);
  const [lat, setLat] = useState(22.3725);
  const [zoom, setZoom] = useState(9.5);

  // create some markers on the map
  const [markerList, setMarkerList] = useState([])

  const [searchLocationList, setSearchLocationList] = useState([]);
  const [lastFetchTime, setLastFetchTime] = useState("");

  useEffect(() => {
    // initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: process.env.REACT_APP_MAPBOXGL_STYLE,
      center: [lng, lat],
      zoom: zoom,
      maxZoom: 13,
      minZoom: 8,
      attributionControl: false,
    });
    map.current.addControl(new mapboxgl.NavigationControl());

    // full screen mode
    map.current.addControl(new mapboxgl.FullscreenControl());

    // show user location
    // map.current.addControl(new mapboxgl.GeolocateControl({
    //   positionOptions: {
    //     enableHighAccuracy: true
    //   },
    //   trackUserLocation: true,
    //   showUserHeading: true
    // }));

    // add attribute
    map.current.addControl(new mapboxgl.AttributionControl({
      customAttribution: 'Location map'
    }));

    // add scale ruler for user reference
    // map.current.addControl(scale, "bottom-left");
    // var scale = new mapboxgl.ScaleControl({
    //   maxWidth: 200,
    //   unit: 'metric'
    // });
  }, []);

  // change map position
  useEffect(() => {
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, [lng, lat, zoom]);

  //
  // useEffect(() => {
  //   map.mapboxgl-canvas {
  //     position: relative,
  //     left: 0,
  //     top: 0,
  //   };
  // })


  // change marker on map
  useEffect(() => {
    const markers = searchLocationList.map(({ locationId, name, position }) => {
      // create a HTML element for each feature
      let el = document.createElement('div');
      el.className = 'marker';

      const innerHtmlContent = `<div style="min-width: 100px;font-size: large;color : black;">
                  <h4 class="h4Class"> ${name} </h4> </div>`;

      const divElement = document.createElement('div');
      const assignBtn = document.createElement('div');
      assignBtn.innerHTML = `<button class="btn btn-success btn-simple text-white" > visit </button>`;
      divElement.innerHTML = innerHtmlContent;
      divElement.appendChild(assignBtn);
      assignBtn.addEventListener('click', (e) => {
        navigate('/user/location/' + locationId);
      });

      // make a marker for each feature and add to the map
      let oneMarker = new mapboxgl.Marker(el)
        .setLngLat([position.longitude, position.latitude])
        .setPopup(
          new mapboxgl.Popup({
            closeOnClick: true,
            offset: 10,
            Anchor: false
          }) // add popups
            .setDOMContent(divElement)
        )
        .addTo(map.current)

      return oneMarker;
    });
    markerList.forEach((marker) => marker.remove());
    setMarkerList(markers);
  }, [searchLocationList]);


  //////////////////////////////////////////////////////////////////////////////

  const [locationList, setLocationList] = useState([]);
  const [favourite, setFavourite] = useState([]);

  const [loading, setLoading] = useState(false);


  useEffect(() => {

    // retrieve locationList and favourite
    if ("locationList" in window.sessionStorage) {
      const locList = JSON.parse(window.sessionStorage.getItem("locationList"))
      setLocationList(locList);
      setLastFetchTime(window.sessionStorage.getItem("lastFetchTime"));
    }
    else {
      setLoading(true);
      API.loadLocation()
        .then(({ locList, fetchTime }) => {
          setLocationList(locList);
          setLastFetchTime(fetchTime);
          setLoading(false);
          window.sessionStorage.setItem("locationList", JSON.stringify(locList));
          window.sessionStorage.setItem("lastFetchTime", fetchTime);
        });
    }

    API.loadUser(window.sessionStorage.getItem("user"))
      .then((user) => {
        const favouriteList = user.favourite.map((loc) => loc.locationId);
        setFavourite(favouriteList);
      })

  }, []);

  const logout = () => {
    window.sessionStorage.clear();
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
            <button className="btn btn-primary" onClick={() => { logout() }} id="logOut">Sign Out <i className="fa-solid fa-right-from-bracket fa-xl"></i></button>
          </div>
        </div>
        <hr />

        {/* This is for map container */}
        <div id="map">
          <div ref={mapContainer} className="map-container">
            <div className="sidebar">
              Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
          </div>
        </div>

        <Outlet context={[favourite, setFavourite, locationList, searchLocationList, setSearchLocationList, map]} />
        <footer className="pb-1">
          <p className="m-2">Last updated time: {lastFetchTime}</p>
        </footer>
      </div>
    </>

  );
}

export default UserHomepage;