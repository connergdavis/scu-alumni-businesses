import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'
import {Tracker} from 'meteor/tracker'
import SimpleSchema from 'simpl-schema'

const Businesses = new Mongo.Collection('businesses');

const Categories = {
  entertainment: 'Entertainment',
  service: 'Service',
  manufacturing: 'Manufacturing',
  merchandising: 'Merchandising',
  management: 'Management',
  food: 'Food'
};

const USStates = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District Of Columbia',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming'
};

/**
 * Define the Business table schema, which also talks to React so forms validate automatically.
 * ------------------
 * name           : the title of the business
 * description    : a brief (< 140 chars) description of the business
 * category       : the category that most accurately describes this business
 * photo          : the URL to a photo of the establishment, if one has been provided
 * phoneNumber    : ...
 * website        : ...
 * country        : ...
 * streetAddress  : ...
 * city           : ...
 * state          : ...
 * zip            : ...
 * -----------------
 */
const schema = new SimpleSchema({
  name: {
    type: String,
    required: true,
    regEx: /^(?!\s)(?!.*\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!\-":;,]{2,}$/,
    max: 60,
    label: 'Business name'
  },
  description: {
    type: String,
    required: true,
    regEx: /(\n|^).*?(?=\n|$)/,
    max: 140
  },
  category: {
    type: String,
    required: true,
    allowedValues: Object.keys(Categories)
  },
  photo: {
    type: String
  },
  phoneNumber: {
    type: String,
    regEx: SimpleSchema.RegEx.Phone
  },
  website: {
    type: String,
    regEx: SimpleSchema.RegEx.Domain
  },
  country: {
    type: String,
    regEx: /^[a-zA-Z_ ]*$/,
    max: 60,
    defaultValue: 'United States'
  },
  streetAddress: {
    type: String,
    regEx: /^\s*\S+(?:\s+\S+){2}/,
    max: 60
  },
  city: {
    type: String,
    regEx: /[a-zA-Z]{2,}/,
    max: 60
  },
  state: {
    type: String,
    allowedValues: Object.keys(USStates)
  },
  zip: {
    type: String,
    regEx: SimpleSchema.RegEx.ZipCode,
    label: 'ZIP'
  },
}, {
  requiredByDefault: false,
  tracker: Tracker
});
Businesses.attachSchema(schema);

Meteor.methods({
  'businesses.validate'(business) {
    try {
      Businesses.simpleSchema().validate(business);
      return undefined;
    } catch (e) {
      return e.details;
    }
  },

  'businesses.insert'(business) {
    try {
      Businesses.simpleSchema().validate(business);
    } catch (e) {
      throw new Meteor.Error(
          'businesses.insert', `Failed to validate ${JSON.stringify(business)} => ${e}`
      );
    }
    if (Businesses.findOne({ name: business.name, phoneNumber: business.phoneNumber, })) {
      throw new Meteor.Error(
          'businesses.insert',
          `An existing business matches the provided info. {name: ${business.name}, phone: ${business.phoneNumber}}`
      );
    } else {
      Businesses.insert(business, (err, res) => {
        if (err) {
          throw new Meteor.Error('businesses.insert', err);
        } else {
          console.log(`businesses.insert: success => ${res}`);
        }
      });
    }
  },

  'businesses.remove'(id) {
    if (Businesses.find({ _id: id })) {
      Businesses.remove( id, (err, res) => console.log(`businesses.remove: success => ${res}`));
    } else {
      throw new Meteor.Error('businesses.remove', 'Could not remove business with that ID.');
    }
  },

  'businesses.removeRequest'(id) {
    if (Businesses.find({ _id: id.id })) {
      Businesses.remove({ _id: id.id });
    } else {
      throw new Meteor.Error('businesses.remove: error', 'Could not find a business with that ID.');
    }
  },

  'businesses.update'(id, business) {
    let item = { $set: {
        name: business.name,
        description: business.description,
        category: business.category,
        photo: business.photo,
        phoneNumber: business.phoneNumber,
        website: business.website,
        country: business.country,
        streetAddress: business.streetAddress,
        city: business.city,
        state: business.state,
        zip: business.zip
      }
    };
    
    if (Businesses.find({ _id: id })) {
      Businesses.update({ _id: id }, item, (err, res) => {
        console.log(`businesses.update: success => ${res}`);
      });
    } else {
      throw new Meteor.Error('businesses.update', 'Could not find a business to update with that ID.');
    }
  }
});

export {Businesses, Categories, USStates};
