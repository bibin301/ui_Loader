import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import Popover from 'react-popover';
import { map as _map } from 'lodash';
import img_user from "../../asset/images/user.png";
import img_logo from "../../asset/images/logo.png";
import img_headerSearch from "../../asset/images/headerSearch.png";
import {connect} from 'react-redux'
import {logOut} from '../../service/login/action'
import { ToastContainer,Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class TopNav extends Component {
 
  static proptypes = {
    isGuest:  PropTypes.bool.isRequired,
    userInfo: PropTypes.any,
    onSignIn: PropTypes.func,
    isVisibleSignIn:PropTypes.bool
  }
  static defaultProps = {
    isGuest: true
  }
  state = {
    enableUserAction: false
  }

  _subMenu = [
    {
      label: 'Signin', action: this.handleSignIn, isGuest: true
    },
    {
      label: 'SignOut', action: this.handleLogout, isGuest: false
    },
    {
      label: 'Dashboard', action: this.handleDashboard, isGuest: false
    },
  ]
  handleDashboard = () => {
    this.handleHidePopover();
    this.props.history.push("/dashboard")
    // this.setState({ enableUserAction: false });
  }
  handleSignIn = () => {
    console.log('handleSignIn...')
    this.handleHidePopover();
    this.props.onSignIn();
  }
  handleLogout = () => {
    console.log('signout...')
    this.props.history.push("/");
    this.handleHidePopover();
    this.props.logOut();
  }
  handleHidePopover = () => this.setState({ enableUserAction: false });
  render() {
    const { isGuest } = this.props;
    const { enableUserAction } = this.state;
    
    // console.log('props...', this.props)
    return (
      <div>
        {<ToastContainer autoClose={4000} transition={Flip}  />}
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <span className="navbar-brand" href="#"><img src={img_logo}/></span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
              <div className="navbarSearch"><input type="text"/><img src={img_headerSearch}/></div> 
              <ul className="navbar-nav">
                {isGuest 
                  ? <li className="nav-item">
                    <span className="nav-link rightLine" onClick={this.props.onSignIn}>Sign In</span>
                  </li>
                  : <li className="nav-item active">
                    <span className="nav-link rightLine" href="#" onClick={() => this.setState({ enableUserAction: !enableUserAction })}>
                    <span> 
                      <img src={img_user} width="25px"/>
                    </span> {this.props.loginDetails && this.props.loginDetails.name}
                    <Popover
                      isOpen={enableUserAction}
                      style={{ zIndex: 99999 }}
                      preferPlace='below'
                      className='popover'
                      tipSize={0.01}
                      onOuterAction={this.handleHidePopover}
                      body={this.renderUserAction()} >
                      <i className="fas fa-angle-down"></i>
                    </Popover>
                      </span>
                </li>}
                <li className="nav-item">
                  <span className="nav-link rightLine" href="#">About Us</span>
                </li>
                
                <li className="nav-item">
                  <span className="nav-link " href="#">USA <i className="fas fa-angle-down"></i></span>
                </li>
                <li className="nav-item">
                  <span className="nav-link " href="#"><button className="goPro">Go Pro</button></span>
                </li>
              </ul>
              
            </div>
          </div>
        </nav>
      </div>);
  }

  renderUserAction = () => {
    // return <div style={{background: 'white'}}>
    //     {_map(this._subMenu, (item, i) => 
    //       <button key={i} onClick={item.action}>{item.label}</button>)
    //     }
    //   </div>;
    
      return <div className='popover-body'>
          {this.props.isGuest 
            ?<div className='dropdown-item' onClick={this.handleSignIn}>
              Sign In
            </div> 
            : <React.Fragment>
              <div className='dropdown-item' onClick={this.handleDashboard}>
                Dashboard
              </div>
              <div className='dropdown-item' onClick={this.handleLogout}>
                Log Out
              </div>
            </React.Fragment>}
      </div>
  }
} 
const mapStateToprops = state => ({
  isGuest: !state.loginReducer.loginStatus,
  loginDetails: state.loginReducer.loginDetails,

}) 
const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut())
})
  export default connect(mapStateToprops, mapDispatchToProps)(withRouter(TopNav))