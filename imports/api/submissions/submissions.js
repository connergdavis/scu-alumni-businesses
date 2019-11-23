import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import {Tracker} from 'meteor/tracker'

import {Businesses} from '/imports/api/businesses/businesses'

const Submissions = new Mongo.Collection('submissions');

/**
 * Define the Submission table schema, which also talks to React so forms validate automatically.
 * --------------
 * gradName   : the submitter's full name
 * gradEmail  : the submitter's email address
 * gradPhone  : the submitter's phone number
 * gradYear   : the submitter's graduation year at SCU
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
  business: {
    type: Businesses.simpleSchema(),
    required: true
  },
}, {
  requiredByDefault: false,
  tracker: Tracker
});
Submissions.attachSchema(schema);

Meteor.methods({
  'submissions.validate'(submission) {
    try {
      Submissions.simpleSchema().validate(submission);
      return undefined;
    } catch (e) {
      return e.details;
    }
  },

  'submissions.insert'(submission) {
    try {
      Submissions.simpleSchema().validate(submission);
    } catch (e) {
      throw new Meteor.Error(
          'submissions.insert', `Failed to validate ${JSON.stringify(submission)} => ${e}`
      );
    }
    if (Submissions.findOne({ gradName: submission.gradName, business: submission.business })) {
      throw new Meteor.Error('submissions.insert', 'You already submitted a business by that name.');
    } else {
      const result = Submissions.insert(submission, (err, res) => {
        if (err) {
          throw new Meteor.Error(
              'submissions.insert', `Submission could not be inserted. {${err.details}}`
          );
        }
      });
      return Submissions.find({ _id: result }).fetch();
    }
  },

  'submissions.remove'(id) {
    if (Submissions.find({ _id: id })) {
      Submissions.remove({ _id: id }, (err, res) => {
        console.log(`submissions.remove: success => ${res}`);
      });
    } else {
      throw new Meteor.Error('submissions.remove', 'Could not remove submission with that ID.');
    }
  },
  
});

export default Submissions;
