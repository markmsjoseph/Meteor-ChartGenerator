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
            secondCOlumnOfData:'',
            twoPointPlot:'false',
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
                                           data: this.state.firstColumnOfData,
                                           backgroundColor: [
                                              'rgba(255, 99, 132, 0.2)',
                                              'rgba(54, 162, 235, 0.2)',
                                              'rgba(255, 206, 86, 0.2)',
                                              'rgba(75, 192, 192, 0.2)',
                                              'rgba(153, 102, 255, 0.2)',
                                              'rgba(255, 159, 64, 0.2)'
                                            ],
                                            borderColor: [
                                                'rgba(255,99,132,1)',
                                                'rgba(54, 162, 235, 1)',
                                                'rgba(255, 206, 86, 1)',
                                                'rgba(75, 192, 192, 1)',
                                                'rgba(153, 102, 255, 1)',
                                                'rgba(255, 159, 64, 1)'
                                            ],
                                            borderWidth: 1
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


        //adds new label and data to the graphs
        addNewDataPointAndLabel(e){
            e.preventDefault();
            //all refs are stored on the this.refs object, trim is to take off all leading and after spaces
            let dataValue = this.refs.dataValue.value.trim();
            let label = this.refs.label.value.trim();

            this.setState((prevState) => ({
              xAxisLabels: [...prevState.xAxisLabels, label],
              firstColumnOfData: [...prevState.firstColumnOfData, dataValue]
            }));


        }


        //create array of x and y point objects
        generateXandYdataPoints(xarray, yarray){

            let xyArrayPoints = [];//data array which will hold objects of x and y values

            //excel rows were not of x and y coordinate types
            if(xarray.length != yarray.length){
              console.log("Bad data input");
            }
            else{
              for(var i=0; i<xarray.length; i++){
                //create object of form {x:12,y:20}
                  const coordinatesObject = {x:xarray[i], y:yarray[i]}
                  console.log(coordinatesObject);
                  xyArrayPoints.push(coordinatesObject);
              }
              console.log(xyArrayPoints);
            }

        }

        // removeDataPoint(){
        //       var array = this.state.people.filter(function(item) {
        //         return item !== e.target.value
        //       });
        //
        //
        //
        //       this.setState({
        //         people: array
        //       })
        //
        // }


    render() {
      this.generateXandYdataPoints([1,2,3,4,5], [6,7,8,9,10])
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

                                        <form onSubmit={this.addNewDataPointAndLabel.bind(this)} >
                                              <input  className = 'inputLoginFormStyles form-control form-control-lg' type="text" ref = "dataValue" placeholder= "Value of new datapoint"/>
                                              <input className = 'inputLoginFormStyles form-control form-control-lg' type="text" ref = "label" placeholder= "X-axis label"/>
                                               <button className=' button-login'> Add Data Point and label</button>
                                        </form>



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
