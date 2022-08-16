import request from '@/utils/request'

export default {
  goList(query, current = 1, size = 20) {
    return request({
      url: `/article/category/search`,
      method: 'post',
      data: { //! {name: '小王', status: 1, current: 1, size: 20}
        ...query,
        current,
        size
      }
    })
  }
}