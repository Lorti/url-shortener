import gql from 'graphql-tag';

export const URL_QUERY = gql`
  query {
    urls: uRLs {
      id
      originalUrl
      shortUrl
    }
  }
`;

export const URL_MUTATION = gql`
  mutation ($originalUrl: String!, $shortUrl: String!) {
    createURL(data: {
      originalUrl: $originalUrl
      shortUrl: $shortUrl
    }) {
      id
      originalUrl
      shortUrl
    }
  }
`;
