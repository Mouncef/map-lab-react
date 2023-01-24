import React, { Component } from 'react';
import isEmpty from 'lodash.isempty';

import Marker from "../components/Marker";

import GoogleMap from "../components/GoogleMap";
import SearchBox from "../components/SearchBox";


const SearchBoxExample = () => {
    const [state, setState] = React.useState({
        mapApiLoaded: false,
        mapInstance: null,
        mapApi: null,
        places: [],
    })

    const apiHasLoaded = (map, maps) => {
        setState(prevState => ({
            ...prevState,
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps,
        }));
    };

    const addPlace = (place) => {
        setState(prevState => ({ ...prevState, places: place }));
    };

    const {
        places, mapApiLoaded, mapInstance, mapApi,
    } = state;


    return (
        <>
            {mapApiLoaded && <SearchBox map={mapInstance} mapApi={mapApi} addplace={addPlace} />}
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMap
                    defaultZoom={10}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
                >
                    {!isEmpty(places)
                    && places.map((place) => (
                        <Marker
                            key={place.id}
                            text={place.name}
                            lat={place.geometry.location.lat()}
                            lng={place.geometry.location.lng()}
                        />
                    ))}
                </GoogleMap>
            </div>

        </>
    );
}

export default SearchBoxExample