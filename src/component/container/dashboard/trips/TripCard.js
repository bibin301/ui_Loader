import React, { Component } from 'react';
import img_gmail from "../../../../asset/images/dashboard/gmail.png";
import img_whatsapp from "../../../../asset/images/dashboard/whatsapp.png";
import img_google from "../../../../asset/images/dashboard/google-plus.png";
import img_calend from "../../../../asset/images/dashboard/calend.png";
// import img_facebook from "../../../../asset/images/dashboard/facebook.png";
import img_print from "../../../../asset/images/dashboard/print.png";
import img_socialClick from "../../../../asset/images/dashboard/socialClick.png";
import img_plane from "../../../../asset/images/plane.png";
import img_Date from "../../../../asset/images/Date Arrow.png";
import img_Departure from "../../../../asset/images/Departure.svg";
import img_Time from "../../../../asset/images/Time.svg"; 
import img_Airlines from "../../../../asset/images/United-Airlines.png";
import img_Arrival from "../../../../asset/images/Arrival.svg"

import img_tabelarrow from '../../../../asset/images/dashboard/tabelarrow.png'
import img_car from "../../../../asset/images/car.png";
import img_hotel from "../../../../asset/images/hotel-building.png";

const _typeIcon = { hotel: img_hotel, car: img_car, flight: img_plane }

class TripCard extends Component {
  state = {
    isExpand: false
  }

  handleExpand = () => {
    this.setState({ isExpand: !this.state.isExpand })
  }
  render() {
    const { type, index } = this.props;
    const { isExpand } = this.state;

    console.log('props..', this.props)
    return (
      <React.Fragment>
        <tr className= {index%2 ? "even": "odd"} onClick={this.handleExpand}>
          <td><img src={ _typeIcon[type]} alt={type}/></td>
          <td>New York (LGA) to Houston (IAH)</td>
          <td>New York City </td>
          <td>10/02/2018</td>
          <td>10/02/2018 <img src={img_Date }/> 10/26/2018</td>
          <td>$254.00</td> 
      </tr>
      <tr className={isExpand ? 'collapseRow': 'collapseRow collapse' }>
        <td colSpan="6">
            <div id="collapseOne" className="detailsShow" data-parent="#accordion" >
                <div className="d-flex flex-row">
                      <div className="flex-column flightDetails borderRight">
                          <h6>Your Departing Flight</h6>  
                          <p><img src={img_Airlines } /> Delta Airline</p>
                          <ul className="">
                              <li>
                                  <img src={ img_Departure} className="flightIcon"/>
                                  <img src={ img_Time} className="clockIcon"/>
                              </li>
                              <li>
                                  <span className="flightDate">Fri, Oct 17</span>
                                  <span className="flighTime">
                                      5.36pm <p>Stewart int (SWL)</p>
                                  </span>
                              </li>
                              <li><img src={img_Date } className="arrowDivied"/></li>
                              <li>
                                      <span className="flightRunTime"><p>(1 stop)</p> 5h 52m</span>
                                      <span className="flighTime">
                                          10.19pm <p>Stewart int (SWL)</p>
                                      </span>
                                  </li>
                          </ul>
                      </div>
                      <div className="flex-column flightDetails borderRight">
                              <h6>Your Returning Flight</h6>  
                              <p><img src={ img_Airlines}/> United Airline</p>
                              <ul className="">
                                  <li>
                                      <img src={img_Arrival } className="flightIcon"/>
                                      <img src={img_Time } className="clockIcon"/>
                                </li>
                                <li>
                                    <span className="flightDate">Fri, Oct 17</span>
                                    <span className="flighTime">
                                        5.36pm <p>Stewart int (SWL)</p>
                                    </span>
                                </li>
                                <li><img src={img_Date } className="arrowDivied"/></li>
                                <li>
                                        <span className="flightRunTime"><p>(1 stop)</p> 5h 52m</span>
                                        <span className="flighTime">
                                            10.19pm <p>Stewart int (SWL)</p>
                                        </span>
                                    </li>
                              </ul>
                      </div>
                      <div className="flex-column priceDetails">
                              <div className="d-flex justify-content-between OtherOptions">
                                  <div ><a><img src={ img_print}/></a><a><img src={img_socialClick }/></a></div> 
                                  <div className="calenderView"><a><img src={img_calend }/></a></div>
                                  <ul className="socialShare">
                                      <li><img src={ img_gmail}/></li>
                                      <li><img src={ img_whatsapp}/></li>
                                      <li><img src={img_google }/></li>
                                      <li><img src={ img_google}/></li>
                                  </ul>
                              </div>
                              <ul className="totalAmountDis">
                                      <li><span>Price Per person</span> <span>$214</span></li>
                                      <li><span>Passengers</span> <span>2</span></li>
                                      <li><span>Taxes &amp; Fees</span> <span>$22.00</span></li>
                                      <li><span>Total Cast</span> <span>$1225.45</span></li>
                              </ul>
                      </div>
                </div>                            
            </div>
          </td>
      </tr>
      </React.Fragment>        
    );
  }
}

export default TripCard;