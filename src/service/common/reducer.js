import actionTypes from './actionType';

const initialState = {

  isSearching: false,
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.ENABLE_LOADING_SEARCH:
      return({
        ...state,
        isSearching: true
      });
    case actionTypes.DISABLE_LOADING_SEARCH:
      return({
        ...state,
        isSearching: false
      });
    default: 
      return state;
  }
}
export default reducer;