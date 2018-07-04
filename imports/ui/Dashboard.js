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
                                        <PrivateHeader  title="Poetry App"  />
                                          <h3 className = "header__linksAllPoems"> <Link to ="/allnotes">Accounting Software</Link> </h3>
                                  </div>
                        </div>
                        Select Chart Type
                        Import Excel Document
                      <Chart />
                  </div>
              );
    }

  }
