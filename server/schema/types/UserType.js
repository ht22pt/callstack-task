const graphql = require('graphql');
const path = require('path');

module.exports = new graphql.GraphQLObjectType({
  name: path.basename(__filename, '.js'),
  fields: {
    id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLInt),
    },

    name: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
    },

    title: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
    },

    views: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLFloat),
    },

    likes: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLFloat),
    },

    created: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLFloat),
    },

    createdStr: {
      type: graphql.GraphQLString,
      resolve(root) {
        return new Date(root.created).toString();
      }
    },
  },
});
