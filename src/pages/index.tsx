import type { NextPage } from 'next'

import SearchContainer from 'containers/Search'
import { useSearchSlice } from 'slices/search'

const Home: NextPage = () => {
  useSearchSlice()

  return <SearchContainer />
}

export default Home
