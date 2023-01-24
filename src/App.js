import React from "react";
import './App.css';
import AutoCompleteExample from "./examples/AutoComplete";
import HeatMap from "./examples/HeatMap";
import Main from "./examples/Main";
import MarkerInfoWindow from "./examples/MarkerInfoWindow";
import MarkerInfoWindowGmapsObj from "./examples/MarkerInfoWindowGmapsObj";
import SearchBoxExample from "./examples/SearchBox";


const App = () => (
    <div className="App">
        <div className="App-header">
            {/*<SearchBoxExample />*/}
            {/*<MarkerInfoWindowGmapsObj />*/}
            {/*<MarkerInfoWindow />*/}
            {/*<HeatMap />*/}
            <AutoCompleteExample />
            {/*<Main />*/}
        </div>
    </div>

);


export default App