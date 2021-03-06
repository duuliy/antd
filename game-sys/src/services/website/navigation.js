import { request, config } from 'utils'

const { api } = config
const { user,addshoptype,updateshoptype,deleteshoptype,getLabel,ap1All2,ap1All3 } = api

// 获取标签
export function query (params) {
    return request({
      url: ap1All3+'/getnav',
      method: 'post',
      data:params
    })
  }
  
  //添加商品分类
  export function create (params) {

    return request({
      url: ap1All3+'/admin/adminaddnav',
      method: 'post',
      data: params,
    })
  }
  //删除商品分类
  export function remove (params) {

    return request({
      url: ap1All3+'/admin/admindeletenav',
      method: 'post',
      data: params,
    })
  }
  //更新商品分类
  export function update (params) {
    return request({
      url: ap1All3+'/admin/adminupdatenav',
      method: 'post',
      data: params,
    })
  }
  //获取list组件数据
  export function getListData (params){
    return request({
      url: ap1All3+'/getnav',
      method: 'post',
      data:params
    })
  }
  