import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useDummySlice } from 'slices/dummy'

const Dummy = () => {
  const { actions } = useDummySlice()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.getDummies(null))
  }, [])

  return (
    <div>Dummy</div>
  )
}

export default Dummy