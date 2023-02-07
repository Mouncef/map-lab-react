import React from "react";
import './App.css';
import AutoCompleteExample from "./examples/AutoComplete";
import Main from './pages/Index'
import {Geocoder} from "./services/Geocoder";


/*const App = () => (
    <div className="App">
        <div className="App-header">
            <AutoCompleteExample />
        </div>
    </div>

);*/


const App = () => {

    const [state, setState] = React.useState({
        coachs: []
    })

    React.useEffect(() => {
        setState({
            coachs: getCoachs()
        })

        return () => {

        }

    }, []);


    const getCoachs = () => {
        // const tmp = [];
        const placesNear = [
            "7Bis avenue de général de gaulle, 95100 Argenteuil",
            "5 boulevard héloise, 95100 Argenteuil",
            "10 rue Massue, Vincennes",
            "5 avenue françois mitterand, saint denis"
        ];

        const places = [];
        placesNear.map(async (address) => {
            const result = await getAddresseCoords(address);
            places.push(result);
            return places;
        });

        return places
    }
    const getAddresseCoords = async (address) => {
        const result = await Geocoder.geocode(address);
        return await result[0];
    }

    return <Main coachs={state.coachs} />
}

export default App