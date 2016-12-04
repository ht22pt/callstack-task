const graphql = require('graphql');
const RootQueryType = require('./types/RootQueryType');
const RootMutationType = require('./types/RootMutationType');

module.exports = function createSchema(options) {
  return new graphql.GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
  });
};
