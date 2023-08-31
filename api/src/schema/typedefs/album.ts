import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    wishlistAlbums: [WishlistAlbum!]!
    ownedAlbums: [OwnedAlbum!]!
  }

  type Mutation {
    addWishlistAlbum(
      input: AlbumInput!
      artistIds: [ID!]!
      labels: [String!]!
      producers: [String!]!
      genres: [ID!]!
      tracks: [TrackInput!]!
      listings: [String!]!
      ranking: Int
    ): WishlistAlbumMutationResponse
    updateWishlistAlbum(
      id: ID!
      input: AlbumInput!
      artistIds: [ID!]!
      labels: [String!]!
      producers: [String!]!
      genres: [ID!]!
      tracks: [TrackInput!]!
      listings: [String!]!
      ranking: Int
    ): WishlistAlbumMutationResponse
    deleteWishlistAlbum(id: ID!): WishlistAlbumMutationResponse

    addOwnedAlbum(
      input: AlbumInput!
      artistIds: [ID!]!
      labels: [String!]!
      producers: [String!]!
      genres: [ID!]!
      tracks: [TrackInput!]!
      condition: Condition
    ): OwnedAlbumMutationResponse
    updateOwnedAlbum(
      id: ID!
      input: AlbumInput!
      artistIds: [ID!]!
      labels: [String!]!
      producers: [String!]!
      genres: [ID!]!
      tracks: [TrackInput!]!
      condition: Condition
    ): OwnedAlbumMutationResponse
    deleteOwnedAlbum(id: ID!): OwnedAlbumMutationResponse
  }

  type WishlistAlbumMutationResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String
    wishlistAlbum: WishlistAlbum
  }

  type OwnedAlbumMutationResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String
    ownedAlbum: OwnedAlbum
  }

  input AlbumInput {
    name: String
    description: String
    releaseYear: String
    length: Int
  }

  input TrackInput {
    name: String!
    length: Int
    side: Int
  }

  type WishlistAlbum {
    id: ID!
    album: Album
    listings: [String!]!
    ranking: Int
  }

  type OwnedAlbum {
    id: ID!
    album: Album
    condition: Condition
  }

  type Album {
    id: ID!
    name: String!
    description: String
    releaseYear: String
    artistIds: [ID!]!
    labels: [String!]!
    producers: [String!]!
    genres: [ID!]!
    length: Int
    tracks: [Track!]!
  }

  type Track {
    name: String!
    length: Int
    side: Int # Must be positive. Maps to alpha (0 = A)
  }

  enum Condition {
    P
    G
    VG
    VGP
    NM
    M
  }
`;
