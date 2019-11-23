import {Meteor} from 'meteor/meteor'
import React, {Component} from 'react'
import update from 'immutability-helper'
import {withTracker} from 'meteor/react-meteor-data'

class BusinessDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };
  }

  render() {
    return (
      <div className="bg-white px-4 py-3 border-top border-right border-bottom">
        {this.props.type === 'update' ? this.renderUpdateDetails() : this.renderBusinessDetails()}
      </div>
    )
  }

  renderBusinessDetails() {
    return (
      <div>
        <legend className="h5">{this.props.business.name}<hr /></legend>
        <p>Description: {this.props.business.description}</p>
        <p>Category: {this.props.business.category}</p>
        <p>Phone Number: {this.props.business.phoneNumber}</p>
        <p>Website: {this.props.business.website}</p>
        <p>Street Address: {this.props.business.streetAddress}</p>
        <p>State: {this.props.business.state}</p>
        <p>Zip: {this.props.business.zip}</p>
      </div>
    )
  }

  renderUpdateDetails() {
    return (
      <div>
        <legend className="h5">Suggested Updates for: {this.props.business.name}<hr /></legend>
        <p>Description: {this.props.business.description}</p>
        <p>Category: {this.props.business.category}</p>
        <p>Phone Number: {this.props.business.phoneNumber}</p>
        <p>Website: {this.props.business.website}</p>
        <p>Street Address: {this.props.business.streetAddress}</p>
        <p>State: {this.props.business.state}</p>
        <p>Zip: {this.props.business.zip}</p>
      </div>
    )
  }
}

export default withTracker(props => {
  Meteor.subscribe('businesses.public');
  return {
    currentUser: Meteor.user()
  };
})(BusinessDetails);
