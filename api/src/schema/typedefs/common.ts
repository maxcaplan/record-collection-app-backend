import gql from "graphql-tag";

export const typeDefs = gql`
  interface MutationResponse {
    code: Int!
    success: Boolean!
    message: String
  }
`;
