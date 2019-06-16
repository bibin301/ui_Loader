import _axios from '../Axios';
import URL from "../../asset/configUrl";
import actionType from "./actionType";

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

export const init = () => dispatch => {

  console.log('cokkie..', document.cookie)
  // dispatch(loadingSearch());
  _axios
    .get(URL.init)
    .then((res, ...rest)=> {
      // console.log('init res...', res, res.headers)
    })
    .catch(err =>{
      // console.log('init err...', err)
    })
};

