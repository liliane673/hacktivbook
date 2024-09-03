import { gql } from "@apollo/client";

export const GET_POSTS_BY_ID = gql`
  query GetPostById($id: ID) {
  getPostById(_id: $id) {
    _id
    content
    imgUrl
    authorId
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
    tags
    author {
      name
      username
      email
    }
  }
}
`;