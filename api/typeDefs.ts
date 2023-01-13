import { gql } from "./deps.ts";

export const typeDefs = gql`
  type Query {
    hello: String
  }

  type Record {
    id: ID!
    name: String!
    artists: [String!]!
    label: String
    format: Format
    country: String
    released: Date!
    genres: [String!]!
    disks: [Disk!]!
    credits: [Credit!]
    condition: Stars
    rating: Stars
  }

  type Format {
    size: Int!
    speed: Float
    weight: Int
  }

  type Disk {
    sides: [Side!]!
  }

  type Side {
    tracks: [Track!]!
  }

  type Track {
    name: String!
    playtime: Float
  }

  type Credit {
    name: String!
    role: String
  }

  enum Stars {
    ZERO
    ONE
    TWO
    THREE
    FOUR
    FIVE
  }

  scalar Date
`;
