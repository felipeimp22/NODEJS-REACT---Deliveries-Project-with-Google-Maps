

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
import { Div, Form, Div2, Div3 } from './style'
import mapStyles from "../../Styles/mapsStyles"
import pontMarker from '../../Styles/icons/interface.svg'
import { formatRelative } from 'date-fns';

import * as LCT from "./static data/data.json"



const libraries = ["places"]
const mapContainerStyle = {
  // width: "100vw",
  // height: "100vh",
  borderRadius: "10px",
  boxShadow: " 0px 0px 2px 2px rgba(0, 0, 0, 0.4)",


  width: "60vw",
  height: "60vh",

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
        console.log(address)

        setValue(address, false)
        clearSuggestions()
        try {
          const results = await getGeocode({ address })
          const { lat, lng } = await getLatLng(results[0])
          const infos = results[0].address_components
          panTo({ lat, lng, infos })
          if (arrInfos.length <= 0) {
            arrInfos.push(lat, lng, infos)
          } else {
            arrInfos.splice(0)
            arrInfos.push(lat, lng, infos)
          }
          if (arrAddress.length <= 0) {
            arrAddress.push(address)
          } else {
            arrAddress.splice(0)
            arrAddress.push(address)
          }

          // console.log("-------->2", lat, lng, infos)





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

let arrInfos = []
let nameInfo = ''
let pesoInfo = ''
let arrAddress = []


function Index() {



  const [locale, setLocale] = useState()
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null)
  const [geometry, setGeometry] = useState()





  const attGeo = React.useCallback(() => {




  }, [])





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




  const handleRegister = React.useCallback(() => {
    let setedAdress = arrAddress[0].split(',')
    let setedAdress2 = setedAdress[setedAdress.length - 2].split('-')



    try {


      api.post('/createDeliveries', {
        "name": nameInfo,
        "peso": pesoInfo,
        "geolocalizacao": [
          arrInfos[0],

          arrInfos[1]

        ],
        "endereço": [{
          "logradouro": arrAddress[0],
          // "numero": arrInfos[2][0].types === "street_number" ? arrInfos[2[0]].types[0] : "não possue",
          "bairro": setedAdress[0],
          "complemento": arrAddress[0],
          "cidade": setedAdress2.length === 2 ? setedAdress2[0] : setedAdress[0],
          "estado": setedAdress2[setedAdress2.length - 1],
          "pais": setedAdress[setedAdress.length - 1],

        }]

      })
    } catch (error) {
      console.log('ERROR: ', error)
    }


    setGeometry(arrInfos[0], arrInfos[1])

    console.log('wwwwwwww', geometry)

    console.log(setedAdress, setedAdress2)
    console.log('tttttttttttttt', arrInfos[2][0].types)
    console.log("00000000000000", arrInfos)
    console.log(nameInfo, pesoInfo)

    // console.log(lat, lng)
  }, [])

  const textListenerName = React.useCallback((e) => {
    nameInfo = e.target.value

  }, [])
  const textListenerPeso = React.useCallback((e) => {
    pesoInfo = e.target.value

  }, [])

  useEffect(() => {

    //REQ with PromiseAll

    const fetchData = async (Loading = true) => {

      const result = await api.get(
        "/index"
      )
      await Promise.all([result]).then((values) => {
        setLocale(values[0].data)
        console.log(values[0].data);
      });
      // Loading = false


    };
    fetchData();
    attGeo()



  }, [geometry])
  console.log("111", locale)

  //API_KEY SET Google API_KEY HERE
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCiCXf5Z23Iz7TDHjE5Kn9MtYGETyS4DdU",
    libraries,
  })


  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, [])



  const panTo = React.useCallback(({ lat, lng, infos }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(12);

  }, [])

  /**
   * Verificantions
   */
  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Maps";
  if (locale == undefined) return !isLoaded


  return (
    <Div>
      <Div2>
        <div className="search">
          <Search panTo={panTo} />
        </div>

        <input onChange={textListenerName} type="text"
          placeholder="Nome"
        />
        <input onChange={textListenerPeso} type="text"
          placeholder="Peso"
        />
        <div className="geometry">
          <input placeholder="latitude" value={geometry} disabled={true} ></input>
          <input placeholder="altitude" value={arrInfos[1]} disabled={true} ></input>

        </div>
        <button className="sign" onClick={handleRegister}>Cadastrar Cliente</button>
        <button className="cancel" onClick={() => { console.log('resetar cadastro') }}>Resetar Cadastro</button>


      </Div2>
      <div className="map">

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8} center={center}
          options={options}
          onClick={handleMarker}
          onLoad={onMapLoad}
        >
          {/* PUT Locale */}
          {locale.data.map((place) => (
            <Marker key={place.name}
              icon={{
                url: pontMarker,
                scaledSize: new window.google.maps.Size(40, 40),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15)
              }}
              position={{
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
                <h4>Peso: {selectedPoint.peso}KG</h4>


              </div>

            </InfoWindow>
          )}


          {markers.map(marker => <Marker key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: pontMarker,
              scaledSize: new window.google.maps.Size(20, 20),
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
                <h2>Point Marked</h2>
                <p>Spoted {formatRelative(selected.time, new Date())}</p>
              </div>
            </InfoWindow>) : null}


        </GoogleMap>
        <Div3>
          <div className='titleTable'><h3>Nome</h3>
            <h3>Cidade</h3><h3>país</h3><h3>peso</h3>
            <h3>LAT</h3><h3>LNG</h3></div>
          <div className="container">
            <div >
              {locale.data.map((e, i) => (
                <div className='contentTable'><h4>{e.name}</h4> <h4>{e.endereço[0].cidade}</h4> <h4>{e.endereço[0].pais}</h4> <h4>{e.peso}</h4>
                  <h4>{e.geolocalizacao[0]}</h4> <h4>{e.geolocalizacao[1]}</h4> </div>

              ))}
            </div>
          </div>

        </Div3>
      </div>
    </Div >

  )
}

export default Index;