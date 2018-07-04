import React from 'react';
import {Bar, Line, Radar, Polar, Doughnut, Bubble, Scatter} from 'react-chartjs-2';
import ReactFileReader from 'react-file-reader';
// import readXlsxFile from 'read-excel-file';

export default class BarChart extends React.Component {

    constructor(props) {
         super(props);
          this.state={
            data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],


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
            }],
            options: {
          // This chart will not respond to mousemove, etc
              events: ['click']
              }
              },
              chartType:'line'
              }
    }


    renderChartType(){
      if(this.state.chartType == "line"){
        return(
          <Line
              data={this.state.data}

             />
        );
      }
      else if(this.state.chartType == "bar"){
        return(
          <Bar
              data={this.state.data}

             />
        );
      }
      else if(this.state.chartType == "polar"){
        return(
          <Polar
              data={this.state.data}

             />
        );
      }
      else if(this.state.chartType == "radar"){
        return(
          <Radar
              data={this.state.data}

             />
        );
      }
      else if(this.state.chartType == "doughnut"){
        return(
          <Doughnut
              data={this.state.data}

             />
        );
      }


    }


    handleFiles = (files) => {
   //    var reader = new FileReader();
   //   reader.onload = function(e) {
   //   // Use reader.result
   //   alert(reader.result)
   //   }
   //   console.log(files[0]);
   // reader.readAsText(files[0]);
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
                                        <ReactFileReader handleFiles={this.handleFiles}>
                                          <button className='btn'>Upload</button>
                                        </ReactFileReader>

                                          {this.renderChartType()}


                                </div>
                  </div>


              );
    }

}
