import React, { Component } from "react";
import moment from 'moment';
import { connect } from "react-redux";
import img_DateArrow from "../../../asset/images/Date Arrow.png";
class SearchBanner extends Component {
  render() {
    const { hotelCount, searchDate: { start, end } } = this.props;

    return (
      <div>
        {!!hotelCount && (
          <div className="sectionCard searchRes">
            <div className="text-center searchInfo">
              <h3> {hotelCount} hotels available from</h3>
              <ul>
                <li className="border">
                  <h5>{moment(start).format('MMM DD').toUpperCase()}</h5>
                  <p>{moment(start).format('dddd')}</p>
                </li>
                <li>
                  <img src={img_DateArrow} alt="" />
                </li>
                <li className="border">
                <h5>{moment(end).format('MMM DD').toUpperCase()}</h5>
                <p>{moment(end).format('dddd')}</p>
              </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  hotelCount: state.hotelReducer.hotelCount,
  searchDate: state.hotelReducer.searchDate,
});
export default connect(mapStateToProps, null)(SearchBanner);
