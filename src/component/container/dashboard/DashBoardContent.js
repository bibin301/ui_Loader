import React, { Component } from 'react';
import {connect} from'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import DashboardRightPane from './DashboardRightPane'
import img_manuser from '../../../asset/images/dashboard/man-user.png'
import img_history  from "../../../asset/images/dashboard/history.png";
import img_settings  from "../../../asset/images/dashboard/settings.png";
import img_xeniapp from "../../../asset/images/dashboard/xeniapp.png";
import img_payment from "../../../asset/images/dashboard/payment.png";
import img_heart from "../../../asset/images/dashboard/heart.png";
import img_sachine from '../../../asset/images/dashboard/sachine.jpg';
class DashBoardContent extends Component {
  render() {
    const { pathname } = this.props.history.location
    const { loginDetails } = this.props;
    const createdDate =  moment(loginDetails.created_date).format("MMMMYYYY");
    console.log("createdDate",createdDate);
    return (
      <section className="dashSection">
	      <div className="container">
          <div className="dashContainer">
            <div className="dashTitleBg"> 
              <h3>{this.getTitle(pathname)}</h3>
            </div>
            <div className="dashLeftSide">
                <div className="profileView">
                    <div className="profileImgBg"><img src={img_sachine}/></div>
                    <h4>{loginDetails.name}</h4>
                    <p>{loginDetails.email}</p>
                    <p>Member since {createdDate}</p>
                </div>
                <ul className="dashboardMenuItems">
                  <li className={pathname === "/dashboard/overview" ? 'active': ''}
                     onClick={() => this.props.history.push("/dashboard/overview")}>
                    <span><img src={img_manuser}/></span> <h4>Overview</h4></li>
                  <li className={pathname === "/dashboard/my-trips" ? 'active': ''}
                    onClick={() => this.props.history.push("/dashboard/my-trips")}>
                    <span><img src={img_heart}/></span> <h4>My Trips</h4></li>
                  <li className={pathname === "/dashboard/wish-list" ? 'active': ''}
                    onClick={() => this.props.history.push("/dashboard/wish-list")}>
                    <span><img src={img_history}/></span> <h4>Wishlist</h4></li>
                  <li className={pathname === "/dashboard/payment" ? 'active': ''}
                    onClick={() => this.props.history.push("/dashboard/payment")}>
                    <span><img src={img_payment}/></span> <h4>Payment Method</h4></li>
                  <li className={pathname === "/dashboard/xeni-coin" ? 'active': ''}
                    onClick={() => this.props.history.push("/dashboard/xeni-coin")}>
                    <span><img src={img_xeniapp}/></span> <h4>Xenicoins</h4></li>
                  <li className={pathname === "/dashboard/profile" ? 'active': ''}
                    onClick={() => this.props.history.push("/dashboard/profile")}>
                    <span><img src={img_settings}/></span> <h4>Profile Setting</h4></li>
                </ul>
            </div>
            <DashboardRightPane/>
          </div>
        </div>
      </section>
    );
  }

  getTitle = (pathName) => {
    switch (pathName) {
      case "/dashboard/overview": return("overview");
      case "/dashboard/payment": return("payment method");
      case "/dashboard/profile": return("profile settings");
      case "/dashboard/my-trips": return("my trips");
      case "/dashboard/xeni-coin": return("xeni coin");
      case "/dashboard/wish-list": return("my wishlist");
      default:
        break;
    }

  }
}
const mapStateToProps = state =>({
  loginDetails: state.loginReducer.loginDetails
})

export default withRouter(connect(mapStateToProps)(DashBoardContent));
