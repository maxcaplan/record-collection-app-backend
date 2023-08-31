import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    genres: [Genre!]!
  }

  type Mutation {
    addGenre(input: GenreInput!): GenreMutationResponse
    updateGenre(id: ID!, input: GenreInput!): GenreMutationResponse
    deleteGenre(id: ID!): GenreMutationResponse
  }

  type GenreMutationResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String
    genre: Genre
  }

  input GenreInput {
    name: String!
  }

  type Genre {
    id: ID!
    name: String!
  }
`;
