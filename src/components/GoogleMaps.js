import React, { useState, useEffect, useCallback, useRef } from 'react';
import SkiguideApi from '../SkiGuideApi';
import PlaceSearch from './PlaceSearch';
import GuideList from './GuideList';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';


import '@reach/combobox/styles.css';
import mapStyles from './mapStyles';

const libraries = ["places"]
const mapContainerStyle = {
  width: '100vw',
  height: '95vh'
};
const center = {
  lat: 37.9374939,
  lng: -107.8122852
}
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
}

export default function GoogleMaps() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });

  const [guides, setGuides] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [listView, setListView] = useState(false);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []); 

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(12);
  }, []);

  const getGuides = async () => {
    try {
      const result = await SkiguideApi.getGuides();
      setGuides(result.guides);
      setIsLoading(false);
    } catch (err) {
      setIsError(true)
    }
  }

  if (loadError) return "Error loading maps.";
  if (!isLoaded) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" />
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  if (listView) {
    return (
      <GuideList guides={guides} />
    )
  }

  return (
    <>
      <PlaceSearch panTo={panTo} />
      <Locate panTo={panTo} />
      <button className="list" onClick={() => setListView(true)}>
        <img src="lines.svg" alt="list guides" />
      </button>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={8} 
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {guides.map(guide => 
          <Marker 
            key={guide.id} 
            position={{ lat: guide.lat, lng: guide.lng }}
            icon={{
              url: "/skiguide.svg",
              scaledSize: new window.google.maps.Size(30,30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15)
            }}
            onClick={() => {
              setSelected(guide)
            }}
          />
        )}

        {selected ? (<InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => {
          setSelected(null);
        }}>
          <div>
            <h5>{selected.first_name}</h5>
              <p>Type: {selected.type.join(', ')}</p>
              <p>Rating: {selected.avg}/5</p>
              <Link to={`/guides/${selected.id}`}>More info</Link>
              
          </div>  
            </InfoWindow>) : null }

      </GoogleMap>
    </>
  );
}

function Locate({ panTo }) {
  return (
    <button className="locate" onClick={() => {
      navigator.geolocation.getCurrentPosition((position) => 
      panTo({
        lat: position.coords.lat, 
        lng: position.coords.lng 
      }), 
      () => null);
    }}>
      <img src="compass.svg" height="50px" alt="compass - locate me" />
    </button>
  );
}

