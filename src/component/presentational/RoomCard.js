import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map as _map,
  includes as _includes } from 'lodash';
import {
	DragSource,
	ConnectDragSource,
	DragSourceConnector,
	DragSourceMonitor,
} from 'react-dnd';
import ImageCarousel from '../presentational/ImageCarousel';
import img_signal from "../../asset/images/selectRoom/signal.png";
import img_icon from "../../asset/images/selectRoom/icon.png"; 
import img_parking from "../../asset/images/selectRoom/parking-sign(1).png";
import img_minibus from "../../asset/images/selectRoom/minibus.png";
import img_hotcoffee from "../../asset/images/selectRoom/hot-coffee.png";
import img_extrabed from "../../asset/images/selectRoom/extrabed.png";
import img_drag from "../../asset/images/selectRoom/drag.png";

class RoomCard extends Component {
  componentDidMount() {
		// const img = new Image()
		// img.onload = () =>
			// this.props.connectDragPreview && this.props.connectDragPreview(<div> hello am dragged </div>)
		// img.src = img_extrabed
	}

  render() {
    const { room, rate, onReserve } = this.props;
    const { isDragging, connectDragSource, src } = this.props

    return connectDragSource(<div className="sectionCard">
          <div className="d-flex flex-row">
            <div className="flex-column imagesection">
              <ImageCarousel />

              <p>{room.name}</p>
            </div>
            <div className="detailsBg flex-column">
              <div dangerouslySetInnerHTML={{ __html: room.desc }} />
              {/*< ul>
                <li>
                  <img src={img_signal} alt="" />
                  <p>Free Cancellation</p>
                </li>
                <li>
                  <img src={img_icon} alt="" />
                  <p>Free Wifi</p>
                </li>
                <li>
                  <img src={img_parking} alt="" />
                  <p>Free parking</p>
                </li>
                <li>
                  <img src={img_minibus} alt="" />
                  <p>Free Airport Shuttle</p>
                </li>
                <li>
                  <img src={img_hotcoffee} alt="" />
                  <p>Breakfast Included</p>
                </li>
                <li>
                  <img src={img_hotcoffee} alt="" />
                  <p>Reserve Now, Pay when you stay</p>
                </li>
                <li>
                  <img src={img_extrabed} alt="" />
                  <p>Extra Bed available</p>
                </li>
              </ul> */}
            </div>
            <div className="rateShowDiv flex-column">
              <div className="priceDiv">
                <p>{room.availableRoomCount ? room.availableRoomCount+" rooms left": "room full" } </p>
                <h2>${rate.totalFare}</h2>
              </div>
              <img src={img_drag} />
              <button type="button" onClick={onReserve} className="selectRoomBtn">
                RESERVE
              </button>
            </div>
          </div>
        </div>);
  }
}

const __itemSource = {
  canDrag(props) {
    // You can disallow drag based on props
    console.log(props.refId, props.itineraryList)
    return !_includes(_map(props.itineraryList, 'refId'),
      props.refId);
  },
  beginDrag(props) {
    const { room, refId, rate } = props;
    // console.log('begin Drag', props)
    return {
      type: 'hotel',
      refId: refId,
      title: room.name,
      price: rate.totalFare  
    };
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      // You can check whether the drop was successful
      // or if the drag ended but nobody handled the drop
      return;
    }
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    // console.log('end Drag',item, dropResult, component)

  }
 }

const __collect = (connect, monitor) => {
return {
connectDragSource: connect.dragSource(),
connectDragPreview: connect.dragPreview(),
isDragging: monitor.isDragging()
}
}
const mapStateToProps = state => ({
  itineraryList: state.addcartReducer.itineraryList
})

export default connect(mapStateToProps)(DragSource('ROOM', __itemSource, __collect)(RoomCard))