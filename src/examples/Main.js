import React from "react";
import isEmpty from 'lodash.isempty';
import Marker from "../components/Marker";
import GoogleMap from "../components/GoogleMap";
import {Box, Grid} from "@mui/material";


// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
    const bounds = new maps.LatLngBounds();

    places.forEach((place) => {
        bounds.extend(new maps.LatLng(
            place.geometry.location.lat,
            place.geometry.location.lng,
        ));
    });
    return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, 'idle', () => {
        maps.event.addDomListener(window, 'resize', () => {
            map.fitBounds(bounds);
        });
    });
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, places) => {
    // Get bounds by our places
    const bounds = getMapBounds(map, maps, places);
    // Fit map to bounds
    map.fitBounds(bounds);
    // Bind the resize listener
    bindResizeListener(map, maps, bounds);
};


const Main = () => {
    const ARGENTEUIL_CENTER = [48.939603083218614, 2.2347119850115083];

    const [state, setState] = React.useState({
        places: []
    });

    React.useEffect(() => {
        fetch('places.json')
            .then((response) => response.json())
            .then((data) => setState({ places: data.results }));
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <Grid item xs={12} style={{height: 1500}}>
                    {!isEmpty(state.places) && (
                        <div style={{ height: '100vh', width: '100%' }}>
                            <GoogleMap
                                defaultZoom={10}
                                yesIWantToUseGoogleMapApiInternals
                                onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, state.places)}
                            >
                                {state.places.map((place) => (
                                    <Marker
                                        key={place.id}
                                        text={place.name}
                                        lat={place.geometry.location.lat}
                                        lng={place.geometry.location.lng}
                                    />
                                ))}
                            </GoogleMap>
                        </div>

                    )}
                </Grid>
            </Grid>

        </Box>
    );
}

export default Main;