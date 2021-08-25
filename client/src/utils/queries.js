import { gql } from '@apollo/client';

export const ME = gql `
    query user {
        user {
            _id
            username
            email
        }
    }
`;