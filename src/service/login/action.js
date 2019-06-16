import axios from "../Axios";
import actionType from "../login/actionType";
import URL from "../../asset/configUrl";
import { toast, Flip } from "react-toastify";

export const googleLogin = googlepayload => dispatch => {
  axios
    .post(URL.USER_GOOGLE_LOGIN, googlepayload)
    .then(res => {
      sessionStorage.setItem("loginInfo", JSON.stringify(res.data));
      dispatch({
        type: actionType.LOGIN_SUCCESS,
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
        type: actionType.LOGIN_FAILURE,
        payload: error.response.data
      });
      _toast({
        type: "error",
        message: error.response.data.message,
        position: toast.POSITION.BOTTOM_RIGHT
      });
    });
};

export const signUpInfo = signuppayload => dispatch => {
  axios
    .post(URL.USER_SIGNUP, signuppayload)
    .then(res => {
      sessionStorage.setItem("loginInfo", JSON.stringify(res.data));
      dispatch({
        type: actionType.SIGNUP_SUCCESS,
        payload: res.data
      });
      _toast({
        type: "success",
        message: res.data.message,
        position: toast.POSITION.BOTTOM_RIGHT
      });
    })
    .catch(error => {
      dispatch({
        type: actionType.SIGNUP_FAILURE,
        error: error.response.data
      });
      _toast({
        type: "error",
        message: error.response.data.data,
        position: toast.POSITION.BOTTOM_RIGHT
      });
    });
};

export const logOut = () => dispatch => {
  dispatch({
    type: actionType.LOGOUT_SUCCESS
  });
};
export const loginInfo = loginpayload => dispatch => {
  axios
    .post(URL.USER_LOGIN, loginpayload)
    .then(res => {
      sessionStorage.setItem("loginInfo", JSON.stringify(res.data.data));
      dispatch({
        type: actionType.LOGIN_SUCCESS,
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
        type: actionType.LOGIN_FAILURE,
        error: error.response.data
      });
      _toast({
        type: "error",
        message: error.response.data.data,
        position: toast.POSITION.BOTTOM_RIGHT
      });
    });
};

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
