import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'

import { store } from 'store'
import 'styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Toaster position="bottom-center" />
    </Provider>
  )
}

export default MyApp
