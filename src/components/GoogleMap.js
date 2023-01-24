import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

const GoogleMap = ({ children, ...props }) => (
    <Wrapper>
        <GoogleMapReact
            defaultCenter={[48.939603083218614, 2.2347119850115083]}
            bootstrapURLKeys={{
                key: process.env.REACT_APP_API_GOOGLE_MAPS_KEY,
                libraries: ['places', 'geometry','visualization'],
            }}
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
            {...props}
        >
            {children}
        </GoogleMapReact>
    </Wrapper>
);

GoogleMap.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
};

GoogleMap.defaultProps = {
    children: null,
};


export default GoogleMap;