import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputField from "../../Fields/TextField";
import CheckField from "../../Fields/CheckField";
// import { addcart } from "../../../service/addCart/action";
import {addCard,getCard} from '../../../service/card/action'
import moment from 'moment'
class DBAddCard extends React.Component {
  handleFormInitialValues = () => {
    this.props.initialize({
      card_number: "",
      cardholder_name: "",
      validity:""
    });
  };
  cardSubmit = value => {
    let loginInfo = JSON.parse(sessionStorage.getItem("loginInfo")); 
    const payload = {
      number: value.card_number,
      name: value.cardholder_name,
      exp_year: value.validity.substring(2, 7),
      exp_month:value.validity.substring(0, 2),
      email: loginInfo.email
    };
    this.props.addCard(payload);
    this.props.getCard(loginInfo.email);
  };
  render() {
    const { modal, handleModal, handleSubmit, loginDetails, getCardDetails } = this.props;
    return (
      <React.Fragment>
          {getCardDetails&& getCardDetails.map((each,index) => (
          <form>
            <div className="modal" id="myAddCard" style={{ display: "block" }}>
              <div className="modal-dialog myNewAddCard">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">NEW CARD</h4>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      onClick={handleModal}
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="cardDetailForm">
                      <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                          <div className="form-group">
                            <Field
                              name="card_number" 
                              type="text"
                              label="card_number"
                              value={each.last4}
                              component={InputField}
                              placeholder="xxxx xxxx xxxx xxxx"
                              className="form-control"
                            />
                            {/* <label>Card Number</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="xxxx xxxx xxxx xxxx"
                            name="card_number"
                          />  */}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12 col-md-8 col-lg-8">
                          <div className="form-group">
                            <Field
                              name="cardholder_name"
                              type="text"
                              label="Cardholder Name"
                              component={InputField}
                              placeholder="John Doe"
                              className="form-control"
                            />
                            {/* <label>Cardholder Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="John Doe"
                            name="cardholder_name"
                          /> */}
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-4">
                          <div className="form-group">
                            <Field
                              name="validity"
                              type="text"
                              label="Vaild Thru"
                              component={InputField}
                              placeholder="MM/YY"
                              className="form-control"
                            />
                            {/* <label>Vaild Thru</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="MM/YY"
                            name="validity"
                          /> */}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-6">
                          <div className="form-group">
                            <button
                              className="searchBtn"
                              type="button"
                              onClick={handleSubmit(this.cardSubmit)}
                            >
                              Add Card
                            </button>
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6">
                              <Field
                        name="isActive"
                        type="checkbox"
                        label="Set as Primary"
                        component={CheckField}
                      />
                          {/* <input
                            className="filtercheckbox"
                            id="check"
                            type="checkbox"
                            value=""
                          /> */}
                          {/* <label for="check">Set as Primary</label> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
                        ))}

      </React.Fragment>
    );
  }
}

const addcardValidate = formProps => {
  const errors = {};
    if (!formProps.cardholder_name) {
      errors.cardholder_name = "Required";
    }

    if (!formProps.card_number) {
      errors.card_number = "Required";
    } else if (!/^[0-9]*$/.test(formProps.card_number)) {
      errors.card_number = "only Number allowed";
    }

    if (!formProps.validity) {
      errors.validity = "Required";
    } 
  return errors;
};

const mapStateToProps = state => ({
  loginDetails: state.loginReducer.loginDetails
});
const mapDispatchToProps = dispatch => ({
  addCard: value => dispatch(addCard(value)),
  getCard:value=>dispatch(getCard(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "DBAddCard",
    validate: addcardValidate
  })(DBAddCard)
);
