import React, { Component } from 'react';
import logo from '../logo.svg';
import '../Styles/Output/App.css';
import SearchAndGetWeatherJson from "./SearchAndGetWeatherJson";
import  Model  from "./ConfigureChart";


class App extends Component {
  constructor(props){
    super(props);
    this.state = { jsonData : [] }
  }
  

  GetGeneratedJson = (jsonGen) => {

    if(jsonGen){
      this.setState({jsonData : jsonGen})
    }

  }

  render() {
    return <div className="App">
        <h1>My weather forcast App </h1>
        
        <SearchAndGetWeatherJson GetGeneratedJson={this.GetGeneratedJson.bind(this)} />

        <div id="chart-container">

          <Model jsonData={this.state.jsonData} />
          
        </div>
      </div>;
  }
}

export default App;
