import React, { Component } from 'react';
import isEmpty from 'lodash.isempty';

import GoogleMap from "../components/GoogleMap";



const HeatMap = () => {
    const [state, setState] = React.useState({
        places: []
    });

    React.useEffect(() => {
        fetch('places.json')
            .then((response) => response.json())
            .then((data) => setState({ places: data.results }));
    }, [])

    const { places } = state;
    const data = places.map((place) => ({
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
        weight: Math.floor(Math.random() * Math.floor(5)),
    }));
    const heatmapData = {
        positions: data,
        options: {
            radius: 20,
            opacity: 1,
        },
    };

    return (
        <>
            {!isEmpty(places) && (
                <div style={{ height: '100vh', width: '100%' }}>
                    <GoogleMap
                        defaultZoom={10}
                        heatmap={heatmapData}
                    />
                </div>
            )}
        </>
    );
}


export default HeatMap