import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import {Tracker} from 'meteor/tracker'

import {Businesses} from '/imports/api/businesses/businesses'

const EditRequests = new Mongo.Collection('editRequests');

/**
 * Define the EditRequests table schema, which also talks to React so forms validate automatically.
 * ------------------
 * gradName   : the submitter's full name
 * gradEmail  : the submitter's email address
 * gradPhone  : the submitter's phone number
 * gradYear   : the submitter's graduation year at SCU
 * businessId : the internal ID for the business that is being considered for removal
 * business   : the business object compiled from the rest of the form fields
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
}, {
  requiredByDefault: false,
  tracker: Tracker
});
EditRequests.attachSchema(schema);

if (Meteor.isServer) {
  Meteor.publish('editRequests', () => EditRequests.find({}));
}

Meteor.methods({
  'editRequests.validate'(editRequest) {
    try {
      EditRequests.simpleSchema().validate(editRequest);
      return undefined;
    } catch (e) {
      return e.details;
    }
  },

  'editRequests.insert'(editRequest) {
    EditRequests.simpleSchema().validate(editRequest);
    let item = { $set: {
        gradName: editRequest.gradName,
        gradEmail: editRequest.gradEmail,
        gradPhone: editRequest.gradPhone,
        gradYear: editRequest.gradYear,
        business: editRequest.business
      }
    };
    if (EditRequests.findOne({ gradName: editRequest.gradName, business: editRequest.business })) {
      throw new Meteor.Error('editRequests-found', 'You have already submitted that edit request.');
    } else {
      const result = EditRequests.insert(editRequest, err => {
        if (err) {
          throw new Meteor.Error('editRequests.insert', err.details);
        }
      });
      return EditRequests.find({ _id: result }).fetch();
    }
  },

  'editRequests.remove'({id}) {
    EditRequests.remove({ _id: id });
  },
});

export default EditRequests;
