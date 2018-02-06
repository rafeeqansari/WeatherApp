import React from "react";

let RecvProps = null;

 var url = "http://api.openweathermap.org/data/2.5/forecast?APPID=2196ee7edabfad5ebb6fe77f256ab623&q=";

 var jsondata;

  var timeArr = [],
    tempArr = [];

    var date;


export default class SearchAndGetWeatherJson extends React.Component {
  constructor(props) {
    super(props);
    this.CreateJson = this.CreateJson.bind(this);

  }
  

  render() {
    return <div>
        <form id="search-form_3">
          <input className="search_3" type="text" placeholder="Type City Name then click OutSide" ref="SearchString" onBlur={this.onSearchClick.bind(this)} />
        </form>
      </div>;
  }


  onSearchClick(event) {
    event.preventDefault();

     var apiURL =  url + this.refs.SearchString.value;
     this.FetchWeather(apiURL);
     
  }

  /**
   * Creating our Own json to give this to configure chart component
   */
   CreateJson = () => {

    var chartData  = {};

chartData.chart = {
  caption: "Weather Forecast",
  subcaption: "React App",
  xaxisname: "Time",
  yaxisname: "Temperature (In celcius)",
  numberprefix: "",
  theme: "ocean"
};

chartData.categories = [];

chartData.categories.push({ category: timeArr });

chartData.dataset = [
  {
    seriesname: "Weather Forecast",
    renderas: "line",
    showvalues: "0",
    data: tempArr
  }
];

this.props.GetGeneratedJson(chartData);
}

/** Getting the current time and date */

GetTimeandDate= () => {

      var d = new Date();
      var month = parseInt(d.getMonth() + 1).toString();
      var day = parseInt(d.getDate()).toString();
      var year = parseInt(d.getYear() + 1900);
      if (day.length == 1) {
          day = "-0" + day;
      }
      else{
          day = "-" + day;
      }

      if (month.length == 1) {
        month = "-0" + month;
      } else {
        month = "-" + month;
      }
       date = year + month + day;

       return date;

}

/* Fetching the data and based on todays date setting up the  new json for configure chart component */ 


  FetchWeather = (url) => {

    var todaysdate = this.GetTimeandDate();
   return fetch(url)
     .then(response => {
       if (!response.ok) {
         throw Error(response.statusText);
       }
       return response;
     })
     .then(response => response.json())
     .then(items => {
       jsondata = items;
      timeArr = [];
      tempArr = [];
       items.list.map(item=>{

           if(todaysdate == item.dt_txt.split(' ')[0]){
             timeArr.push({"label":item.dt_txt.split(' ')[1].split(":")[0]});

             var celsius = Math.floor(item.main.temp - 273.15);
            // tempArr.push({"value":item.main.temp});

            tempArr.push({"value": celsius});
           }
           
       });
       console.log(timeArr);
       console.log(tempArr);
     }).then(this.CreateJson())
     .catch(() => console.log("Unable to Get the data"));
  };

 
}





