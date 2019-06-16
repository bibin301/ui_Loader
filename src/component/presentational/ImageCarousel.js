import React, { Component } from 'react';
import PropTypes from 'prop-types';
import img_bannerImg from "../../asset/images/bannerImg.jpg";
import park from "../../asset/images/United-Airlines.png"

class ImageCarousel extends Component {

  static propTypes= {
    imageList: PropTypes.arrayOf(PropTypes.any),
  };

  static defaultProps = {
    imageList: [
      {"name": 'dummy1', url: img_bannerImg},
      {"name": 'dummy2', url: park }
    ]
  }

  state = {
    currentStage:1,
    totalStage: this.props.imageList.length,
  }

  previous =(event) =>{
    event.preventDefault();
    if(this.state.currentStage<this.state.totalStage)
    this.setState({
      currentStage: this.state.currentStage+1
    });
  }

  next =(event) =>{
    event.preventDefault();
    if (this.state.currentStage>1)
    this.setState({
      currentStage: this.state.currentStage-1,
    });
  }
 
  render() {
    const {imageList} = this.props;
    const {currentStage} = this.state;
    return (
      <div className="owl-carousel owl-theme">
        <div className="item">
          <div>
            <img src={imageList[currentStage - 1].url} alt={imageList[currentStage -1].name} /> 
          </div>
          <span className="leftArrow" onClick={ this.previous} disabled=""><i className="fas fa-chevron-left"></i></span>
          <span className="rightArrow" onClick={this.next} disabled=""><i className="fas fa-chevron-right"></i></span>
         </div>
       </div>
    );
  }
}

export default ImageCarousel;

