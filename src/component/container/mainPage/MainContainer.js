import React from 'react';
import img_RoadGraphic from "../../../asset/images/Road-Graphic.png";
export default class MainContainer extends React.Component {

  render() {

    return <section className="searchSection">
        <div className="roadmap">
          <img src={img_RoadGraphic} alt="" />
        </div>
        <div className="container">
          <div className="d-flex flex-row justify-content-start">
            {this.props.children}
          </div>
        </div>
      </section>;
  }
}