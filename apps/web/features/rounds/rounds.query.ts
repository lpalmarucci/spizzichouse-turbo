import { gql } from "graphql-request";

export const ROUNDS_QUERY_KEY = "players";

export const GET_ROUNDS = gql`
  query getRounds($matchId: String!) {
    rounds(matchId: $matchId) {
      createdAt
      id
      number
      status
      match {
        players {
          id
          full_name
        }
      }
      scores {
        points
        player {
          id
          full_name
        }
      }
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
  mutation CreateRound($createRoundInput: CreateRoundInput!) {
    createRound(createRoundInput: $createRoundInput) {
      createdAt
      id
      status
    }
  }
`;

export const DELETE_ROUND = gql`
  mutation RemoveRound($id: String!) {
    removeRound(id: $id) {
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
