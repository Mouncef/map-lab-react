import Geocode from "react-geocode";






const geocode = async (address) => {
    Geocode.setApiKey(process.env.REACT_APP_API_GOOGLE_MAPS_KEY);
    Geocode.setLanguage("fr");
    Geocode.setRegion("fr");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();
    const response = await Geocode.fromAddress(address);
    return await response.results;
       /* .then((response)=> {
            // console.log(response)
            return response
            // const { lat, lng } = response.results[0].geometry.location
            // console.log(lat, lng )
        }, (error) => {
            console.log(error)
        })
    ;*/

}


export const Geocoder = {
    geocode
};