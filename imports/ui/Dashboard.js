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
                                          <h3 className = "header__linksAllPoems"> <Link to ="/allnotes">Link to not yet built component</Link> </h3>
                                  </div>
                                                    <p className=" row justify-content-center">  Save your excel document as a csv file with the first row being the titles of the data and the second row being the data values and click upload </p>
                        </div>

                      <Chart />
                  </div>
              );
    }

  }
