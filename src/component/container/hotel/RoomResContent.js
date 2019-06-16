import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import {
  getRoomPrice
} from "../../../service/hotel/action";
import RoomReservation from "../../presentational/RoomReservation";

class RoomResContent extends Component {
  state = {
    isCancellation: false
  }
  componentDidMount() {
    // console.log('res init..')
    // here we should check hotel ID before rendering
    if(!this.props.sessionId || !this.props.isReserve){
      // console.log('res init.. HIT>>>')
      this.getResInfo(this.props.location)
    }
  }
  componentWillReceiveProps(newProps) {
    // console.log('res recProp..')
    if(this.props.location !== newProps.location){
      // console.log('res recProp.. HIT')
      this.getResInfo(newProps.location)
    }
  }

  getResInfo = location => {
    const values = queryString.parse(location.search)
    const { sessionId, currency, hotelId, recommendationsId } = values;
    this.props.getRoomPrice(sessionId, hotelId, recommendationsId, currency);
  }

  togglecancellation = () => {
    this.setState({ isCancellation: !this.state.isCancellation });
  }

  render() {
    const { hotel, searchDate, fareBreakup, rooms,
      rates } = this.props;
    const { isCancellation } = this.state;
    console.log('RoomResContent...', rooms, searchDate, hotel && rates && rates.length, hotel, rates)
    return (
      <div>
        {hotel && rates && rates.length && <RoomReservation
          hotel={hotel}
          fareBreakup={fareBreakup}
          room={rooms}
          checkinCheckoutPolicy={hotel.checkinCheckoutPolicy}
          cancellationPolicy={rates[0].cancellationPolicy.text}
          bookingDate={searchDate}
          togglecancellation={this.togglecancellation}
          isCancellation={isCancellation} />}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  hotel: state.hotelReducer.hotel,
  isReserve: state.hotelReducer.isReserve,
  sessionId: state.hotelReducer.sessionId,
  searchDate: state.hotelReducer.searchDate,
  pricedTotalFare: state.hotelReducer.pricedTotalFare,
  quotedTotalFare: state.hotelReducer.quotedTotalFare,
  fareBreakup: state.hotelReducer.fareBreakup,
  pricedRooms: state.hotelReducer.pricedRooms,
  rates: state.hotelReducer.rates,
  requestedOccupancies: state.hotelReducer.requestedOccupancies,
  roomOccupancies: state.hotelReducer.roomOccupancies,
  rooms: state.hotelReducer.rooms,
});

const mapDispatchToProps = dispatch => ({
  getRoomPrice: (sessionId, hotelId, recommendationsId, currency) =>
    dispatch(getRoomPrice(sessionId, hotelId, recommendationsId, currency)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RoomResContent));
