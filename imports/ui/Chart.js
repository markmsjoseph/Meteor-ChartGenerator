import React from 'react';
import {Bar, Line, Radar, Polar, Doughnut, Bubble, Scatter} from 'react-chartjs-2';
import { createContainer } from 'meteor/react-meteor-data';
import ReactFileReader from 'react-file-reader';

export  class BarChart extends React.Component {

    constructor(props) {
         super(props);
          this.state={
            entireFile:"",
            xAxisLabels:'',
            firstColumnOfData:'',
            chartType:'line'

          }
    }

    //we want to return an object that we can pass to the data prop on each chart
    //and where we can set the state of the labels and data itself
    returnDataSet =() =>{
      console.log("LABELS STATE", this.state.xAxisLabels);
      var dataObject ={
                             labels: this.state.xAxisLabels,
                             datasets: [{
                                 label: '# of Votes',
                                 data: this.state.firstColumnOfData
                             }]
                     }

      console.log("DATAOBJECT", dataObject);
       return dataObject;

    }

    //radio buttons switch between chart types
    renderChartType(){
              if(this.state.chartType == "line"){
                return(
                  <Line
                      data={this.returnDataSet()}

                     />
                );
              }
              else if(this.state.chartType == "bar"){
                return(
                  <Bar
                      data={this.returnDataSet()}

                     />
                );
              }
              else if(this.state.chartType == "polar"){
                return(
                  <Polar
                    data={this.returnDataSet()}

                     />
                );
              }
              else if(this.state.chartType == "radar"){
                return(
                  <Radar
                      data={this.returnDataSet()}

                     />
                );
              }
              else if(this.state.chartType == "doughnut"){
                return(
                  <Doughnut
                      data={this.returnDataSet()}

                     />
                );
              }
    }


    //read in the csv file and process it in order to get the x axis labels and the dataset
    //the dataset will contain the first column with data, not multiple columns
    handleFiles = files => {
            var reader = new FileReader();
            //filereader takes a callback function, must use arrow to preserver stateless
            //when data is done reading then function fires and state is set
            reader.onload = (e) => {

                  //we need to split the entire file by newline chars to get the labels and the first column of data
                  this.setState({entireFile: reader.result});
                  var arrayOfStrings = this.state.entireFile.split("\n");
                  //set the labels and the data
                  this.setState({
                    xAxisLabels: arrayOfStrings[0].split(","),
                    firstColumnOfData:arrayOfStrings[1].split(",")
                  });

            }
          //contents of file will be converted to a string
          var entireFile = reader.readAsText(files[0]);
    }


    render() {
              return (
                  <div className="container">
                            <div className="row justify-content-center selectCharts">

                                        <label className="radioButtons">
                                              <input type="radio" name="button" value="line"  onChange={(e)=>{
                                              this.setState({chartType: e.target.value});
                                            }}/> Line
                                                <span className="checkmark"></span>
                                        </label>

                                        <label className="radioButtons">
                                              <input type="radio" name="button" value="bar" onChange={(e)=>{
                                                this.setState({chartType: e.target.value});
                                              }}/> Bar
                                                <span className="checkmark"></span>
                                        </label>

                                        <label className="radioButtons">
                                              <input type="radio" name="button" value="polar" onChange={(e)=>{
                                                this.setState({chartType: e.target.value});
                                              }}/> Polar
                                                <span className="checkmark"></span>
                                        </label>
                                        <label className="radioButtons">
                                              <input type="radio" name="button" value="radar" onChange={(e)=>{
                                                this.setState({chartType: e.target.value});
                                              }}/> Radar
                                                <span className="checkmark"></span>
                                        </label>

                                        <label className="radioButtons">
                                              <input type="radio" name="button" value="doughnut" onChange={(e)=>{
                                                this.setState({chartType: e.target.value});
                                              }}/> Doughnut
                                                <span className="checkmark"></span>
                                        </label>
                                        <br/>
                                        <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                                            <button className='btn'>Upload</button>
                                        </ReactFileReader>

                                          {this.renderChartType()}


                                </div>
                  </div>


              );
    }

}



export default createContainer(() => {
  return {

  };
}, BarChart);
