import React, { Component } from "react";
import img_paymentCard from "../../asset/images/paymentCard.png";
import { reduxForm, Field } from "redux-form";
import InputField from "../Fields/TextField";
import { connect } from "react-redux";
import SelectField from "../Fields/SelectField";
class Payment extends Component {
  handleBooking = value => {
    const { hotel, sessionId, pricedRooms } = this.props;
    const paymentMethod={
      "cards":[
        {
          "num":value.cardNumber,
          "nameOnCard":value.cardName,
          "cvv":value.cvv,
            "expiry": {
               "month": value.month,
               "year": value.year
            },
                  "contactInfo": {
               "phones": [
                  {
                     "type": "Unknown",
                     "num": value.phoneNumber,
                     "countryCode": "1",
                     "ext": "123",
                     "areaCode": "200"
                  }
               ],
               "billingAddress": {
                  "line1": value.address,
                  // "line2": "Landmark: Beside the ACME Shopping Mall",
                  "city": {
                     "code": "SFO",
                     "name": "San Francisco"
                  },
                  "state": {
                     "code": "CA",
                     "name": "California"
                  },
                  "countryCode": "US",
                  "postalCode": "94133"
               },
               "email": value.email
            }
        }
      ]
    }
    const payload = {
      sessionId: sessionId,
      hotelId: hotel.id,
      rooms: [
        {
          roomRefId: pricedRooms[0].rateRefId,
          rateRefId: pricedRooms[0].roomRefId
        }
      ]
    };
    console.log("handlebookinmg", payload,value);
  };
  render() {
    const { handleSubmit, pricedRooms } = this.props;
    console.log("this.props.payment", pricedRooms);
    return (
      <form onSubmit={handleSubmit(this.handleBooking)}>
        <div>
          <div className="headerTitles justify-content-start">
            <h5>Pay with Paypal or Credit Card </h5>
            <img src={img_paymentCard} className="cardImg" alt="" />
          </div>
          <div className="paymentDetails">
            <div className="row">
              <div className="col-xl-9 col-lg-9 col-md-9">
                <div className="form-group">
                  {/* <label>Credit Card Number</label> */}
                  {/* <input type="text" /> */}
                  <Field
                    name="cardNumber"
                    type="text"
                    label="Credit Card Number"
                    component={InputField}
                    placeholder="Enter Your Card Number "
                  />
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3">
                <div className="form-group">
                  <Field
                    name="cvv"
                    type="text"
                    label="CVV"
                    component={InputField}
                    placeholder="CVV "
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6col-lg-6 col-md-6">
                <div className="form-group">
                  <Field
                    name="cardName"
                    type="text"
                    label="Name on Card"
                    component={InputField}
                    placeholder="Enter Your Name of card "
                  />
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3">
                <div className="form-group">
                  {/* <label>Expiration Date</label>
                  <select>
                    <option>Month</option>
                  </select> */}
                  <Field
                    name="month"
                    type="text"
                    label="Expiration Date"
                    component={InputField}
                    placeholder="Expired month"
                  />
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3">
                <div className="form-group">
                  {/* <label />
                  <select>
                    <option>Year</option>
                  </select> */}
                  <Field
                    name="year"
                    type="text"
                    label="Year"
                    component={InputField}
                    placeholder="year"
                  />
                </div>
              </div>
            </div>
            <h5>Billing Address</h5>
            <div className="row">
              <div className="col-xl-9 col-lg-9 col-md-9">
                <div className="form-group">
                  {/* <label>Address</label>
                  <input type="text" /> */}
                  <Field
                    name="address"
                    type="text"
                    label="Address"
                    component={InputField}
                    placeholder="Address "
                  />
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3">
                <div className="form-group">
                  {/* <label>Country</label>
                  <select>
                    <option />
                  </select> */}
                  <Field
                    name="country"
                    type="text"
                    label="Country"
                    component={InputField}
                    placeholder="Country "
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-5 col-lg-5 col-md-5">
                <div className="form-group">
                  {/* <label>City/Town</label>
                  <input type="text" /> */}
                  <Field
                    name="city"
                    type="text"
                    label="City/Town"
                    component={InputField}
                    placeholder="City/Town "
                  />
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4">
                <div className="form-group">
                  {/* <label>State</label>
                  <select>
                    <option />
                  </select> */}
                  <Field
                    name="state"
                    type="text"
                    label="state"
                    component={InputField}
                    placeholder="state"
                  />
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3">
                <div className="form-group">
                  {/* <label>Zip Code</label>
                  <input type="text" /> */}
                  <Field
                    name="zipcode"
                    type="text"
                    label="Zip Code"
                    component={InputField}
                    placeholder="Zip Code"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-9 col-lg-9 col-md-9">
                <div className="form-group">
                  {/* <label className="whosText">Who is Checking in?</label> */}
                  {/* <input type="text" placeholder="First and Last Name" /> */}
                  <Field
                    name="name"
                    type="text"
                    label="Who is Checking in?"
                    component={InputField}
                    placeholder="First and Last Name i.e eg:Naveen Kumar"
                  />
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3">
                <div className="form-group">
                  <label>Same as Credit Card</label>
                  <input
                    className="styled-checkbox"
                    id="styled-checkbox-1"
                    type="checkbox"
                    value=""
                  />
                  <label htmlFor="styled-checkbox-1" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-5 col-lg-5 col-md-5">
                <div className="form-group">
                  {/* <label>Email</label>
                  <input type="text" /> */}
                  <Field
                    name="email"
                    type="text"
                    label="Email"
                    component={InputField}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4">
                <div className="form-group">
                  {/* <label>Country Code</label>
                  <select>
                    <option />
                  </select> */}
                    <Field
                    name="code"
                    type="number"
                    label="country code"
                    component={InputField}
                    placeholder="country code"
                  />
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3">
                <div className="form-group">
                  {/* <label>Phone Number</label>
                  <input type="text" /> */}
                  <Field
                    name="phoneNumber"
                    type="number"
                    label="Phone Number"
                    component={InputField}
                    placeholder="Phone Number"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 mt-3 mb-1 text-right">
                {/* <button type="button" className="searchBtn">
                  Add to itinerray
                </button> */}
                <button type="submit" className="searchBtn">
                  Completed Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const fieldValidation = formProps => {
  console.log("formProps======>", formProps);
  const errors = {};
  if (!formProps.cardNumber) {
    errors.cardNumber = "Required";
  } else if (/\D/.test(formProps.cardNumber)) {
    errors.cardNumber = "numbers only allowed";
  }
  if (!formProps.cardName) {
    errors.cardName = "Required";
  }
  if (!formProps.cvv) {
    errors.cvv = "Required";
  } else if (/\d{3}/.test(formProps.year)) {
    errors.cvv = "cvv should contain 3 digit";
  }
  if (!formProps.month) {
    errors.month = "Required";
  } else if (/\d{2}/.test(formProps.year)) {
    errors.month = "month should contain 2 digit";
  }
  if (!formProps.year) {
    errors.year = "Required";
  } else if (/\d{4}/.test(formProps.year)) {
    errors.year = "year should contain 4 digit";
  }
  if (!formProps.address) {
    errors.address = "Required";
  }
  if (!formProps.city) {
    errors.city = "Required";
  }
  if (!formProps.state) {
    errors.state = "Required";
  }
  if (!formProps.country) {
    errors.country = "Required";
  }
  if (!formProps.zipcode) {
    errors.zipcode = "Required";
  } else if (/\D/.test(formProps.zipcode)) {
    errors.zipcode = "zipcode allowed only number";
  }
   if (!formProps.name) {
     errors.name = "Required";
   }
    if (!formProps.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
      errors.email = "Invalid Email Address";
    } 
     if (!formProps.code) {
       errors.code = "Required";
     }
      if (!formProps.phoneNumber) {
        errors.phoneNumber = "Required";
      }  

  return errors;
};

const mapStateToProps = state => ({
  hotel: state.hotelReducer.hotel,
  sessionId: state.hotelReducer.sessionId,
  searchDate: state.hotelReducer.searchDate,
  pricedTotalFare: state.hotelReducer.pricedTotalFare,
  quotedTotalFare: state.hotelReducer.quotedTotalFare,
  fareBreakup: state.hotelReducer.fareBreakup,
  pricedRooms: state.hotelReducer.pricedRooms,
  rates: state.hotelReducer.rates,
  requestedOccupancies: state.hotelReducer.requestedOccupancies,
  roomOccupancies: state.hotelReducer.roomOccupancies,
  rooms: state.hotelReducer.rooms
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "payment",
    validate: fieldValidation
  })(Payment)
);
