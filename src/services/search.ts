import axiosService from 'utils/axios'

export const searchUsers = (payload: { q?: string; page?: number }) => {
  const { q, page } = payload
  return axiosService.get('search/users', {
    params: { q, page },
  })
}

export default {
  searchUsers,
}
