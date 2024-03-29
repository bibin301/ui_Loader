import React from 'react';
import { connect } from 'react-redux';
import { addItinerary, removeItinerary } from '../../service/addCart/action';
import { map as _map,
  sumBy as _sumBy } from 'lodash';
import img_DragDrop from  '../../asset/images/Drag-and-Drop-Section.png'
import img_ItineraryTourist from  "../../asset/images/Your Itinerary Tourist.svg";
import img_hotel from "../../asset/images/hotel-building.png";
import img_plane from "../../asset/images/plane.png";
import img_DateArrow from "../../asset/images/Date Arrow.png"; 
import img_ItineraryExpanded from "../../asset/images/Itinerary-Expanded-Lines.png";

import { DropTarget, ConnectDropTarget, DropTargetMonitor } from 'react-dnd'

class Itinerary extends React.Component {

  componentDidUpdate(prevProps) {
    if (!prevProps.isOver && this.props.isOver) {
      // You can use this as enter handler
      console.log('You can use this as enter handler')
    }

    if (prevProps.isOver && !this.props.isOver) {
      console.log('You can use this as leave handler')
      // You can use this as leave handler
    }

    if (prevProps.isOverCurrent && !this.props.isOverCurrent) {
      console.log('You can specific and track enter/leave')
      // You can be more specific and track enter/leave
      // shallowly, not including nested targets
    }
  }

  handleRemoveItinerary = (item) => {
    this.props.removeFromItinerary(item);
  }
  render() {
    const { connectDropTarget, isOver, canDrop , itineraryList} = this.props
    const totalPrice = Math.round(_sumBy(itineraryList, 'price') * 100) / 100
    // console.log('iteraryList...', itineraryList)

    return connectDropTarget(<div className="rightSide align-self-start">
        <h4 className="rightHeadText">
          <img src={img_ItineraryTourist} alt="" /> YOUR ITINERARY
        </h4>
        <div className="itineraryItems">
          <img src={img_DragDrop} className={!itineraryList.length 
            ? canDrop
              ? "dragDropImage is-ready" : "dragDropImage" 
            : "dragDropImage is-hidden"} alt="" />
          <ul className="itinerarySelItems">
            {_map(itineraryList, (item, index) => 
              <li key={index}>
                <div>
                  <a>
                    {" "}
                    <img src={img_hotel} alt="" />
                  </a>
                  <h4>
                    {item.type.toUpperCase()}
                    <span style={__titleStyle}>
                      {item.title} <img src={img_DateArrow} alt="" /> IAH
                    </span>
                  </h4>
                  <span>
                    <a href="#" onClick={() => this.handleRemoveItinerary(item)}>
                      <i className="fas fa-times" />
                    </a>
                    ${item.price}
                  </span>
                </div>
                <div className="expandIcon">
                  <img src={img_ItineraryExpanded} alt="" />
                </div>
              </li>
              )}
          </ul>
        </div>
        <h2 className="itineraryTotal">Total : ${totalPrice}</h2>
        <div className="itineraryBtns">
          <button type="button" className="searchBtn itinerarySave mr-1">
            Save <i className="far fa-thumbs-up" />
          </button>
          <button type="button" className="searchBtn itineraryBook">
            Book <i className="fas fa-check" />
          </button>
        </div>
      </div>);
  }
}

const __handleDrop = {
  canDrop: (props, monitor)=> {
    const item = monitor.getItem();

    // console.log('canDrop...', item) 
    return true;
  },

  hover:(props, monitor, component)=> {
    // console.log('hover...', monitor.getItem()) 
  },

  drop:(props, monitor, component)=> {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }
    const item = monitor.getItem();
    console.log('dropp...', item, props);
    props.addToItinerary(item);

    return { moved: true };
  }
};
const __collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  }
}

const mapStateToProps = state => ({
  itineraryList: state.addcartReducer.itineraryList
})

const mapDispatchToProps = dispatch => ({
  addToItinerary: (itPay) => dispatch(addItinerary(itPay)),
  removeFromItinerary: (itPay) => dispatch(removeItinerary(itPay)),
})

export default connect(mapStateToProps, mapDispatchToProps)
  (DropTarget('ROOM', __handleDrop, __collect)(Itinerary));

const __titleStyle = {
  width: '71px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};