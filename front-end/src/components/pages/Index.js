import React, { Component, useState, useEffect } from 'react';
import axios from 'axios'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete"

import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuPopover,
  MenuLink,
} from "@reach/menu-button";
// import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

import Axios from 'axios';

import api from '../../services/api'

import { Div, Form, Div2 } from './style'

import mapStyles from "../../Styles/mapsStyles"

import pontMarker from '../../Styles/icons/interface.svg'





const libraries = ["places"]
const mapContainerStyle = {
  // width: "100vw",
  // height: "100vh",
  borderRadius: "10px",
  boxShadow: " 0px 0px 2px 2px rgba(0, 0, 0, 0.5)",


  width: "60vw",
  height: "80vh",

}

const center = {
  lat: -23.550520,
  lng: -46.633308
}
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}




function Index() {
  const [markers, setMarkers] = useState([])


  // handleMarker = (curr) => {
  //   setMarkers([...curr, {
  //     lat: event.latLng.lat(),
  //     lng: event.latLng.lng()

  //   }])
  // }

  const handleMarker = React.useCallback((event) => {
    setMarkers(curr => [...curr,
    {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date()
    }
    ])
    console.log("boa", markers)
  }, [])


  // 
  useEffect(() => {

    //REQ with PromiseAll

    // const fetchData = () => {
    //   const result = api.get(
    //     "/"
    //   )
    //   Promise.all([result]).then((values) => {
    //     setProjects([values[0].data])
    //     console.log(values[0].data);
    //   });
    // };
    // fetchData();

  }, [])


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "",
    libraries,
  })
  /**
   * Verificantions
   */

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, [])


  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Maps";


  return (
    <Div>
      <Div2>


        <input type="text"
          placeholder="Nome"
        />
        <input type="text"
          placeholder="Peso"
        />

      </Div2>
      <div>

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8} center={center}
          options={options}
          onClick={handleMarker}
          onLoad={onMapLoad}
        >
          {markers.map(marker => <Marker key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: pontMarker,
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15)
            }}
          />)}

        </GoogleMap>
      </div>
    </Div>

  )
}

export default Index;