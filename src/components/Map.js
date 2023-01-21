import React from "react";

import GoogleMapReact from 'google-map-react';
import CoachSVG from '../assets/img/coach.svg'
const AnyReactComponent = ({ text , icon, children}) => <div style={{color: "#222"}}>
    {text}
    <br />
    <img src={icon} alt={"coach"} style={{position: "relative", width: 45}} />
    {children}
</div>;

const Map = ({defaultPlace}) => {

    console.log(defaultPlace)
    const mapOptions = (maps) => {
        console.log(maps)
        return {
            panControl: true,
            mapTypeControl: true,
            scrollwheel: true,
            styles: [{ stylers: [{ 'saturation': -100 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
        }
    }

    const defaultProps = {
        urlKeys: {
            key: process.env.REACT_APP_API_GOOGLE_MAPS_KEY,
            language: 'fr',
            region: 'fr',
            libraries:['places']
        },
        zoom: 6,

    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={defaultProps.urlKeys}
                defaultCenter={defaultPlace}
                defaultZoom={defaultProps.zoom}
                options={mapOptions}
            >
                <AnyReactComponent
                    lat={48.939603083218614}
                    lng={2.2347119850115083}
                    text="My Marker"
                    icon={CoachSVG}
                >
                    <h2>Test</h2>
                </AnyReactComponent>
            </GoogleMapReact>
        </div>
    );
}

export default Map;