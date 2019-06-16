import React, { Component } from 'react';
import img_xeniapp from "../../../asset/images/dashboard/xeniapp.png";
import img_coins from "../../../asset/images/dashboard/coins.jpg";
import img_world from "../../../asset/images/dashboard/world.png";
import img_city from "../../../asset/images/dashboard/city.png";
import img_location from "../../../asset/images/dashboard/location.png";
import img_flight from "../../../asset/images/dashboard/flight.png";
import img_plane from "../../../asset/images/plane.png";
import img_hotel from "../../../asset/images/hotel-building.png";
import img_car from "../../../asset/images/car.png";
import img_activities from "../../../asset/images/activities.png";
import img_chat from "../../../asset/images/chat.png";
import img_heart from "../../../asset/images/dashboard/heart.png";

class DBOverview extends Component {
  render() {
    return <div className="dashRightSide align-self-start">
        <div className="d-flex flex-row">
          <div className="overViewIcon">
            <div>
              <img src={img_xeniapp} />
            </div>
            <h4>
              200 <img src={ img_coins} width="20px" />
            </h4>
            <p>Xenicoins</p>
          </div>
          <div className="overViewIcon">
            <div>
              <img src={ img_world} className="overViewIxonImg" />
            </div>
            <h4>4%</h4>
            <p>of the World</p>
          </div>
          <div className="overViewIcon">
            <div>
              {" "}
              <img src={img_city} className="overViewIxonImg" />
            </div>
            <h4>360</h4>
            <p>Cities</p>
          </div>
          <div className="overViewIcon">
            <div>
              {" "}
              <img src={ img_location} />
            </div>
            <h4>45</h4>
            <p>Countries</p>
          </div>
          <div className="overViewIcon">
            <div>
              {" "}
              <img src={ img_flight} />
            </div>
            <h4>68</h4>
            <p>Trips</p>
          </div>
        </div>
        <div className="d-flex flex-row">
          <div className="overViewCateg">
            <img src={ img_plane} />
            <span>105 Flights booked</span>
          </div>
          <div className="overViewCateg">
            <img src={img_hotel } />
            <span>87 Hotels booked</span>
          </div>
        </div>
        <div className="d-flex flex-row">
          <div className="overViewCateg">
            <img src={img_car } />
            <span>66 Cars booked</span>
          </div>
          <div className="overViewCateg">
            <img src={img_activities } />
            <span>23 Activities booked</span>
          </div>
        </div>
        <div className="recentActivity">
          <h4>Recent Activity</h4>
          <ul>
            <li>
              <span>
                <img src={img_plane } />
              </span> <span>
                You booked a <b> Round Trip </b> from <b> New York </b> to <b>
                  {" "}
                  Houston{" "}
                </b>
              </span> <span>4 Days Ago</span>
            </li>
            <li>
              <span>
                <img src={ img_hotel} />
              </span>
              <span>
                You booked a <b> Room </b> at the <b> Holiday inn</b> in <b>
                  {" "}
                  Sugarland,Texas
                </b>
              </span> <span>2 Days Ago</span>
            </li>
            <li>
              <span>
                <img src={ img_car} />
              </span>
              <span>
                You booked a <b> Midsize Sedan </b> form<b> Oct 20</b> to <b>
                  {" "}
                  Oct 26
                </b>
              </span>
              <span>8 Days Ago</span>{" "}
            </li>
            <li>
              <span>
                <img src={img_activities } />
              </span>
              <span>
                You booked <b> 1 Pass </b> for the <b>
                  {" "}
                  Hudson Highland Trail
                </b>
              </span>
              <span>15 Days Ago</span>{" "}
            </li>
            <li>
              <span>
                <img src={ img_chat} />
              </span>
              <span>
                A new <b> Review</b> was posted for the <b> Holiday Inn</b> in <b>
                  {" "}
                  Sugarland,Texas
                </b>
              </span> <span>1 Days Ago</span>
            </li>
            <li>
              <span>
                <img src={img_heart } />
              </span>
              <span>
                There has been a price drop on a <b> Wishlist </b> item- <b>
                  {" "}
                  Atlantis, Dubai
                </b>
              </span> <span>11 Hours Ago</span>
            </li>
          </ul>
        </div>
      </div>;
  }
}

export default DBOverview;