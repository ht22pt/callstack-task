const graphql = require('graphql');
const RootQueryType = require('./types/RootQueryType');

module.exports = function createSchema(options) {
  return new graphql.GraphQLSchema({
    query: RootQueryType,
  });
};
