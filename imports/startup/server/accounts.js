import {Accounts} from 'meteor/accounts-base'

if (!Meteor.users.findOne({ username: 'admin' })) {
  Accounts.createUser({
    username: 'admin',
    password: '12345'
  });
}
