import React from "react";
import isEmpty from 'lodash.isempty';

import Marker from "../components/Marker";
import GoogleMap from "../components/GoogleMap";
import AutoComplete from "../components/AutoComplete";
import {Box, Grid} from "@mui/material";
import {Geocoder} from "../services/Geocoder";



const AutoCompleteExample = () => {

    const [state, setState] = React.useState({
        mapApiLoaded: false,
        mapInstance: null,
        mapApi: null,
        places: [],
    });


    const apiHasLoaded = (map, maps) => {
        // Here were l'api is stored
        setState({
            places: [],
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps
        });
    };





    const addPlace = (place) => {
        if (place.length > 1) {
            setState(prev => ({...prev, places: place }));
        } else {
            const arrPlaces = state.places.slice(0);
            arrPlaces.push(place)

            // places.push(place)
            setState(prev => ({...prev, places: arrPlaces }));
        }

    };



    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <Grid item md={3} xs={12} style={{padding: 10}}>
                    {
                        state.mapApiLoaded && (
                            <AutoComplete map={state.mapInstance} mapApi={state.mapApi} addplace={addPlace} />
                        )
                    }
                </Grid>
                <Grid item md={9} xs={12} style={{padding: 2}}>
                    <div style={{ height: '94.5vh', width: '100%' , padding: 2}}>
                        <GoogleMap
                            defaultZoom={10}
                            yesIWantToUseGoogleMapApiInternals
                            onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
                        >
                            {!isEmpty(state.places)
                            && state.places.map((place, idx) => (
                                <Marker
                                    key={idx}
                                    text={place.name ?? " test"}
                                    lat={place.internalId ? place.geometry.location.lat() : place.geometry.location.lat}
                                    lng={place.internalId ? place.geometry.location.lng() : place.geometry.location.lng}
                                />
                            ))}
                        </GoogleMap>
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AutoCompleteExample