import { gql } from 'graphql-request';

export const PLAYER_QUERY_KEY = 'players';
export const PLAYERS_HISTORY_QUERY_KEY = 'players_history';
export const PLAYERS_STATS_QUERY_KEY = 'players_stats';

export const GET_PLAYERS = gql`
  query players($status: String) {
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
  query playersWithStats {
    playersWithStats {
      wins
      total_matches
      full_name
      bio
      email
      id
      status
      level
      win_rate
      createdAt
    }
  }
`;

export const GET_PLAYER_STATS = gql`
  query playerWithStats($id: String!) {
    playerWithStats(id: $id) {
      wins
      total_matches
      bio
      email
      id
      status
      level
      win_rate
      createdAt
    }
  }
`;

export const GET_PLAYERS_HISTORY = gql`
  query playersHistory {
    playersHistory {
      month
      total
    }
  }
`;

export const UPDATE_PLAYER = gql`
  mutation updatePlayer($id: String!, $player: UpdatePlayer!) {
    updatePlayer(id: $id, data: $player) {
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
