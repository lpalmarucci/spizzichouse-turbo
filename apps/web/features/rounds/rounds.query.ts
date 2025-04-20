import { gql } from "graphql-request";

export const ROUNDS_QUERY_KEY = "players";

export const GET_ROUNDS = gql`
  query getRounds($matchId: String!) {
    rounds(matchId: $matchId) {
      createdAt
      id
      status
    }
  }
`;

export const GET_ROUND_BY_ID = gql`
  query getRoundById($id: String!) {
    round(id: $id) {
      createdAt
      id
      status
    }
  }
`;

export const CREATE_ROUND = gql`
  mutation CreateRound($round: CreateRoundInput!) {
    createRound(round: $round) {
      createdAt
      id
      status
    }
  }
`;

export const DELETE_ROUND = gql`
  mutation DeleteRound($id: String!) {
    deleteRound(id: $id) {
      createdAt
      id
      status
    }
  }
`;

export const UPDATE_ROUND = gql`
  mutation UpdateRound($id: String!, $updateRound: UpdateRoundInput!) {
    updateRound(id: $id, round: $updateRound) {
      createdAt
      id
      status
    }
  }
`;
