import React, { Component } from 'react';
import isEmpty from 'lodash.isempty';

import GoogleMap from "../components/GoogleMap";
import StyledMarker from "../components/StyledMarker";


const MarkerInfoWindow = () => {
    const [state, setState] = React.useState({
        places: []
    })

    React.useEffect(() => {
        fetch('places.json')
            .then((response) => response.json())
            .then((data) => {
                data.results.forEach((result) => {
                    result.show = false; // eslint-disable-line no-param-reassign
                });
                setState({ places: data.results });
            });
    }, [])

    const onChildClickCallback = (key) => {
        setState((state) => {
            const index = state.places.findIndex((e) => e.id === key);
            state.places[index].show = !state.places[index].show; // eslint-disable-line no-param-reassign
            return { places: state.places };
        });
    };

    return (
        <>
            {!isEmpty(state.places) && (
                <div style={{ height: '100vh', width: '100%' }}>
                    <GoogleMap
                        defaultZoom={10}
                        onChildClick={onChildClickCallback}
                    >
                        {state.places.map((place) => (
                            <StyledMarker
                                key={place.id}
                                lat={place.geometry.location.lat}
                                lng={place.geometry.location.lng}
                                show={place.show}
                                place={place}
                            />
                        ))}
                    </GoogleMap>
                </div>

            )}
        </>
    );
}

export default MarkerInfoWindow;