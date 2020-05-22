

import React, { Component, useState, useEffect } from 'react';
import axios from 'axios'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete"
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
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
import { formatRelative } from 'date-fns';

import * as LCT from "./data/data.json"



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


function Search({ panTo }) {
  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => -23.550520,
        lng: () => -46.633308
      },
      radius: 500 * 100
    }
  })
  return (
    <div className="search">
      <Combobox onSelect={async (address) => {
        //HERE
        setValue(address, false)
        clearSuggestions()
        try {
          const results = await getGeocode({ address })
          const { lat, lng } = await getLatLng(results[0])
          console.log("-------->", lat, lng)
          panTo({ lat, lng })

        } catch (error) {
          console.log('ERROR: ', error)
        }
        // console.log(adress, data)
      }}>
        <ComboboxInput value={value} onChange={(e) => { setValue(e.target.value) }}
          disabled={!ready} placeholder="Digite o endereço"
        />
        <ComboboxPopover>
          {status === "OK" && data.map(({ id, description, geometry }) => (< ComboboxOption key={id} value={description + geometry} />))}
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}



function Index() {
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null)


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


  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(12);


  }, [])


  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Maps";


  return (
    <Div>
      <Div2>

        <Search panTo={panTo} />

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
          {/* PUT Locale */}
          {LCT.data.map((place) => (
            <Marker key={place.name} position={{
              lat: place.geolocalizacao[0], lng: place.geolocalizacao[1]
            }}
              onClick={() => {
                setSelectedPoint(place)
              }}
            />
          ))}

          {selectedPoint && (
            <InfoWindow position={{
              lat: selectedPoint.geolocalizacao[0], lng: selectedPoint.geolocalizacao[1]
            }}
              onCloseClick={() => {
                setSelectedPoint(null)
              }}
            >
              <div>
                <h2>{selectedPoint.name}</h2>
                <h4>Peso:   {selectedPoint.peso}KG</h4>
              </div>

            </InfoWindow>
          )}


          {markers.map(marker => <Marker key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: pontMarker,
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15)
            }}
            onClick={() => {
              setSelected(marker)
            }}
          />)}
          {selected ? (
            <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => { setSelected(null) }}>
              <div>
                <h2>Point Spoted</h2>
                <p>Spoted {formatRelative(selected.time, new Date())}</p>
              </div>
            </InfoWindow>) : null}


        </GoogleMap>
      </div>
    </Div >

  )
}

export default Index;