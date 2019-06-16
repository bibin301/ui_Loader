import React, { Component } from "react";
import queryString from "query-string";
import {
  searchRoom,
  getRoomPrice,
  searchRoomStateless
} from "../../../service/hotel/action";
import { connect } from "react-redux";
import { extendMoment } from "moment-range";
import img_calendar from "../../../asset/images/Calendar.svg";
import RoomCard from "../../presentational/RoomCard";
import AlertHotelCard from "../../presentational/AlertHotelCard";
import originalMoment from "moment";
import searchIcon from "../../../asset/images/Search Icon.png";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";

const moment = extendMoment(originalMoment);
const today = moment();

class RoomContent extends Component {
  state = {
    adult: 1,
    room: "",
    child: "",
    startDate: this.props.searchDate.start,
    endDate: this.props.searchDate.end,
    value: moment.range(this.props.searchDate.start, this.props.searchDate.end),
    isCalendar: false
  };

  componentDidMount() {
    if (!this.props.sessionId) {
      this.getRoomList(this.props.location);
    }
  }
  componentWillReceiveProps(newProps) {
    if (this.props.location !== newProps.location) {
      this.getRoomList(newProps.location);
    }
  }

  getRoomList = location => {
    const { hotelId, sessionId, currency } = queryString.parse(location.search);

    this.props.searchRoom(sessionId, hotelId, currency);
  };

  getToday = () => {
    return moment().format("YYYY-MM-DD");
  };
  handleStartDate = e => {
    this.setState({
      isCalendar: true
      // startDate: e.target.value
    });
  };

  handleEndDate = e => {
    this.setState({
      isCalendar: true
      // endDate: e.target.value
    });
  };

  handleOnReserve = recommendations => {
    const { sessionId, hotel, getRoomPrice, currency } = this.props;
    // getRoomPrice(sessionId, hotel.id, recommendations.id, currency);
    const searchString = {
      sessionId,
      currency,
      hotelId: hotel.id,
      recommendationsId: recommendations.id,
    }
    // this.props.history.push("/hotel/reservation");
    this.props.history.push("/hotel/reservation?"+ queryString.stringify(searchString));
  };

  handleGuest = event => {
    this.setState({ adult: event.target.value });
  };
  handleRoom = event => {
    this.setState({ room: event.target.value });
  };
  handleChild = event => {
    this.setState({ child: event.target.value });
  };
  onSelect = (value, states) => {
    this.setState({
      value,
      startDate: moment(value.start._d).format("YYYY-MM-DD"),
      isCalendar: false,
      endDate: moment(value.end._d).format("YYYY-MM-DD")
    });
  };

  toggleShowCal = () => {
    this.setState({ isCalendar: true });
  }

  handle = () => {
    const { hotel, searchRoomStateless } = this.props;
    const { startDate, endDate, adult, room, child } = this.state;

    const payload = {
      stayPeriod: {
        start: startDate,
        end: endDate
      },
      hotelId: hotel.id,
      adult: {
        type: "adult",
        count: adult
      },
      child: {
        type: "child",
        count: child
      }
    };
    searchRoomStateless(payload);
  };

  render() {
    const {
      roomList,
      roomRates,
      roomRecommendations,
      searchDate: { start, end }
    } = this.props;
    const { startDate, endDate, adult, room, child, isCalendar } = this.state;
    return (
      <div className="selectRoomBg d-flex flex-wrap">
        <div className="selectRoomTitle">
          <h4>Select your room</h4>
          <button style={{ float: 'right' }} onClick={() => window.open(window.location, '_blank')} >Open in new tab</button>
        </div>
        <div className="selectRoomItemsBg">
          <div className="d-inline-flex flex-row">
            <div className="seleboxs1 flex-column">
              <img src={img_calendar} className="calendImg" />
              <input
                type="text"
                className="borderRight"
                placeholder="Sat,Oct 20"
                onChange={this.handleStartDate}
                value={startDate}
                // min={this.getToday()}
                onFocus={this.toggleShowCal}
              />
              <input
                type="text"
                className=""
                placeholder="Fri,Oct 26"
                onChange={this.handleEndDate}
                value={endDate}
                min={startDate}
                onFocus={this.toggleShowCal}
              />
              {isCalendar &&
                <DateRangePicker
                  value={this.state.value}
                  onSelect={this.onSelect}
                  numberOfCalendars={2}
                />
              }
            </div>
            <div className="selectDivsAl">
              {/* <div className="form-group">
                <select
                  className=""
                  value={this.state.room}
                  onChange={this.handleRoom}
                >
                  <option disabled value=''>Room</option>
                  <option value="1">1 Room </option>
                  <option value="2">2 Rooms </option>
                  <option value="3">3 Rooms </option>
                  <option value="4">4 Rooms </option>
                </select>
              </div> */}
              <div className="form-group">
                <select
                  className=""
                  value={this.state.adult}
                  onChange={this.handleGuest}
                >
                  <option disabled value="">
                    Adult
                  </option>
                  <option value="1">1 Adult </option>
                  <option value="2">2 Adults </option>
                  <option value="3">3 Adults </option>
                  <option value="4">4 Adults </option>
                </select>
              </div>
              <div className="form-group">
                <select
                  className=""
                  value={this.state.child}
                  onChange={this.handleChild}
                >
                  <option disabled value="">
                    Child
                  </option>
                  <option value="1">1 Child </option>
                  <option value="2">2 children </option>
                  <option value="3">3 children </option>
                  <option value="4">4 children </option>
                </select>
              </div>
              <button
                type="button"
                className="searchBtn search-room"
                onClick={this.handle}
              >
                <img src={searchIcon} title="Search Room" alt="search Room" />
              </button>
            </div>
          </div>
          {roomList.length ? (
            roomList.map((room, index) => (
              <RoomCard
                key={index}
                refId={room.refId}
                room={room}
                rate={roomRates[index]}
                recommendations={roomRecommendations[index]}
                onReserve={() =>
                  this.handleOnReserve(roomRecommendations[index])
                }
              />
            ))
          ) : (
              <AlertHotelCard alertInfo="No Rooms Available" />
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currency: state.hotelReducer.currency,
  sessionId: state.hotelReducer.sessionId,
  hotel: state.hotelReducer.hotel,
  roomList: state.hotelReducer.roomList,
  roomRates: state.hotelReducer.rateList,
  searchDate: state.hotelReducer.searchDate,
  roomRecommendations: state.hotelReducer.recommendations
});

const mapDispatchToProps = dispatch => ({
  searchRoom: (sessionId, hotelId) => dispatch(searchRoom(sessionId, hotelId)),
  getRoomPrice: (sessionId, hotelId, recommendationsId, currency) =>
    dispatch(getRoomPrice(sessionId, hotelId, recommendationsId, currency)),
  searchRoomStateless: (startDate, endDate, hotel, adult, child) =>
    dispatch(searchRoomStateless(startDate, endDate, hotel, adult, child))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomContent);
