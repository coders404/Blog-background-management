import request from '@/utils/request'

export default {
  goList( query, current = 1, size = 20 ) {
    return request({
      url: `/article/label/search`,
      method: 'post',
      data: {
        ...query,
        current,
        size
      }
    })
  },
  goAdd(data) {
    return request({
      url: '/article/label',
      method: 'post',
      data
    })
  },
  goEdit(id) { //! 编辑
    return request({
      url: `/article/lable/${id}`,
      method: 'get'
    })
  },
  goUpdate(data) {  //! 更新
    return request({
      url: '/article/label',
      method: 'put',
      data
    })
  },
  goDelete(id) {
    return request({
      url: `/article/label/${id}`,
      method: 'delete'
    })
  }
}