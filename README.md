# formedapi

## setup
1. `npm install -g nodemon`
1. `yarn install`
1. setup local monogodb database with MongoChef
1. run `mongod`
1. open MongoChef, connect to localhost, create db (ex.`formedapi` )
1. add `config/database.js` (see database file below)

## database file
Your `config/database.js` will look something like this...
```javascript
module.exports = {
  'secret': 'apisecret',
  'database': 'mongodb://localhost/formedapi'
};
```
(see `example.database.js` too)
the secret is used for the jwt encoding