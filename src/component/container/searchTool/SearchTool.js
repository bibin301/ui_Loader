import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import queryString from 'query-string'
import DateRangePicker from "react-daterange-picker";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import "react-daterange-picker/dist/css/react-calendar.css";

import { searchHotel } from "../../../service/hotel/action";
import img_packagesIcon from "../../../asset/images/Packages-Icon.png";
import img_Calendar from "../../../asset/images/Calendar.svg";
import img_SearchIcon from "../../../asset/images/Search Icon.png";
import img_progress from "../../../asset/images/under-construction.png";
import LocationSearch from "./LocationSearch";

const moment = extendMoment(originalMoment);
const today = moment();

const style={
  margin: "20px",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  width: "10%"
}
const staticBounds = {
  "bounds": {
    "rectangle": {
      "bottomRight": {
        "lat": 50.178005,
        "long": 3.921267
      },
      "topLeft": {
        "lat": 50.64359,
        "long": 2.635867
      }
    }
  },
}
class SearchTool extends React.Component {
  state = {
    searchPayload: null,
    activeTab: "hotels",
    value: moment.range(today.clone().subtract(1, "days"), today.clone().add(2, "days")),
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment()
      .add(3, "days")
      .format("YYYY-MM-DD"),
    isCalendar: false
  };

  getSearchInfo = searchPayload => {
    this.setState({ searchPayload });
  };

  _tabs = [
    { value: "flights", lable: "FLIGHTS", to: '/flight' },
    { value: "hotels", lable: "HOTELS", to: '/hotel' },
    { value: "cars", lable: "CARS", to: '/car' },
    { value: "activities", lable: "ACTIVITIES", to: '/activity' },
    { value: "packages", lable: "PACKAGES", to: '/package', refimg: img_packagesIcon }
  ];

  getToday = () => {
    return moment().format("YYYY-MM-DD");
  };

  handleSearch = () => {
    this.setState({ isCalendar: false });
    const { searchPayload, startDate, endDate } = this.state;
    const searchInfo = {
      ...searchPayload,
      date: {
        start: startDate,
        end: endDate
      }
    };
    const searchString = {
      checkin: startDate,
      checkout: endDate,
      searchText: searchPayload.searchString
    }
    this.props.history.push('/hotel/search?'+ queryString.stringify(searchString))
    // this.props.searchHotel(searchInfo);
  };

  handleStartDate = e => {
    this.setState({
      isCalendar: true,
      startDate: e.target.value,
      endDate: e.target.value
    });
  };

  handleEndDate = e => {
    this.setState({
      isCalendar: true,
      endDate: e.target.value
    });
  };

  onSelect = (value, states) => {
    this.setState({
      value,
      startDate: moment(value.start._d).format("YYYY-MM-DD"),
      isCalendar: false,
      endDate: moment(value.end._d).format("YYYY-MM-DD")
    });
  };

  render() {
    const { activeTab } = this.state;
    return (
      <div className="mb-3">
        <ul className="tabs">
          {this._tabs.map((each, i) => (
            <li
              key={i}
              className={
                this.props.path === each.to ? "tab-link current" : "tab-link"
              }
              onClick={() => this.props.history.push(each.to)}
              data-tab="tab-1">
              {each.lable}
              {each.refimg && <img src={each.refimg} width="20px" alt="" />}
            </li>
          ))}
          <li className="tab-link">
            <i className="fas fa-chevron-right" />
          </li>
        </ul>

        <div id="tab-2" className="tab-content current">
          {this.renderContent()}
        </div>
      </div>
    );
  }
  renderContent = () => {
    const { activeTab, startDate, endDate, isCalendar } = this.state;
    switch (this.props.path) {
      case this._tabs[1].to:
        return (
          <React.Fragment>

            <h3 className="tabHeadText">Search and Save on Hotels</h3>
            <div className="selectDivsAl">
              <div className="form-group">
                <div className="seleboxs">
                  <LocationSearch onSearch={this.getSearchInfo} />
                  {/* <input type="text" className="" placeholder="Where ?" /> */}
                  <i className="fas fa-map-marker-alt locationIcon" onClick={() => this.getSearchInfo(staticBounds)} />
                </div>
              </div>
              <div className="form-group d-flex flex-row">
                <div className="seleboxs1 flex-column">
                  <img src={img_Calendar} className="calendImg" alt="" />
                  <input
                    type="text"
                    className="dateInput borderRig"
                    placeholder="Sat,Oct 20"
                    onChange={this.handleStartDate}
                    value={startDate}
                    min={this.getToday()}
                    onFocus={() => this.setState({ isCalendar: true })}
                  />
                  <input
                    type="text"
                    className="dateInput"
                    placeholder="Fri,Oct 26"
                    onChange={this.handleEndDate}
                    value={endDate}
                    min={startDate}
                    onFocus={() => this.setState({ isCalendar: true })}
                  />
                  {isCalendar && <DateRangePicker
                    value={this.state.value}
                    onSelect={this.onSelect}
                    numberOfCalendars={2}
                  />}
                </div>
                <div className="seleboxs2 d-flex flex-row justify-content-center">
                  <div className="roomSelection">
                    <h6>Rooms</h6>
                    <ul>
                      <li className="active">
                        <a href="#">1</a>
                      </li>
                      <li>
                        <a href="#">2</a>
                      </li>
                      <li>
                        <a href="#">3</a>
                      </li>
                      <select style={{
                        width: '35px',
                        height: '30px',
                        border: 'none',
                        borderRadius: '50px',
                        padding: '3px 0px',
                        background: true ? 'none' : '#fec637',
                      }}>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                      </select>
                    </ul>
                  </div>
                  <div className="guestSelection">
                    <h6>Guests</h6>
                    <ul>
                      <li>
                        <a href="#">1</a>
                      </li>
                      <li className="active">
                        <a href="#">2</a>
                      </li>
                      <li>
                        <a href="#">3</a>
                      </li>
                      <select style={{
                        width: '35px',
                        height: '30px',
                        border: 'none',
                        borderRadius: '50px',
                        padding: '3px 0px',
                        background: true ? 'none' : '#fec637',
                      }}>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                      </select>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button
                type="button"
                className="searchBtn"
                onClick={this.handleSearch}
              >
                Search <img src={img_SearchIcon} alt="" />
              </button>
            </div>
          </React.Fragment>
        );
      default:
        return <React.Fragment>
            <div style={{ textAlign: "center" }}>
              <img src={img_progress} style={style} />
              <div className= "noHotelText"> 
                {this._tabs.find(each => each.to === this.props.path)["lable"]} PAGES ARE UNDER CONSTRUCTION 
              </div>
            </div>
          </React.Fragment>;
    }
  };
}
SearchTool.propTypes = {
  // onSearch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isSearching: state.hotelReducer.isSearching
});
const mapDispatchToProps = dispatch => ({
  searchHotel: searchInfo => dispatch(searchHotel(searchInfo))
});
export default
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(SearchTool));
