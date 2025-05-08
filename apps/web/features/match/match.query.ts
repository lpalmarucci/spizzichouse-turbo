import { gql } from "graphql-request";

export const MATCH_QUERY_KEY = "match";
export const MATCH_HISTORY_QUERY_KEY = "match_history";

export const GET_MATCHES = gql`
  query getMatches($matchOrderBy: MatchOrderBy, $take: Int) {
    matches(orderBy: $matchOrderBy, take: $take) {
      date
      description
      duration
      id
      status
      title
      players {
        id
        full_name
      }
      rounds {
        id
        scores {
          points
          player {
            id
            full_name
          }
        }
      }
    }
  }
`;

export const GET_MATCH_BY_ID = gql`
  query Match($id: String!) {
    match(id: $id) {
      date
      description
      duration
      id
      status
      title
      players {
        id
        full_name
      }
      rounds {
        id
        number
        scores {
          player {
            id
            full_name
          }
          points
        }
      }
    }
  }
`;

export const GET_MATCHES_HISTORY = gql`
  query matches_history {
    matches_history {
      month
      total
    }
  }
`;

export const UPDATE_MATCH = gql`
  mutation UpdateMatch($id: String!, $match: UpdateMatch!) {
    updateMatch(id: $id, match: $match) {
      date
      description
      duration
      id
      status
      title
    }
  }
`;

export const CREATE_MATCH = gql`
  mutation CreateMatch($match: CreateMatch!) {
    createMatch(match: $match) {
      date
      description
      duration
      id
      status
      title
    }
  }
`;

export const DELETE_MATCH = gql`
  mutation DeleteMatch($id: String!) {
    deleteMatch(id: $id) {
      date
      description
      duration
      id
      status
      title
      players {
        id
        full_name
      }
    }
  }
`;
