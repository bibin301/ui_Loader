import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import ImageCarousel from '../presentational/ImageCarousel';
import UserRating from './UserRating';

import img_yellowstars from "../../asset/images/yellowstars.png";
import img_whereIcon from "../../asset/images/Where Icon (Map Marker).svg";
class HotelCard extends Component {
  render() {
    const { hotel } = this.props;
    const locationRef = `https://maps.google.com/?q=${hotel.geocode.lat},${hotel.geocode.long}`
    const detailedAddress = hotel.contact.address.line1 + ", " + hotel.contact.address.line2 + ", " + hotel.contact.address.city.name + ", " + hotel.contact.address.countryCode + ", " + hotel.contact.address.postalCode;
    const actualFare = hotel.fare.totalFare.toFixed(2);
    // const disFare = `$ ${hotel.fare.baseFare} + ${hotel.fare.taxes[0].amount}`;
    const descriptions= hotel.descriptions[0] ? hotel.descriptions[0] : "No Description avaliable"

    return <div className="sectionCard">
        <div className="d-flex flex-row">
          <ImageCarousel />

          <div className="detailsBg flex-column">
            <UserRating rating={hotel.rating} />
            <h4>{hotel.name}</h4>
            <p>
              <img src={img_whereIcon} alt="" /><a href={locationRef} target='_blank' rel="noreferrer">{detailedAddress}</a>
            </p>
            <p>
              {" "}
              {descriptions}
            </p>
          </div>
          <div className="rateShowDiv flex-column">
            <div className="priceDiv">
              {/* <strike>${hotel.fare.baseFare}</strike> */}
              <h2>${actualFare.split('.')[0]}</h2>
              <p>per night</p>
            </div>
            <button type="button" onClick={() =>this.props.onSelectHotel(hotel.id)} className="selectRoomBtn">
              Select Room
            </button>
          </div>
        </div>
      </div>;
  }
}

export default withRouter(HotelCard);