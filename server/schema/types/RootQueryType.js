const graphql = require('graphql');
const path = require('path');
const SortFieldType = require('./SortFieldType');
const SortOrderType = require('./SortOrderType');
const UserFilterType = require('./UserFilterType');
const UserType = require('./UserType');

module.exports = new graphql.GraphQLObjectType({
  name: path.basename(__filename, '.js'),
  fields: {
    users: {
      type: new graphql.GraphQLList(UserType),
      args: {
        filters: {
          type: new graphql.GraphQLList(UserFilterType),
        },
        sort: {
          type: SortFieldType,
        },
        order: {
          type: SortOrderType,
        },
        skip: {
          type: graphql.GraphQLInt,
        },
        limit: {
          type: graphql.GraphQLInt,
        },
      },
      resolve(root, args, context) {
        return context.db.find({
          filters: args.filters,
          sort: args.sort,
          order: args.order,
          skip: args.skip,
          limit: args.limit,
        });
      }
    },

    usersCount: {
      type: graphql.GraphQLFloat,
      args: {
        filters: {
          type: new graphql.GraphQLList(UserFilterType),
        },
      },
      resolve(root, args, context) {
        return context.db.count({
          filters: args.filters,
        });
      },
    },
  },
});
