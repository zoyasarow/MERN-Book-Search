import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(
    $bookId: String!
    $authors: [String!]
    $description: String!
    $image: String
    $link: String
    $title: String!
  ) {
    saveBook(
      bookId: $bookId
      authors: $authors
      description: $description
      image: $image
      link: $link
      title: $title
    ) {
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        image
        link
        title
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        image
        link
        title
      }
    }
  }
`;