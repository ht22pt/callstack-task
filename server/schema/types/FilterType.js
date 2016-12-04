const graphql = require('graphql');
const path = require('path');

module.exports = new graphql.GraphQLInputObjectType({
  name: path.basename(__filename, '.js'),
  fields: {
    field: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
    },

    value: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
    },
  },
});
