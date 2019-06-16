import React, { Component } from 'react';
import { browserHistory, withRouter } from 'react-router-dom';
import  img_RightArrow from "../../../asset/images/Right Arrow - All Steps.png";
import  img_LeftArrow  from "../../../asset/images/Left Arrow - All Steps.png";
class HotelNavBanner extends Component {
  render() {
    const { pathname } = this.props.history.location;

    return (
      <div className="sectionCard">
      <ul className="navigation">
        <li ><img src={img_LeftArrow} alt="" onClick={() => this.props.history.goBack()}/></li>
        <li className={`line ${pathname === '/hotel/search' ? 'active': ''}`}>
          <span>Select Hotel</span><a href="#">1</a>
        </li>
        <li className={`line ${pathname === '/hotel/rooms' ? 'active': ''}`}>
          <span>Select Room</span><a href="#">2</a>
        </li>
        <li className={pathname === '/hotel/reservation' ? 'active': ''}>
          <span>Confirm Room</span><a href="#">3</a>
        </li>
        <li><img src={img_RightArrow} alt="" onClick={() => this.props.history.goForward()}/></li>
        
      </ul>
    </div>
    );
  }
}

export default withRouter(HotelNavBanner);