const API = "http://192.168.2.93:8080/api";

const configUrl = {
  init: `${API}/init`,
  hotel: {
    HOTEL_SEARCH: `${API}/hotel/search`,
    HOTEL_FILTER: `${API}/hotel/filter`,
    ROOM_SEARCH: `${API}/hotel/getRoom`,
    ROOM_PRICE: `${API}/hotel/getPrice`,
    ROOM_BOOKING: `${API}/hotel/Booking`,
    ROOM_CANCEL: `${API}/hotel/status/cancellation`,
    ROOM_SEARCHSTATELESS: `${API}/hotel/getroominit`
  },
  // HOTEL_INIT: `${API}/hotel`,
  // HOTEL_STATUS: `${API}/status`,
  // HOTEL_RESULTS: `${API}/search`

  //CAR
  CAR_SEARCH: `${API}/car/search`,
  CAR_FILTER: `${API}/car/filter`,
  CAR_PRICE: `${API}/car/getPrice`,
  CAR_BOOKING: `${API}/car/booking`,
  //user
  USER_GOOGLE_LOGIN: `${API}/user/googleLogin`,
  USER_SIGNUP: `${API}/user/signUp`,
  USER_LOGIN: `${API}/user/login`,

  card: {
    CARD_GET: `${API}/user/getSavedCardList?email=`,
    CARD_ADD: `${API}/user/createCard`,
    CARD_DELETE: `${API}/user/deleteSavedCard`,
  },
  //dashboard
  PROFILE_EDIT: `${API}/user/editProfile`,
  GET_PROFILE: `${API}/user/getProfile?email=`,
  CHANGE_PASSWORD: `${API}/user/changePassword`
};
export default configUrl;