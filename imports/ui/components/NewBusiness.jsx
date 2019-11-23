import update from 'immutability-helper'
import {Meteor} from 'meteor/meteor'
import React, {Component} from 'react'
import {Button, Col, Collapse, Form, FormGroup, FormText, Row} from 'reactstrap'

import {Categories, USStates} from '/imports/api/businesses/businesses'
import InputField from '/imports/ui/components/InputField'
import Photos from '/imports/api/photos/photos'

export default class NewBusiness extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      errors: {},
      submission: {
        business: {
          category: Object.keys(Categories)[0],
        }
      }
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  render() {
    if (Meteor.user()) {
      return (
        <div className={`py-${this.state.collapse ? '5' : '3'}`}>
          <h5
            className={`text-link text-white mb-0 ${this.state.collapse ? 'text-underline' : ''}`}
            onClick={this.toggle}
          >
            Santa Clara Alum? Submit your proudly owned business to us.&nbsp;
            <i className={`fa fa-caret-${this.state.collapse ? 'down' : 'right'} pl-2`} aria-hidden="true" />
          </h5>
          <Collapse isOpen={this.state.collapse} className="mt-3 p-5 bg-white shadow">
            {this.renderForm()}
            <div>
              <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
            </div>
          </Collapse>
        </div>
      )
    } else {
      return (
        <div className={`py-${this.state.collapse ? '5' : '3'}`}>
          <h5
            className={`text-link text-white mb-0 ${this.state.collapse ? 'text-underline' : ''}`}
            onClick={this.toggle}
          >
            Santa Clara Alum? Submit your proudly owned business to us.&nbsp;
            <i className={`fa fa-caret-${this.state.collapse ? 'down' : 'right'} pl-2`} aria-hidden="true" />
          </h5>
          <Collapse isOpen={this.state.collapse} className="mt-3 p-5 bg-white shadow">
            {this.renderForm()}
            <div>
              <Button color="primary" onClick={this.handleSubmit}>Submit for Review</Button>
            </div>
          </Collapse>
        </div>
      )
    }
  }

  renderForm() {
    if (Meteor.user()) {
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormGroup tag="fieldset">
            <legend className="h5">Your Business <hr /></legend>
            <InputField
              handle={this.handleInput}
              error={this.state.errors['business.name']}
              name="business.name"
              type="text"
              placeholder="The Krusty Krab"
              required
            />
            <InputField
              handle={this.handleInput}
              error={this.state.errors['business.description']}
              name="business.description"
              type="textarea"
              required
            />
            <InputField
              handle={this.handleInput}
              error={this.state.errors['business.category']}
              name="business.category"
              type="select"
              options={Categories}
              required
            />
            <InputField
              handle={this.handleInput}
              error={this.state.errors['business.photo']}
              name="business.photo"
              type="file"
            />
            <InputField
              handle={this.handleInput}
              error={this.state.errors['business.phoneNumber']}
              name="business.phoneNumber"
              type="tel"
              placeholder="(123) 456-7890"
            />
            <InputField
              handle={this.handleInput}
              error={this.state.errors['business.website']}
              name="business.website"
              type="text"
              placeholder="www.website.com"
            />
            <InputField
              handle={this.handleInput}
              error={this.state.errors['business.streetAddress']}
              name="business.streetAddress"
              type="text"
              placeholder="123 Conch St"
            />
            <Row>
              <Col md={6} className="px-0">
                <InputField
                  handle={this.handleInput}
                  error={this.state.errors['business.city']}
                  name="business.city"
                  type="text"
                  placeholder="Bikini Bottom"
                  isColumn={true}
                />
              </Col>
              <Col md={3} className="px-0">
                <InputField
                  handle={this.handleInput}
                  error={this.state.errors['business.state']}
                  name="business.state"
                  type="select"
                  options={USStates}
                  isColumn={true}
                />
              </Col>
              <Col md={3} className="px-0">
                <InputField
                  handle={this.handleInput}
                  error={this.state.errors['business.zip']}
                  name="business.zip"
                  type="text"
                  placeholder="97068"
                  isColumn={true}
                />
              </Col>
            </Row>
            <FormText color="muted">
              Note that this submission will be reviewed internally pending approval.
            </FormText>
          </FormGroup>
        </Form>
      );
    } else {
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormGroup tag="fieldset">
            <legend className="h5">A Little About You <hr /></legend>
            <InputField
              handle={this.handleInput}
              error={this.state.errors.gradName}
              name="gradName"
              type="text"
              placeholder="John Doe"
              required
            />
            <InputField
              handle={this.handleInput}
              error={this.state.errors.gradEmail}
              name="gradEmail"
              type="email"
              placeholder="john@doe.org"
            />
            <InputField
              handle={this.handleInput}
              error={this.state.errors.gradPhone}
              name="gradPhone"
              type="tel"
              placeholder="(123) 456-7890"
            />
            <InputField
              handle={this.handleInput}
              error={this.state.errors.gradYear}
              name="gradYear"
              type="text"
              placeholder="2006"
              required
            />
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend className="h5">And Your Business <hr /></legend>
            <InputField
              handle={this.handleInput}
              error={this.state.errors['business.name']}
              name="business.name"
              type="text"
              placeholder="The Krusty Krab"
              required
            />
            <InputField
              handle={this.handleInput}
              error={this.state.errors['business.description']}
              name="business.description"
              type="textarea"
              required
            />
            <InputField
              handle={this.handleInput}
              error={this.state.errors['business.category']}
              name="business.category"
              type="select"
              options={Categories}
              required
            />
            <InputField
              handle={this.handleInput}
              error={this.state.errors['business.photo']}
              name="business.photo"
              type="file"
            />
            <InputField
              handle={this.handleInput}
              error={this.state.errors['business.phoneNumber']}
              name="business.phoneNumber"
              type="tel"
              placeholder="(123) 456-7890"
            />
            <InputField
              handle={this.handleInput}
              error={this.state.errors['business.website']}
              name="business.website"
              type="text"
              placeholder="www.website.com"
            />
            <InputField
              handle={this.handleInput}
              error={this.state.errors['business.streetAddress']}
              name="business.streetAddress"
              type="text"
              placeholder="123 Conch St"
            />
            <Row>
              <Col md={4} className="px-0">
                <InputField
                  handle={this.handleInput}
                  error={this.state.errors['business.city']}
                  name="business.city"
                  type="text"
                  placeholder="Bikini Bottom"
                  isColumn={true}
                />
              </Col>
              <Col md={4} className="px-0">
                <InputField
                  handle={this.handleInput}
                  error={this.state.errors['business.state']}
                  name="business.state"
                  type="select"
                  options={USStates}
                  isColumn={true}
                />
              </Col>
              <Col md={4} className="px-0">
                <InputField
                  handle={this.handleInput}
                  error={this.state.errors['business.zip']}
                  name="business.zip"
                  type="text"
                  placeholder="97068"
                  isColumn={true}
                />
              </Col>
            </Row>
            <FormText color="muted">Note that this submission will be reviewed internally pending approval.</FormText>
          </FormGroup>
        </Form>
      );
    }
  }

  /**
   * Updates this.state to reflect instantaneous changes to input fields. Bound by `onChange={this.handleInput }`.
   *
   * @param e The generic form field to interpret, which can be any standard `<input type="" />`.
   */
  handleInput(e) {
    let newState;
    let name = e.target.name;
    let value;
    switch (e.target.type) {
      case 'checkbox':
        value = e.target.checked;
        break;
      case 'email':
      case 'select-one':
      case 'tel':
      case 'text':
      case 'textarea':
        value = e.target.value;
        break;
      case 'file':
        value = e.target.files[0];
        let upload = Photos.insert({
          file: value,
          streams: 'dynamic',
          chunkSize: 'dynamic',
        }, false);
        let ref = this; /* pointer back to _this_ so we can setState within anonymous function */
        upload.on('uploaded', (err, file) => {
          if (err) {
            throw err;
          }
          Meteor.call('files.photos.find', file._id, (err, res) => {
            if (err) {
              throw err;
            }
            ref.setState(ref.updateState(name, res));
          });
        });
        upload.start();
        break;
      default:
        console.log('handleInput: surprising input type => ' + e.target.type);
        break;
    }
    console.log(`handleInput: {${name} => ${value}}`);
    this.setState(this.updateState(name, value));
  }

  handleSubmit(e) {
    e.preventDefault();

    let submission = this.state.submission;

    if (submission.gradYear) {
      submission.gradYear = parseInt(submission.gradYear);
    }
    if (submission.gradPhone) {
      submission.gradPhone = submission.gradPhone.replace(/\D/g, '');
    }
    if (submission.business.phoneNumber) {
      submission.business.phoneNumber = submission.business.phoneNumber.replace(/\D/g, '');
    }

    if (Meteor.user()) {
      Meteor.call('businesses.insert', {
        name: submission.business.name,
        description: submission.business.description,
        photo: submission.business.photo,
        country: submission.business.country,
        streetAddress: submission.business.streetAddress,
        state: submission.business.state,
        city: submission.business.city,
        zip: submission.business.zip,
        phoneNumber: submission.business.phoneNumber,
        website: submission.business.website,
        category: submission.business.category
      });
      this.toggle();
    } else {
      Meteor.call('submissions.validate', submission, (err, res) => {
        if (res) {
          const errors = res.reduce((list, e) => {
            list[e.name] = e.message;
            return list;
          }, {});
          this.setState({ errors: errors });
        } else {
          Meteor.call('submissions.insert', submission, (err, res) => {
            if (err) {
              throw err;
            }
            this.toggle();
          });
        }
      });
    }
  }

  updateState(name, value) {
    let newState;
    if (name.includes('.')) {
      name = name.split('.');
      newState = update(this.state, {
        submission: {
          [name[0]]: {
            [name[1]]: { $set: value }
          }
        }
      });
    } else {
      newState = update(this.state, {
        submission: {
          [name]: { $set: value }
        }
      });
    }
    return newState;
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

}
