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
  },
  add(data) {
    return request({  //! 添加数据
      url: `/article/category`,
      method: 'post',
      data
    })
  },
  getPost(id) {  //! 通过类别ID查询数据接口
    return request({
      url: `/article/category/${id}`,
      method: 'get'
    })
  },
  update(data) { //! 类别数据更新
    return request({
      url: `/article/category`,
      method: 'put',
      data
    })
  },
  delete(id) { //! 删除数据
    return request({
      url: `/article/category/${id}`,
      method: 'delete'
    })
  },
  categoryList() { //! 查询所有正常状态的分类
    return request({
      url: '/article/category/list',
      method: 'get'
    })
  }
}