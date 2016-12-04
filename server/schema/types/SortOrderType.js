const graphql = require('graphql');
const path = require('path');

module.exports = new graphql.GraphQLEnumType({
  name: path.basename(__filename, '.js'),
  values: {
    ASC: { value: 1 },
    DESC: { value: -1 },
  },
});
