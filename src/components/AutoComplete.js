import React, { Component } from 'react';
import styled from 'styled-components';
import Input from '@mui/material/Input';
import SearchInput from "./SearchInput";
import {Geocoder} from "../services/Geocoder";
import Coords from "../models/Coords";
const Wrapper = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
  // padding: 20px;
`;

class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.clearSearchBox = this.clearSearchBox.bind(this);
    }

    componentDidMount({ map, mapApi } = this.props) {
        const options = {
            // restrict your search to a specific type of result
            // types: ['geocode', 'address', 'establishment', '(regions)', '(cities)'],
            // restrict your search to a specific country, or an array of countries
            // componentRestrictions: { country: ['gb', 'us'] },
        };
        this.autoComplete = new mapApi.places.Autocomplete(
            this.searchInput,
            options,
        );
        this.autoComplete.addListener('place_changed', this.onPlaceChanged);
        this.autoComplete.bindTo('bounds', map);
    }

    componentWillUnmount({ mapApi } = this.props) {
        mapApi.event.clearInstanceListeners(this.searchInput);
    }


    getAddresseCoords = async (address) => {
        const result = await Geocoder.geocode(address);
        return await result[0];

    }
    onPlaceChanged = ({ map, addplace, coachs } = this.props) => {
        const places = [];
        const place = this.autoComplete.getPlace();

        if (!place.geometry) return;
        places.push(place);
        // if (place.geometry.viewport) {
            // map.fitBounds(place.geometry.viewport);
        // } else {
        // }



        map.setCenter(place.geometry.location);
        map.setZoom(15);


        place.internalId= "My-loaction";


        if (coachs.length > 0) {

            let coords = new Coords(
                place.geometry.location.lat(),
                place.geometry.location.lng(),
                'Mouncef',
                'client',
                place.formatted_address
            );
            // console.log(coords);


            coachs.map((placeNear, idx) => {


                let coords2 = new Coords(
                    placeNear.geometry.location.lat,
                    placeNear.geometry.location.lng,
                    'Entraineur '+ idx,
                    'Musculation',
                    placeNear.formatted_address
                )

                // console.log(coords2)



                const distance = Geocoder.getDistanceFromLatLonInKm(coords, coords2);

                // console.log(distance + ' km')

                if (distance < 10) {
                    places.push(placeNear)
                }
            })
        }

        console.log(places)
        addplace(places);
        this.searchInput.blur();
    };

    clearSearchBox() {
        this.searchInput.value = '';
    }


    render() {
        return (
            <Wrapper>
                <SearchInput
                    placeholder={"Entrez une adresse"}
                    inputRef={(ref) => {
                        this.searchInput = ref;
                    }}
                    onFocus={this.clearSearchBox}
                    style={{ color: '#fff'}}
                />
            </Wrapper>
        );
    }
}

export default AutoComplete;