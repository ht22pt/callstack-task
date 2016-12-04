const graphql = require('graphql');
const path = require('path');

module.exports = new graphql.GraphQLEnumType({
  name: path.basename(__filename, '.js'),
  values: {
    TITLE: { value: 'title' },
    LIKES: { value: 'likes' },
    NAME: { value: 'name' },
    CREATED: { value: 'created' },
    VIEWS: { value: 'views' },
    ID: { value: 'id' },
  },
});
