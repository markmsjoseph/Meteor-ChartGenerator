import React from 'react';
import { Link } from 'react-router-dom';
import PrivateHeader from './PrivateHeader';
import {Bar} from 'react-chartjs-2';
import Chart from './Chart'



export default class Dashboard extends React.Component {

    constructor(props) {
    super(props);

  }

    componentWillMount() {

    }

    componentDidMount() {

    }


    render() {
              console.log("Render called");
              return (
                  <div>
                        <div className="header">
                                  <div className="header__content">
                                        <PrivateHeader  title="Data Charts"  />
                                  </div>
                                  <h3 className="item-instructions"> Upload CSV or plot your own points</h3>
                                <p className="item-instructions">CSV: Upload a .CSV file with first being headings and second being data values. To plot on the X and Y axis, the third row must contain the Y values of the datapoints </p>
                        </div>

                      <Chart />
                  </div>
              );
    }

  }
