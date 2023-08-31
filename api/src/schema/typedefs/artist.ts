import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    artist: [Artist!]!
  }

  type Mutation {
    addArtist(input: ArtistInput!): ArtistMutationResponse
    updateArtist(id: ID!, input: ArtistInput!): ArtistMutationResponse
    deleteArtist(id: ID!): ArtistMutationResponse
  }

  type ArtistMutationResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String
    artist: Artist
  }

  input ArtistInput {
    name: String
    description: String
    origin: String
  }

  type Artist {
    id: ID!
    name: String!
    description: String
    origin: String
  }
`;
