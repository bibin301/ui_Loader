import React, { Component } from "react";
import moment from "moment";
import { find as _find, map as _map } from "lodash";
import HotelBookingProtection from "./HotelBookingProtection";
import Payment from "./Payment";
import img_parking from "../../asset/images/selectRoom/parking-sign(1).png";
import img_hotcoffee from "../../asset/images/selectRoom/hot-coffee.png";
import img_bannerImg from "../../asset/images/bannerImg.jpg";
import img_Time from "../../asset/images/Time.svg";
import img_DateArrow from "../../asset/images/Date Arrow.png";
import img_WhereIcon from "../../asset/images/Where Icon (Map Marker).svg";
import UserRating from "./UserRating";
import { sumBy as _sumBy } from "lodash";
import img_bussiness from "../../asset/images/bussiness.png";
import img_bar from "../../asset/images/glass.png";
import img_laundry from "../../asset/images/laundry.png";
import img_swmmingPool from "../../asset/images/swimming-silhouette.png";
import img_television from "../../asset/images/television.png";
import img_unknown from "../../asset/images/unknown.png";
import ImageCarousel from "../../component/presentational/ImageCarousel";

class RoomReservation extends Component {
  static defaultProps = {
    isReview: false
  };

  render() {
    const {
      isReview,
      hotel,
      fareBreakup,
      bookingDate,
      room,
      checkinCheckoutPolicy,
      isCancellation,
      cancellationPolicy,
      togglecancellation
    } = this.props;
    const locationRef = `https://maps.google.com/?q=${hotel.geocode.lat},${
      hotel.geocode.long
      }`;
    const {
      line1,
      line2,
      city,
      countryCode,
      postalCode
    } = hotel.contact.address;
    const detailedAddress =
      line1 +
      ", " +
      line2 +
      ", " +
      city.name +
      ", " +
      countryCode +
      ", " +
      postalCode;
    const stDt = moment(bookingDate.start, "YYYY-MM-DD");
    const endDt = moment(bookingDate.end, "YYYY-MM-DD");
    const stayDt = endDt.diff(stDt, "days");
    return (
      <div>
        <div className="selectRoomBg d-flex flex-wrap">
          <div className="selectRoomTitle">
            <h4>Confirm your reservation</h4>
            <button style={{ float: 'right' }} onClick={() => window.open(window.location, '_blank')} >Open in new tab</button>
          </div>
          <div className="selectRoomItemsBg d-flex flex-row">
            <div className="flex-column confirmRoomLeft">
              {hotel.images.length ? (
                <ImageCarousel
                  imageList={_map(hotel.images, each => ({
                    name: each.imageCaption,
                    url: each.URL
                  }))}
                />
              ) : (
                  <ImageCarousel />
                )}
              {/* <img src={img_bannerImg} alt="" /> */}
              <div className="d-flex flex-row">
                <div className="flex-column">
                  <ul>
                    {hotel.amenities.map((item, i) => {
                      return (
                        i % 2 === 0 && i < 10 ?
                          <li key={i}>
                            <img
                              src={
                                item.category
                                  ? _find(_amenties, ["category", item.category])[
                                  "icon"
                                  ]
                                  : img_unknown
                              }
                              alt=""
                            />
                            {item.name}
                          </li> : null
                      );
                    })}
                  </ul>
                </div>
                <div className="flex-column">
                  <ul>
                    {hotel.amenities.map((item, i) => {
                      return (
                        i % 2 !== 0 && i < 11 ?
                          <li key={i}>
                            <img
                              src={
                                item.category
                                  ? _find(_amenties, ["category", item.category])[
                                  "icon"
                                  ]
                                  : img_unknown
                              }
                              alt=""
                            />
                            {item.name}
                          </li> : null
                      );
                    })}
                  </ul>
                </div>
              </div>
              <h6>
                Reservation & Cancellation Policy{" "}
                <i
                  className="fas fa-angle-double-down"
                  onClick={togglecancellation}
                />
              </h6>
              {isCancellation && <p>{cancellationPolicy}</p>}
            </div>
            <div className="flex-column confirmRoomRight">
              <UserRating rating={hotel.rating} />
              <div>
                <h4>{hotel.name}</h4>
                <p>
                  <img src={img_WhereIcon} />
                  <a href={locationRef} target="_blank" rel="noreferrer">
                    {detailedAddress}
                  </a>
                </p>
                <h6>{room && room[0] && room[0].name}</h6>

                <span>Booking for {stayDt} Nights</span>
                <ul>
                  <li className="border">
                    <h5>
                      {moment(bookingDate.start)
                        .format("MMM DD")
                        .toUpperCase()}
                    </h5>
                    <p>{moment(bookingDate.start).format("dddd")}</p>
                  </li>
                  <li>
                    <img src={img_DateArrow} />
                  </li>
                  <li className="border">
                    <h5>
                      {moment(bookingDate.end)
                        .format("MMM DD")
                        .toUpperCase()}
                    </h5>
                    <p>{moment(bookingDate.end).format("dddd")}</p>
                  </li>
                </ul>
                <ul className="checkInOut">
                  <li>
                    <img src={img_Time} />
                    <span>
                      Check In{" "}
                      <b>
                        {checkinCheckoutPolicy.length > 0
                          ? checkinCheckoutPolicy[0].inTime
                          : "12.00am"}
                      </b>
                    </span>
                  </li>
                  <li>
                    <img src={img_Time} />
                    <span>
                      Check Out{" "}
                      <b>
                        {checkinCheckoutPolicy.length > 0
                          ? checkinCheckoutPolicy[0].outTime
                          : "06.00pm"}
                      </b>
                    </span>
                  </li>
                </ul>
                <ul className="totalAmountDis">
                  {/* <li><span>Standard Room, 1 King</span> <span>${(fareBreakup.baseFare / stayDt).toFixed(2)}/night</span></li> */}
                  <li>
                    <span /> <span />
                  </li>
                  <li>
                    <span>{stayDt}Nights</span>{" "}
                    <span>${fareBreakup.baseFare}</span>
                  </li>
                  <li>
                    <span>Taxes & Fees</span>{" "}
                    <span>${_sumBy(fareBreakup.taxes, "amount")}</span>
                  </li>
                  <li>
                    <span>Total Cost</span>{" "}
                    <span>${fareBreakup.totalFare}</span>
                  </li>
                </ul>
                {isReview && (
                  <div className="mt-2">
                    <button type="button" className="searchBtn addIteinary">
                      Add to Itinerary
                    </button>
                    <button type="button" className="searchBtn continueBook">
                      Continue Booking
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {!isReview && (
          <React.Fragment>
            <div className="d-flex flex-wrap otherSectionBg">
              <HotelBookingProtection tripAmount={fareBreakup.totalFare} />
            </div>

            <div className="d-flex flex-wrap otherSectionBg">
              <Payment />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default RoomReservation;

const _amenties = [
  {
    category: "Breakfast",
    icon: img_hotcoffee
  },
  {
    category: "Business Center",
    icon: img_bussiness
  },
  {
    category: "Laundry Services",
    icon: img_laundry
  },
  {
    category: "Bar",
    icon: img_bar
  },
  {
    category: "Swimming Pool",
    icon: img_swmmingPool
  },
  {
    category: "Parking",
    icon: img_parking
  },
  {
    category: "Television",
    icon: img_television
  },
  {
    category: "Currency Exchange",
    icon: img_unknown
  },
  {
    category: "Airport Shuttle",
    icon: img_unknown
  },
  {
    category: "Internet",
    icon: img_unknown
  },
  {
    category: "Non Smoking",
    icon: img_unknown
  },
  {
    category: "Restaurant",
    icon: img_unknown
  },
  {
    category: "Fitness Facility",
    icon: img_unknown
  }
];
