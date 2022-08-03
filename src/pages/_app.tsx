import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'

import config from 'config'
import { store } from 'store'

import 'styles/globals.css'

const httpLink = createHttpLink({
  uri: config.graphqlUri,
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `bearer ${config.githubToken}`,
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
      <Toaster position="bottom-center" />
    </Provider>
  )
}

export default MyApp
