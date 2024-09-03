const typeDefs = `#graphql
scalar Date

  type Comments {
    content:String
    username:String
    createdAt: Date
    updatedAt: Date
  }

  type Likes {
    username:String
    createdAt: Date
    updatedAt: Date
  }
  
  type Post {
    _id: ID
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID
    comments : [Comments]
    likes : [Likes]
    createdAt: Date
    updatedAt :Date
    author : Author
  }

  type Author {
    name: String
    username: String
    email: String
  }

  input NewComment {
    postId:ID!
    content:String!
  }

  input NewLike {
    postId:ID!
  }

  input NewPost {
    content: String!
    tags: [String]
    imgUrl: String
  }


  type Query {
    getPosts : [Post]
    getPostById(_id: ID) : Post
  }

  type Mutation {
    addPost(NewPost : NewPost): String
    addCommentPost(NewComment:NewComment): String
    addLikePost(NewLike:NewLike): String
  }
`;
module.exports = typeDefs;
