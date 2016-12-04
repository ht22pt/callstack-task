const graphql = require('graphql');
const path = require('path');

module.exports = new graphql.GraphQLObjectType({
  name: path.basename(__filename, '.js'),
  fields: {
    addPost: {
      type: graphql.GraphQLBoolean,
      args: {
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
      },
      resolve(root, args, context) {
        return context.db.insert({
          id: args.id,
          name: args.name,
          title: args.title,
          views: args.views,
          likes: args.likes,
          created: args.created,
        });
      }
    },
  },
});
