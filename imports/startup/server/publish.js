import {Businesses} from '/imports/api/businesses/businesses'
import Submissions from '/imports/api/submissions/submissions'

Meteor.startup(() => {

  /* publish all businesses (index.jsx) */
  Meteor.publish('businesses.all', () => Businesses.find());

  /* publish one business (business.jsx) */
  Meteor.publish('businesses.one', (id) => Businesses.find({ _id: id }));

  /* publish all submissions (admin) */
  Meteor.publish('submissions.all', () => Submissions.find());

});
