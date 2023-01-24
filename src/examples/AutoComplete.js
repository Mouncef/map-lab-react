import React from "react";
import isEmpty from 'lodash.isempty';


import Marker from "../components/Marker";
import GoogleMap from "../components/GoogleMap";
import AutoComplete from "../components/AutoComplete";
import {Box, Grid} from "@mui/material";


const AutoCompleteExample = () => {

    const [state, setState] = React.useState({
        mapApiLoaded: false,
        mapInstance: null,
        mapApi: null,
        geocoder: null,
        places: [],
    });


    const apiHasLoaded = (map, maps) => {
        // Here were l'api is stored


        console.log(map)
        console.log(maps)
        setState(prev => ({
            ...prev,
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps,
        }));
    };

    const addPlace = (place) => {
        setState(prev => ({...prev, places: [place] }));
    };




    console.log(state.places)
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <Grid item xs={3}>
                    {
                        state.mapApiLoaded && (
                            <AutoComplete map={state.mapInstance} mapApi={state.mapApi} addplace={addPlace} />
                        )
                    }
                </Grid>
                <Grid item xs={9}>
                    <div style={{ height: '100vh', width: '100%' }}>
                        <GoogleMap
                            defaultZoom={10}
                            yesIWantToUseGoogleMapApiInternals
                            onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
                        >
                            {!isEmpty(state.places)
                            && state.places.map((place, idx) => (
                                <Marker
                                    key={idx}
                                    text={place.name}
                                    lat={place.geometry.location.lat()}
                                    lng={place.geometry.location.lng()}
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