import { gql } from "./deps.ts";

export const typeDefs = gql`
  type Query {
    hello: String
  }
`;
