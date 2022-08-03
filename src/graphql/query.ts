import { gql } from '@apollo/client'

export const SEARCH_USERS = gql`
  query search_users(
    $query: String!
    $first: Int = 20
    $after: String
    $before: String
  ) {
    search(type: USER, query: $query, first: $first, after: $after, before: $before) {
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
