import { gql } from '@apollo/client';

export const ME = gql `
    query me {
        me {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;