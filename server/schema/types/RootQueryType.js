const graphql = require('graphql');
const path = require('path');
const SortFieldType = require('./SortFieldType');
const SortOrderType = require('./SortOrderType');
const FilterType = require('./FilterType');
const PostType = require('./PostType');

module.exports = new graphql.GraphQLObjectType({
  name: path.basename(__filename, '.js'),
  fields: {
    posts: {
      type: new graphql.GraphQLList(PostType),
      args: {
        filters: {
          type: new graphql.GraphQLList(FilterType),
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

    postCount: {
      type: graphql.GraphQLFloat,
      args: {
        filters: {
          type: new graphql.GraphQLList(FilterType),
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
