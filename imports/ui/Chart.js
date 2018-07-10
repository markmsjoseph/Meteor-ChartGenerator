import React from 'react';
import {Bar, Pie, Line, Radar, Polar, Doughnut, Bubble, Scatter} from 'react-chartjs-2';
import { createContainer } from 'meteor/react-meteor-data';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactFileReader from 'react-file-reader';
import { CSSTransitionGroup } from 'react-transition-group';

export  class BarChart extends React.Component {

    constructor(props) {
         super(props);
          this.state={
            entireFile:"",//used to load entire file and manipulate it
            xAxisLabels:'',
            singleDataSet:'',
            twoPointDataSet:'',
            chartType:'scatter',
            tabIndex:0,
            xyDataArray:'',
            error:''

          }
    }

    //we want to return an object that we can pass to the data prop on each chart
    //and where we can set the state of the labels and data itself
    //called in render method and passed as arg to renderChartType
    returnDataSet =(data) =>{

      var dataObject ={
                             labels: this.state.xAxisLabels,
                             datasets: [{
                                           label: '# of Votes',
                                           data: data,
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


       return dataObject;

    }


    //read in the csv file and process it in order to get the x axis labels and the dataset
    //the dataset will contain the first column with data, not multiple columns
    handleFiles = (files) => {
          console.log("BP0");
          var reader = new FileReader();
          //filereader takes a callback function, must use arrow to preserver stateless
          //when data is done reading then function fires and state is set
          reader.onload = (e) => {

                //we need to split the entire file by newline chars to get the labels and the first column of data
                this.setState({entireFile: reader.result});
                  console.log("BP0.5");

                var arrayOfStrings = this.state.entireFile.split("\n");

                let xyArrayPoints = [];//data array which will hold objects of x and y values
                var xarray = arrayOfStrings[1].split(",");
                var yarray = arrayOfStrings[2].split(",");
                //excel rows were not of x and y coordinate types
                if(xarray.length != yarray.length){
                  console.log("Bad data input");
                }
                else{
                  for(var i=0; i<xarray.length; i++){
                    //create object of form {x:12,y:20}
                      const coordinatesObject = {x:parseFloat(xarray[i]), y:parseFloat(yarray[i]), r:15}
                      console.log(coordinatesObject);
                      xyArrayPoints.push(coordinatesObject);
                  }
                  // console.log("Array of objects: ", xyArrayPoints);
                }


                //set the labels and the data
                this.setState({
                  xAxisLabels: arrayOfStrings[0].split(","),
                  singleDataSet:arrayOfStrings[1].split(","),
                  twoPointDataSet:arrayOfStrings[2].split(","),
                  xyDataArray: xyArrayPoints
                });


          }
        //contents of file will be converted to a string
        var entireFile = reader.readAsText(files[0]);
    }



    //adds new label and data to the graphs with 1 axis
    addNewDataPointAndLabel(e){
        e.preventDefault();
        //all refs are stored on the this.refs object, trim is to take off all leading and after spaces
        let dataValue = this.refs.dataValue.value.trim();
        let label = this.refs.label.value.trim();

        this.setState((prevState) => ({
          xAxisLabels: [...prevState.xAxisLabels, label],
          singleDataSet: [...prevState.singleDataSet, dataValue]
        }));

        this.refs.dataValue.value = "";
        this.refs.label.value="";

    }



    //adds new x y coordinate and label
    addNewXYDataPointAndLabel(e){
      e.preventDefault();


      //all refs are stored on the this.refs object, trim is to take off all leading and after spaces
      let xAxis = this.refs.xAxis.value.trim();
      let yAxis = this.refs.yAxis.value.trim();


      const xyObject = {x:parseFloat(xAxis), y:parseFloat(yAxis), r:15}
      //update xy array of data containing xy points
      this.setState((prevState) => ({
        xyDataArray: [...prevState.xyDataArray, xyObject]
      }));

      console.log("BEFORE ADD");
      this.refs.xAxis.value = "";
      this.refs.yAxis.value = "";
      console.log("AFTER ADD");
    }


    //displays radio button for 1 axis
    displayChartOptions(){
      return(
        <div>


                  <label className="radio-button">
                        <input type="radio" name="button" value="bar" onChange={(e)=>{
                          this.setState({chartType: e.target.value});
                        }}/> Bar
                          <span className="checkmark"></span>
                  </label>

                  <label className="radio-button">
                        <input type="radio" name="button" value="pie" onChange={(e)=>{
                          this.setState({chartType: e.target.value});
                        }}/> Pie
                          <span className="checkmark"></span>
                  </label>

                  <label className="radio-button">
                        <input type="radio" name="button" value="polar" onChange={(e)=>{
                          this.setState({chartType: e.target.value});
                        }}/> Polar
                          <span className="checkmark"></span>
                  </label>

                  <label className="radio-button">
                        <input type="radio" name="button" value="doughnut" onChange={(e)=>{
                          this.setState({chartType: e.target.value});
                        }}/> Doughnut
                          <span className="checkmark"></span>
                  </label>




                  <label className="radio-button">
                        <input type="radio" name="button" value="line"  onChange={(e)=>{
                        this.setState({chartType: e.target.value});
                      }}/> Line
                          <span className="checkmark"></span>
                  </label>

                  <label className="radio-button">
                        <input type="radio" name="button" value="radar" onChange={(e)=>{
                          this.setState({chartType: e.target.value});
                        }}/> Radar
                          <span className="checkmark"></span>
                  </label>






        </div>
      );
    }



    //displays radio button for 2 axis
    displayChartOptions2d(){
      return(
        <div>

                  <label className="radio-button">
                        <input type="radio"  name="button" value="scatter"   onChange={(e)=>{
                          console.log("setting state scatter");
                          this.setState({chartType: e.target.value});
                        }}/> Scatter
                          <span className="checkmark"></span>
                  </label>
                  <label className="radio-button">
                        <input type="radio" name="button" value="bubble" onChange={(e)=>{
                          console.log("Setting state bubble");
                          this.setState({chartType: e.target.value});
                        }}/> Bubble
                          <span className="checkmark"></span>
                  </label>
      </div>
      );
    }



    //displays the 1 axis chart
    //takes a dataset as argument
    renderChartType(dataset){

              if(this.state.chartType == "line"){
                return(
                  <Line
                        data={dataset}

                       />
                );
              }
              else if(this.state.chartType == "bar"){
                return(
                  <Bar
                      data={dataset}

                     />
                );
              }
              else if(this.state.chartType == "polar"){
                return(
                  <Polar
                    data={dataset}

                     />
                );
              }
              else if(this.state.chartType == "radar"){
                return(
                  <Radar
                      data={dataset}

                     />
                );
              }
              else if(this.state.chartType == "doughnut"){
                return(
                  <Doughnut
                      data={dataset}

                     />
                );
              }
              else if(this.state.chartType == "scatter"){
                return(
                  <Scatter
                      data={dataset}

                     />
                );
              }
              else if(this.state.chartType == "bubble"){
                return(
                  <Bubble
                      data={dataset}

                     />
                );
              }
              else if(this.state.chartType == "pie"){
                return(
                  <Pie
                      data={dataset}

                     />
                );
              }
    }




    render() {
      console.log("One axis array: ", this.state.singleDataSet);
      console.log("array of objects in render: ", this.state.xyDataArray);

              return (
                  <div className="container">
                            <div className="row justify-content-center selectCharts">

                              <div className = "fileREaderButton">
                              <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                                  <button className=''>Upload</button>
                              </ReactFileReader>
                            </div>

                             <Tabs className="react-tabs-form" selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                                             <TabList className="tabtop">
                                               <h1 className = "chatAppHeader"> Select Axis & ChartType  </h1>
                                                               <Tab>X Axis Charts</Tab>
                                                               <Tab>X, Y Axis Chart</Tab>
                                             </TabList>


                                             <TabPanel>
                                                 {this.displayChartOptions()}
                                                 {this.state.error}
                                                 <form onSubmit={this.addNewDataPointAndLabel.bind(this)} class="form-inline">
                                                       <input id="submitValInput" className = 'inputXval' type="text" ref = "dataValue" placeholder= "Value of datapoint"/>
                                                       <input id="submitValInput" className = 'inputXval' type="text" ref = "label" placeholder= "X-axis label"/>
                                                        <button className=' button-submitForm'> Add New Data Point</button>
                                                 </form>
                                             </TabPanel>

                                             <TabPanel>
                                                  {this.displayChartOptions2d() }
                                                  {this.state.error}
                                                   <form onSubmit={this.addNewXYDataPointAndLabel.bind(this)} class="form-inline">
                                                         <input  id="submitValInput" className = 'inputXval' type="text" ref = "xAxis" placeholder= "X-axis value"/>
                                                         <input id="submitValInput" className = 'inputXval' type="text" ref = "yAxis" placeholder= "Y-axis value"/>
                                                          <button className=' button-submitForm'> Add X,Y Point</button>
                                                   </form>
                                            </TabPanel>
                              </Tabs>
                                          { this.state.tabIndex== 0 ?  this.renderChartType(this.returnDataSet(this.state.singleDataSet)) : console.log("") }
                                          { this.state.tabIndex== 1 ? this.renderChartType(this.returnDataSet(this.state.xyDataArray)) : console.log("") }

                                </div>
                  </div>
              );
    }//end render

}//end class



export default createContainer(() => {
  return {

  };
}, BarChart);
