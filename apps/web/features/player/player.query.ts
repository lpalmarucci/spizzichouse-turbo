import { gql } from "graphql-request";

export const PLAYER_QUERY_KEY = "players";
export const PLAYERS_HISTORY_QUERY_KEY = "players_history";
export const PLAYERS_STATS_QUERY_KEY = "players_stats";

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

export const GET_PLAYERS_STATS = gql`
  query getPlayersStats {
    players_stats {
      wins
      total_matches
      full_name
      bio
      email
      id
      status
      level
      win_rate
    }
  }
`;

export const GET_PLAYERS_HISTORY = gql`
  query players_history {
    players_history {
      month
      total
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
