
import React, { Component} from "react";
import ReactDOM from "react-dom";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import oceanIgnore from "fusioncharts/themes/fusioncharts.theme.ocean";
import zuneIgnore from "fusioncharts/themes/fusioncharts.theme.zune";

charts(FusionCharts);

var newProps;
export default class Model extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProppp){
    this.newProps = newProppp;
  }
  

  render() {

    /* We are geting the desired chart data from the upper component i.e App.js*/

    var myDataSource = this.props.jsonData;
    var props_multi_chart = { id: "multi_chart", renderAt: "multi_chart_container", type: "mscombi2d", width: 600, height: 400, dataFormat: "json", dataSource: myDataSource };

    return (
      <ReactFC {...props_multi_chart} />
    );
  }
}
