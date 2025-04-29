import { gql } from "graphql-request";

export const PLAYER_QUERY_KEY = "players";

export const GET_PLAYERS = gql`
  query getPlayers($status: String) {
    players(status: $status) {
      bio
      createdAt
      email
      full_name
      id
      level
      status
    }
  }
`;

export const GET_PLAYER_BY_ID = gql`
  query getPlayerById($id: String!) {
    player(id: $id) {
      bio
      createdAt
      email
      full_name
      id
      level
      status
    }
  }
`;

export const UPDATE_PLAYER = gql`
  mutation UpdatePlayer($id: String!, $player: UpdatePlayer!) {
    updatePlayer(id: $id, player: $player) {
      bio
      createdAt
      email
      full_name
      id
      level
      status
    }
  }
`;
