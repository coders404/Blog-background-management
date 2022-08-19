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
  },
  goById(id) {
    return request({
      url: `/article/article/${id}`,
      method: 'get'
    })
  },
  auditSuccess(id) {
    return request({
      url: `/article/article/audit/success/${id}`,
      method: 'get'
    })
  },
  auditFail(id) {
    return request({
      url: `/article/article/audit/fail/${id}`,
      method: 'get'
    })
  },
  auditDelete(id) {
    return request({
      url: `/article/article/${id}`,
      method: 'delete'
    })
  }
}