import React from "react";
import isEmpty from 'lodash.isempty';


import Marker from "../components/Marker";
import GoogleMap from "../components/GoogleMap";
import AutoComplete from "../components/AutoComplete";
import {Box, Grid} from "@mui/material";


const AutoCompleteExample = () => {
    const ARGENTEUIL_CENTER = [48.939603083218614, 2.2347119850115083];

    const [state, setState] = React.useState({
        mapApiLoaded: false,
        mapInstance: null,
        mapApi: null,
        places: [],
    });


    const apiHasLoaded = (map, maps) => {
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
                <Grid item xs={12}>
                    {
                        state.mapApiLoaded && (
                            <AutoComplete map={state.mapInstance} mapApi={state.mapApi} addplace={addPlace} />
                        )
                    }
                    <div style={{ height: '100vh', width: '100%' }}>
                        <GoogleMap
                            defaultZoom={10}
                            defaultCenter={ARGENTEUIL_CENTER}
                            bootstrapURLKeys={{
                                key: process.env.REACT_APP_API_GOOGLE_MAPS_KEY,
                                libraries: ['places', 'geometry'],
                            }}
                            yesIWantToUseGoogleMapApiInternals
                            onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
                            options={{
                                panControl: false,
                                mapTypeControl: false,
                                scrollwheel: true,
                                styles: [
                                    {
                                        stylers:
                                            [
                                                { 'saturation': -100 },
                                                { 'gamma': 0.8 },
                                                { 'lightness': 4 },
                                                { 'visibility': 'on' }
                                            ]
                                    }
                                ]
                            }}
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