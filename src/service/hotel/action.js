import axios from "../Axios";
import actionType from "./actionType";
import URL from "./../../asset/configUrl";
import { toast, Flip } from "react-toastify";

export const loadingSearch = () => dispatch => {
  dispatch({
    type: actionType.ENABLE_LOADING_SEARCH
  });
};

export const stopSearching = () => dispatch => {
  dispatch({
    type: actionType.DISABLE_LOADING_SEARCH
  });
};

export const loadingSearchFilter = () => dispatch => {
  dispatch({
    type: actionType.ENABLE_LOADING_SEARCH_FILTER
  });
};

export const stopSearchingFilter = () => dispatch => {
  dispatch({
    type: actionType.DISABLE_LOADING_SEARCH_FILTER
  });
};

export const searchHotel = searchPayload => dispatch => {
  const { guest, date, bounds, searchString } = searchPayload;
  const stayPeriod = {
    ...date
  };
  dispatch(loadingSearch());
  axios
    .post(URL.hotel.HOTEL_SEARCH, {
      searchString,
      guest,
      stayPeriod,
      bounds
    })
    .then(res => {
      dispatch({
        type: actionType.HOTEL_SEARCH_SUCCESS,
        inputPayload: date,
        payload: res.data.data
      });

      _toast({
        type: "success",
        message: res.data.message,
        position: toast.POSITION.BOTTOM_RIGHT
      });
    })
    .catch(error => {
      dispatch(stopSearching());
      dispatch({
        type: actionType.HOTEL_SEARCH_FAILURE,
        error: error.response.data.data
      });
      _toast({
        type: "error",
        message: error.response.data.data.error.Message,
        position: toast.POSITION.BOTTOM_RIGHT
      });
    });
};

