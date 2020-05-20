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

  // handleMarker = (event) => {
  //   setMarkers(curr => [...curr,
  //   {
  //     lat: event.latLng.lat(),
  //     lng: event.latLng.lng()
  //   }
  //   ])
  //   console.log('boa')
  // }


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
  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Maps";


  return (
    <Div>
      <Div2>


        <input type="text"
          placeholder="Nome"
        // value={"newRP"}
        // onChange={this.handleInputChange}
        />
        <input type="text"
          placeholder="Peso"
        // value={"newRP"}
        // onChange={this.handleInputChange}
        />

      </Div2>
      <div>

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8} center={center}
          options={options}
          onClick={(event) => {
            setMarkers(curr => [...curr,
            {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
              time: new Date()
            }
            ])
            console.log("boa", markers)
          }}
        />
      </div>
    </Div>

  )
}

export default Index;