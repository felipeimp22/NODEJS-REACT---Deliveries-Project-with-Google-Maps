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


import api from '../../services/api'
import Axios from 'axios';

// import "@reach/menu-button/styles.css";


// import { Container } from './styles';

//   function Map() {
//     return (
//       <GoogleMap
//         defaultZoom={10}
//         defaultCenter={{ lat: -23.550520, lng: -46.633308 }}
//       />
//     )
//   }
// const WrappedMap = withScriptjs(withGoogleMap(Map))


// return <>
//     <h1>teste</h1>
//     {/* <div><WrappedMap googleMapURL={``} /></div> */}
//   </>;



const libraries = ["places"]
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
}

const center = {
  lat: -23.550520,
  lng: -46.633308
}

const apiKey = []

function Index() {
  const [projects, setProjects] = useState([])
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
    googleMapsApiKey: "AIzaSyAJwTL_WQK7sIhlccPw7XhSLL_uoqlu_ic",
    libraries,
  })
  /**
   * Verificantions
   */
  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Maps";


  return <>
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center} />
  </>;
}

export default Index;