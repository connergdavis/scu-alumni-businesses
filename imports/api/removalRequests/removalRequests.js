import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import {Tracker} from 'meteor/tracker'

import {Businesses} from '/imports/api/businesses/businesses'

const RemovalRequests = new Mongo.Collection('removalRequests');

/**
 * Define the RemovalRequests table schema, which also talks to React so forms validate automatically.
 * ------------------
 * gradName   : the submitter's full name
 * gradEmail  : the submitter's email address
 * gradPhone  : the submitter's phone number
 * gradYear   : the submitter's graduation year at SCU
 * businessId : the internal ID for the business that is being considered for removal
 * business   : the business object compiled from the rest of the form fields
 * reason     : the given reason for why this business should be removed
 * -------------
 */
const schema = new SimpleSchema({
  gradName: {
    type: String,
    required: true,
    label: 'Your name'
  },
  gradEmail: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: 'Email address'
  },
  gradPhone: {
    type: String,
    regEx: SimpleSchema.RegEx.Phone,
    label: 'Phone number'
  },
  gradYear: {
    type: Number,
    required: true,
    min: 1900,
    label: 'Graduation year'
  },
  businessId: {
    type: String,
    required: true,
    label: 'Business Id'
  },
  business: {
    type: Businesses.simpleSchema(),
    required: true
  },
  reason: {
    type: String,
    required: true,
    regEx: /(\n|^).*?(?=\n|$)/,
    max: 140,
    label: 'Reason for requesting removal'
  }
}, {
  requiredByDefault: false,
  tracker: Tracker
});
RemovalRequests.attachSchema(schema);

if (Meteor.isServer) {
  Meteor.publish('removalRequests', () => RemovalRequests.find({}));
}

Meteor.methods({
  'removalRequests.validate'(removalRequest) {
    try {
      RemovalRequests.simpleSchema().validate(removalRequest);
      return undefined;
    } catch (e) {
      return e.details;
    }
  },

  'removalRequests.insert'(removalRequest) {
    RemovalRequests.simpleSchema().validate(removalRequest);
    if (RemovalRequests.findOne({ gradName: removalRequest.gradName, business: removalRequest.business })) {
      throw new Meteor.Error('removalRequests-found', 'You have already submitted that removal request.');
    } else {
      const result = RemovalRequests.insert(removalRequest, (err) => {
        if (err) {
          throw new Meteor.Error('removalRequests.insert', err.details);
        }
      });
      return RemovalRequests.find({ _id: result }).fetch();
    }
  },

  'removalRequests.remove'({id}) {
    RemovalRequests.remove({ _id: id });
  },
});

export default RemovalRequests;
