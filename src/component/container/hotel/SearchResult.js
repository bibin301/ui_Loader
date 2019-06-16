import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import img_down from '../../../asset/images/downarrow.png';
import { searchRoom, searchHotel, filterHotelLoadMore } from '../../../service/hotel/action';
import HotelCard from "../../presentational/HotelCard";
import AlertHotelCard from "../../presentational/AlertHotelCard";

class SearchResult extends React.Component {
  componentDidMount() {
    if (!this.props.sessionId) {
      this.getHotelList(this.props.location)
    }
  }
  componentWillReceiveProps(newProps) {
    if (this.props.location !== newProps.location) {
      this.getHotelList(newProps.location)
    }
  }

  getHotelList = location => {
    const values = queryString.parse(location.search)
    console.log(values.searchText) // "top"
    console.log(values.checkin) // "im"
    console.log(values.checkout) // "im"
    const { searchText, checkin, checkout } = values;
    const searchInfo = {
      searchString: searchText,
      date: {
        start: checkin,
        end: checkout
      }
    };
    this.props.searchHotel(searchInfo);
  }
  handleOnSelectRoom = hotelId => {
    const { sessionId, currency } = this.props;
    const searchString = {
      currency,
      sessionId,
      hotelId,
    }
    this.props.searchRoom(sessionId, hotelId)
    this.props.history.push('/hotel/rooms?' + queryString.stringify(searchString));
  }


  getMoreHotel = () => {
    const { sessionId, searchPrice, pageSize } = this.props;
    const PerpageSize = pageSize + 10;
    this.props.filterHotelLoadMore(sessionId, searchPrice, PerpageSize);
  }
  render() {
    const { hotelList, hotelCount, pageSize } = this.props;

    return (
      <React.Fragment>
        <div className='cardDetailsHowBg'>
          <button onClick={() => window.open(window.location, "_blank")}>Open in new tab</button>
          {hotelList.length && this.props.isSearchingFilter ? <div className="loaderbg1"><div id="loader"></div></div> : null}
          {hotelList.length
            ? hotelList.map((hotel, index) =>
              <HotelCard
                key={index}
                onSelectHotel={this.handleOnSelectRoom}
                hotel={hotel} />)
            : <AlertHotelCard
              alertInfo="No Hotels Available" />}
        </div>
        {hotelList.length === pageSize && hotelCount && (hotelCount / 10 > pageSize / 10) ?
          <div className="text-center"><button type='button' className='clickMoreBtn searchBtn' onClick={this.getMoreHotel}><img src={img_down} alt='down' /></button> </div> : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  hotelList: state.hotelReducer.hotelList,
  hotelCount: state.hotelReducer.hotelCount,
  sessionId: state.hotelReducer.sessionId,
  searchPrice: state.hotelReducer.searchPrice,
  currency: state.hotelReducer.currency,
  pageSize: state.hotelReducer.pageSize
});
const mapDispatchToProps = dispatch => ({
  searchHotel: searchInfo => dispatch(searchHotel(searchInfo)),
  searchRoom: (sessionId, hotelId) => dispatch(searchRoom(sessionId, hotelId)),
  filterHotelLoadMore: (sessionId, searchPrice, PerpageSize) => dispatch(filterHotelLoadMore(sessionId, searchPrice, PerpageSize))
})
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResult));