import React, { Component } from 'react';
import img_tabelarrow from '../../../asset/images/dashboard/tabelarrow.png'
import img_gmail from "../../../asset/images/dashboard/gmail.png";
import img_whatsapp from "../../../asset/images/dashboard/whatsapp.png";
import img_google from "../../../asset/images/dashboard/google-plus.png";
import img_calend from "../../../asset/images/dashboard/calend.png";
// import img_facebook from "../../../asset/images/dashboard/facebook.png";
import img_print from "../../../asset/images/dashboard/print.png";
import img_socialClick from "../../../asset/images/dashboard/socialClick.png";
import img_plane from "../../../asset/images/plane.png";
import img_Date from "../../../asset/images/Date Arrow.png";
import img_Departure from "../../../asset/images/Departure.svg";
import img_Time from "../../../asset/images/Time.svg"; 
import img_Airlines from "../../../asset/images/United-Airlines.png";
import img_car from "../../../asset/images/car.png";
import img_hotel from "../../../asset/images/hotel-building.png";
import img_Arrival from "../../../asset/images/Arrival.svg"
import TripCard from './trips/TripCard'
class DBTrips extends Component {
  render() {
    return (
      <div className="dashRightSide align-self-start" >
      <div className="mytripTable">
            <table >
                <thead>
                  <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Date Booked <img src={img_tabelarrow}/> </th>
                    <th>Travel Date <img src={img_tabelarrow}/> </th>
                    <th>Price <img src={img_tabelarrow}/> </th>
                  </tr>
                </thead>
                <tbody id="accordion">
                    <TripCard index='0' type={'hotel'}/>
                    <TripCard index='1' type={'car'}/>            
                    <TripCard index='2' type={'flight'}/>            
                </tbody>
            </table>
      </div>
  </div>

    );
  }
}

export default DBTrips;