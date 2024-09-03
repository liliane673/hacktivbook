const typeDefs = `#graphql
  type User {
    _id: ID
    name: String
    username: String
    email: String
    password: String
    follower : [Follower]
    following : [Following]
    followerInfo : [FollowerInfoData]
    followingInfo : [FollowingInfoData]
  }

   type Follower {
    followingId: ID
    followerId: ID
    createdAt: Date
    updatedAt: Date
  }

  type Following {
    followingId: ID
    followerId: ID
    createdAt: Date
    updatedAt: Date
  }

  type FollowerInfoData {
    name: String
    username: String
    email: String
  }

  type FollowingInfoData {
    name: String
    username: String
    email: String
  }

  type Token {
    access_token: String
  }

  type Query {
    getUsers : [User]
    getUsersById : User
    searchUserByNameOrUsername(name: String!) : [User]
  }

  type Mutation {
    registerUser(name: String!, username: String!, email:String!, password:String!): String
    loginUser(username:String!, password:String!): Token
  }
`;
module.exports = typeDefs;
