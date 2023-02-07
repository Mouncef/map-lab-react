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

const getDistanceFromLatLonInKm = (coords1: Coords, coords2: Coords) => {


    let R = 6371; // Radius of the earth in km

    let dLat = deg2rad(coords2.lat-coords1.lat);  // deg2rad below on lat
    let dLon = deg2rad(coords2.long-coords1.long); // deg2rad below on long


    // The haversine formula
    let a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(coords1.lat)) * Math.cos(deg2rad(coords2.lat)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));


    // Distance in km
    return R * c;
};

const deg2rad = (deg) => {
    return deg * (Math.PI/180)
}

export const Geocoder = {
    geocode,
    getDistanceFromLatLonInKm
};