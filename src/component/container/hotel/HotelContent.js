import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { connect } from "react-redux";
import RoomContent from './RoomContent';
import RoomResContent from './RoomResContent';
import HotelNavBanner from "./HotelNavBanner";
import SearchResult from './SearchResult';

class HotelContent extends Component {

  render() {
    return (
      <div>
        <HotelNavBanner />
        {!this.props.isSearching && <Switch>
          <Route key='hotel' exact path="/hotel/search" component={SearchResult} />
          <Route key='room' exact path="/hotel/rooms" component={RoomContent} />
          <Route key='reservation' exact path="/hotel/reservation" component={RoomResContent} />
        </Switch>}
      </div>
    );
  }

}

const mapStateToProps = state => ({
  isSearching: state.hotelReducer.isSearching
});


export default withRouter(connect(
  mapStateToProps,
  null
)(HotelContent));
