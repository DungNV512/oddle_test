import axiosService from 'utils/axios'

function getDummies() {
  return axiosService.get('posts')
}

export default {
  getDummies,
}
