const compression = require('compression');
const cors = require('cors');
const express = require('express');
const expressGraphql = require('express-graphql');
const createContext = require('./context');
const createSchema = require('./schema');
const demodata = require('./demodata');

const server = express();
server.use(cors({ origin: true, credentials: true }));
server.use(compression());

const schema = createSchema({});
const context = createContext({ data: demodata });

server.use('/', expressGraphql(function (req) {
  return { schema, context, graphiql: true }
}));

server.listen(4000, function () {
  console.log(`listening on http://localhost:4000`);
});
