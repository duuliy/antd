import { request, config } from 'utils'

const { api } = config
const { searchshoplistbystatus,addshoptype,updateshoptype,deleteshoptype,users } = api


export function query (params) {
  return request({
    url: searchshoplistbystatus,
    method: 'get',
    data: params,
  })
}
//获取商品分类
export function getSortManage (params) {
  console.log(params)
  return request({
    url: users,
    method: 'get',
    data: params,
  })
}
//添加商品分类
export function create (params) {
  console.log(params)
  return request({
    url: addshoptype,
    method: 'post',
    data: params,
  })
}
//删除商品分类
export function remove (params) {
  console.log(params)
  return request({
    url: deleteshoptype,
    method: 'post',
    data: params,
  })
}
//更新商品分类
export function update (params) {
  return request({
    url: updateshoptype,
    method: 'post',
    data: params,
  })
}