export const filterHotel = (
  sessionId,
  price,
  minHotelRating = 1,
  maxHotelRating = 5,
  pageSize = 10
) => dispatch => {
  dispatch(loadingSearch());
  axios
    .post(URL.hotel.HOTEL_FILTER, {
      sessionId,
      price,
      minHotelRating,
      maxHotelRating,
      pageSize
    })
    .then(res => {
      if (res.data.statusCode === 404) {
        dispatch({
          type: actionType.HOTEL_FILTER_SUCCESS,
          payload: { hotels: [] },
          inputPayload: {
            price,
            pageSize,
            minHotelRating,
            maxHotelRating
          }
        });
        _toast({
          type: "error",
          message: res.data.data.Message,
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else {
        dispatch({
          type: actionType.HOTEL_FILTER_SUCCESS,
          payload: res.data.data,
          inputPayload: {
            price: price,
            pageSize: pageSize,
            minHotelRating: minHotelRating,
            maxHotelRating: maxHotelRating
          }
        });
        _toast({
          type: "success",
          message: res.data.message,
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
    })
    .catch(error => {
      dispatch({
        type: actionType.HOTEL_FILTER_FAILURE,
        error: error
      });
      _toast({
        type: "error",
        message: "Invalid Request",
        position: toast.POSITION.BOTTOM_RIGHT
      });
    });
};

export const filterHotelLoadMore = (
  sessionId,
  price,
  pageSize = 10
) => dispatch => {
  dispatch(loadingSearchFilter());
  axios
    .post(URL.hotel.HOTEL_FILTER, {
      sessionId,
      price,
      pageSize: pageSize
    })
    .then(res => {
      dispatch(stopSearchingFilter());
      if (res.data.statusCode === 404) {
        dispatch({
          type: actionType.HOTEL_FILTER_SUCCESS,
          payload: { hotels: [] },
          inputPayload: { price: price, pageSize: pageSize }
        });
        _toast({
          type: "error",
          message: res.data.data.Message,
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else {
        dispatch({
          type: actionType.HOTEL_FILTER_SUCCESS,
          payload: res.data.data,
          inputPayload: { price: price, pageSize: pageSize }
        });
        _toast({
          type: "success",
          message: res.data.message,
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
    })
    .catch(error => {
      dispatch({
        type: actionType.HOTEL_FILTER_FAILURE,
        error: error.response.data.data
      });
      _toast({
        type: "error",
        message: "Invalid Request",
        position: toast.POSITION.BOTTOM_RIGHT
      });
    });
};

export const searchRoom = (
  sessionId,
  hotelId,
  currency = "USD"
) => dispatch => {
  dispatch(loadingSearch());
  axios
    .post(URL.hotel.ROOM_SEARCH, {
      sessionId,
      hotelId,
      currency
    })
    .then(res => {
      dispatch({
        type: actionType.ROOM_SEARCH_SUCCESS,
        payload: res.data.data
      });
      _toast({
        type: "success",
        message: res.data.message,
        position: toast.POSITION.BOTTOM_RIGHT
      });
    })
    .catch(error => {
      if (error.response.status === 400) {
        dispatch({
          type: actionType.ROOM_SEARCH_SUCCESS,
          payload: {
            hotel: null,
            rates: [],
            recommendations: [],
            roomOccupancies: [],
            rooms: []
          }
        });
        _toast({
          type: "error",
          message: error.response.data.data.error.Message,
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else {
        dispatch({
          type: actionType.ROOM_SEARCH_FAILURE,
          error: error
        });
      }
    });
};

export const searchRoomStateless = payload => dispatch => {
  dispatch(loadingSearch());
  axios
    .post(URL.hotel.ROOM_SEARCHSTATELESS, payload)
    .then(res => {
      dispatch(stopSearching());
      dispatch({
        type: actionType.ROOM_SEARCH_SUCCESS,
        payload: res.data,
        startDate: payload.startDate,
        endDate: payload.endDate
      });
      _toast({
        type: "success",
        message: res.data.message,
        position: toast.POSITION.BOTTOM_RIGHT
      });
    })
    .catch(error => {
      dispatch({
        type: actionType.ROOM_SEARCH_SUCCESS,
        error: error
      });
      _toast({
        type: "error",
        message: error.response.data.data.error.Message,
        position: toast.POSITION.BOTTOM_RIGHT
      });
    });
};

export const getRoomPrice = (
  sessionId,
  hotelId,
  recommendationId,
  currency
) => dispatch => {
  dispatch(loadingSearch());
  axios
    .post(URL.hotel.ROOM_PRICE, {
      sessionId,
      hotelId,
      recommendationId,
      currency
    })
    .then(res => {
      dispatch({
        type: actionType.ROOM_PRICE_SUCCESS,
        payload: res.data.data
      });
      _toast({
        type: "success",
        message: res.data.message,
        position: toast.POSITION.BOTTOM_RIGHT
      });
    })
    .catch(error => {
      dispatch({
        type: actionType.ROOM_PRICE_FAILURE,
        error: error.response.data.data
      });
      _toast({
        type: "error",
        message: error.response.data.message,
        position: toast.POSITION.BOTTOM_RIGHT
      });
    });
};

export const bookRoom = roombookpayload => dispatch => {
  axios
    .post(URL.hotel.ROOM_PRICE, {
      roombookpayload
    })
    .then(res => {
      dispatch({
        type: actionType.ROOM_BOOKING_SUCCESS,
        payload: res.data.data
      });
    })
    .catch(error => {
      dispatch({
        type: actionType.ROOM_BOOKING_FAILURE,
        error: error.response.data.data
      });
    });
};

export const cancelRoom = bookingId => dispatch => {
  axios
    .post(URL.hotel.ROOM_PRICE, {
      bookingId
    })
    .then(res => {
      dispatch({
        type: actionType.ROOM_CANCEL_SUCCESS,
        payload: res.data.data
      });
    })
    .catch(error => {
      dispatch({
        type: actionType.ROOM_CANCEL_FAILURE,
        error: error.response.data.data
      });
    });
};

// toaster  function
const _toast = ({ type, message, position }) => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: position
      });
      break;
    case "error":
      toast.error(message, {
        position: position
      });
      break;
    case "warning":
      break;
      toast.warn(message, {
        position: position
      });
    case "info":
      break;
      toast.info(message, {
        position: position
      });
    case "default":
      break;
      toast(message, {
        position: position
      });
    default:
      break;
  }
};
