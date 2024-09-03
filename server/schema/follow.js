const typeDefs = `#graphql
scalar Date

  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: Date
    updatedAt: Date
  }

  type Mutation {
    addFollow(followingId: ID): String
  }
`;
module.exports = typeDefs;
