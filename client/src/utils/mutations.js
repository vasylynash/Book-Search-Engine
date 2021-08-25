import { gql } from '@apollo-client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;