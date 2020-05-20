import React from 'react';


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

function Index() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "",
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