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
`

export const GET_USER_REPOSITORIES = gql`
  query user_repositories($login: String!) {
    user(login: $login) {
      id
      login
      repositories(first: 100) {
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
    }
  }
`

export const GET_USER_FOLLOWERS = gql`
  query user_followers($login: String!) {
    user(login: $login) {
      id
      login
      followers(first: 100) {
        totalCount
        edges {
          node {
            ... on User {
              id
              login
              location
              name
              avatarUrl
            }
          }
        }
      }
    }
  }
`

export const GET_USER_FOLLOWING = gql`
  query user_followings($login: String!) {
    user(login: $login) {
      id
      login
      following(first: 100) {
        totalCount
        edges {
          node {
            ... on User {
              id
              login
              location
              name
              avatarUrl
            }
          }
        }
      }
    }
  }
`
