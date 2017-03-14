# formedapi

## setup
1 - `npm install -g nodemon`
1 - `yarn install`
1 - setup local monogodb database with MongoChef
1 - add `config/database`

## database file
Your `config/database.js` will look something like this... 
```
module.exports = {
  'secret': 'apisecret',
  'database': 'mongodb://localhost/formedapi'
};
```
(see `example.database.js` too)
the secret is used for the jwt encoding