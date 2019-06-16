import React, { Component } from "react";
import { connect } from "react-redux";
import { filterHotel } from "../../service/hotel/action";
import img_star5 from "../../asset/images/star5.png";
import img_star4 from "../../asset/images/star4.png";
import img_star3 from "../../asset/images/star3.png";
import img_star2 from "../../asset/images/star2.png";
import img_star1 from "../../asset/images/star1.png";
import img_block from "../../asset/images/block.png";
import img_wifi from "../../asset/images/wifi.png";
import img_parking from "../../asset/images/parking-sign.png";
import img_minibus from "../../asset/images/minibus.png";
import img_breakfast from "../../asset/images/breakfast.png";
import img_onlinebooking from "../../asset/images/online-booking.png";
import InputRange from "react-input-range";
import "../../component/container/Result.css";

class ResultFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        min: 0,
        max: 10000
      },
      isRating: [false, false, false, false, false],
      ratStar: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchPrice !== this.props.searchPrice) {
      this.setState({ values: nextProps.searchPrice });
    }
    if (
      nextProps.isHotelRest !== this.props.isHotelRest &&
      nextProps.isHotelRest == true
    ) {
      let isRating = [...this.state.isRating];
      for (let i = 0; i < 5; i++) {
        isRating[i] = false;
      }
      this.setState({ isRating });
    }
  }

  handleChange = value => {
    if (value.min >= 0 && value.max <= 10000) {
      this.setState({ values: value });
    }
  };

  getFilterResult = value => {
    this.getFilterInfo(value);
  };

  getFilterInfo = value => {
    const payload = {
      price: {
        min: value.min,
        max: value.max
      }
    };
    const { minHotelRating, maxHotelRating } = this.props;
    this.props.filterHotel(
      this.props.sessionId,
      payload.price,
      minHotelRating,
      maxHotelRating
    );
  };

  toggleRating = e => {
    let ratStar = e.target.name;
    var isRating = [...this.state.isRating];
    for (let i = 4; i >= 0; i--) {
      if (ratStar - 1 >= i) {
        isRating[i] = true;
      } else {
        isRating[i] = false;
      }
    }
    isRating = isRating.reverse();
    this.setState({ isRating, ratStar });
    const payload = {
      price: {
        min: this.state.values.min,
        max: this.state.values.max
      }
    };
    this.props.filterHotel(this.props.sessionId, payload.price, 1, ratStar);
  };

  _filterRatingList = [
    { label: "5 Stars", value: 5, refImg: img_star5 },
    { label: "4 Stars", value: 4, refImg: img_star4 },
    { label: "3 Stars", value: 3, refImg: img_star3 },
    { label: "2 Stars", value: 2, refImg: img_star2 },
    { label: "1 Stars", value: 1, refImg: img_star1 }
  ];

  _defAccomodation = [
    { label: "Hotel", value: "Hotel" },
    { label: "Motel", value: "Hotel" },
    { label: "Apart-Hotel", value: "Hotel" },
    { label: "TownHouse", value: "Hotel" },
    { label: "VacationHouse", value: "Hotel" }
  ];

  _defNghood = [
    { label: "NewYork (and Vicinity)", value: "NewYorkandVicinity" },
    { label: " Manhattan", value: "Manhattan" },
    { label: " Brooklyn", value: "Brooklyn" },
    { label: " Queens", value: "Queens" },
    { label: " Midtown", value: "Midtown" },
    { label: " Long Istland City", value: "LongIstlandCity" }
  ];

  _defAmenities = [
    {
      label: "Free Cancellation",
      value: "FreeCancellation",
      refImg: img_block
    },
    { label: "Free Wifi", value: "FreeWifi", refImg: img_wifi },
    { label: "Free parking", value: "Freeparking", refImg: img_parking },
    {
      label: "Free Airport Shuttle",
      value: "FreeAirportShuttle",
      refImg: img_minibus
    },
    {
      label: "Breakfast Included",
      value: "BreakfastIncluded",
      refImg: img_breakfast
    },
    {
      label: "Reseve Now, Pay Later",
      value: "ReseveNowPayLater",
      refImg: img_onlinebooking
    }
  ];
  render() {
    const { isRating } = this.state;
    return (
      <div className="filterBg flex-column align-self-start">
        <h2>FILTER BY</h2>
        <div>
          <h4>Price Range</h4>
          <div className="slideRange">
            <InputRange
              maxValue={10000}
              minValue={0}
              formatLabel={value => ``}
              onChangeComplete={value => this.getFilterResult(value)}
              onChange={value => this.handleChange(value)}
              value={this.state.values}
            />
          </div>
          <span className="rangeVauleLeft">${this.state.values.min}</span>
          <span className="rangeVauleRight">${this.state.values.max}</span>
        </div>
        <div>
          <h4> Star Rating</h4>
          <ul className="priceRange">
            {this._filterRatingList.map((each, i) => (
              <li key={i}>
                <input
                  className="filtercheckbox"
                  id={`priceRange_${i}`}
                  type="checkbox"
                  name={each.value}
                  value=""
                  checked={isRating[i]}
                  onChange={this.toggleRating}
                />
                <label htmlFor={`priceRange_${i}`}>
                  <img alt="" src={each.refImg} />
                  {each.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
        {/* <div>
          <h4>Accomodation Type</h4>
          <ul>
            {this._defAccomodation.map((each, i) => (
              <li key={i}>
                <input
                  type="checkbox"
                  id={`acc_${i}`}
                  name={each.value}
                  className="filtercheckbox"
                  value=""
                />
                <label htmlFor={`acc_${i}`}>{each.label}</label>
              </li>
            ))}
          </ul>
        </div> */}
        <div>
          <h4>Neighborhood</h4>
          <ul>
            {this._defNghood.map((each, i) => (
              <li key={i}>
                <input
                  type="checkbox"
                  id={`nghood_${i}`}
                  name={each.value}
                  className="filtercheckbox"
                  value=""
                />
                <label htmlFor={`nghood_${i}`}>{each.label}</label>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Amenities</h4>
          <ul>
            {this._defAmenities.map((each, i) => (
              <li key={i}>
                <input
                  type="checkbox"
                  id={`ament_${i}`}
                  name={each.value}
                  className="filtercheckbox"
                  value=""
                />
                <label htmlFor={`ament_${i}`}>
                  <img alt="" src={each.refImg} />
                  {each.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sessionId: state.hotelReducer.sessionId,
  searchPrice: state.hotelReducer.searchPrice,
  minHotelRating: state.hotelReducer.minHotelRating,
  maxHotelRating: state.hotelReducer.maxHotelRating,
  isHotelRest: state.hotelReducer.isHotelRest
});
const mapDispatchToProps = dispatch => ({
  filterHotel: (sessionId, price, minHotelRating, maxHotelRating) =>
    dispatch(filterHotel(sessionId, price, minHotelRating, maxHotelRating))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultFilter);
