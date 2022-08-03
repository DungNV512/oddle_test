import { gql } from '@apollo/client'

export const SEARCH_USERS = gql`
  query search_users(
    $query: String!
    $first: Int = 20
    $after: String
    $before: String
  ) {
    search(
      type: USER
      query: $query
      first: $first
      after: $after
      before: $before
    ) {
      userCount
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          ... on User {
            id
            login
            avatarUrl
            repositories {
              totalCount
            }
            followers {
              totalCount
            }
            following {
              totalCount
            }
          }
        }
      }
    }
  }
`

export const GET_DETAIL_USER = gql`
  query user($login: String!) {
    user(login: $login) {
      id
      login
      location
      name
      repositories(first: 20) {
        totalCount
        edges {
          node {
            ... on Repository {
              name
              stargazerCount
              forkCount
            }
          }
        }
      }
      followers {
        totalCount
      }
      following {
        totalCount
      }
    }
  }
`
