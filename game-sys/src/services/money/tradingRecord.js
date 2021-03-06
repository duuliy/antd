import { request, config } from 'utils'

const { api } = config
const { getOrder,addshoptype,updateshoptype,deleteshoptype,getUserAuthenticationList,getUserInfo,edtUserAuthentication,getCapitalLog } = api

//获取 交易 记录
export function query (params) {

  return request({
    url: getOrder,
    method: 'post',
    data: params,
  })
}
//搜索 交易 记录
export function querySearch (params) {

  return request({
    url: getOrder,
    method: 'post',
    data: params,
  })
}


//获取   getUserInfo
export function getUserInfoes (params) {
    // console.log(params)
    return request({
      url: getUserInfo,
      method: 'post',
      data: params,
    })
  }



//通过
export function edtUserAuthenticationes (params) {
    console.log(params)
    return request({
      url: edtUserAuthentication,
      method: 'post',
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
