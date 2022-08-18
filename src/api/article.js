import request from '@/utils/request'

export default {
  goSearch( query, current = 1, size = 20 ) {
    return request({
      url: "/article/article/search",
      method: 'post',
      data: {
        ...query,
        current,
        size
      }
    })
  }
}