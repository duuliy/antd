/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { create, remove, update } from '../../services/website/articleClassify'
import * as labelManageService from '../../services/website/articleClassify'
import { pageModel } from '../common'

const { query } = labelManageService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'articleClassify',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/articleClassify') {
          const payload = queryString.parse(location.search) || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload:{
                typeid:Number(0)
            },
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload = {} }, { call, put }) {
      const data = yield call(query,payload)
      console.log("拿到数据")
      console.log(data)
      if (data.status == 1) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.obj,
            // pagination: {
            // //   current: Number(payload.page) || 1,
            // //   pageSize: Number(payload.pageSize) || 10,
            //   total: data.total,
            // },
          },
        })
      }
    },

    * remove ({ payload }, { call, put, select }) {
    //  console.log(payload)
      const data = yield call(remove, payload)
      if (data.status == 1) {
        yield put({ type: 'hideModal'})
      } else {
        throw data
      }
    },

    * multiDelete ({ payload }, { call, put }) {
      const data = yield call(remove, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    * create ({ payload }, { call, put }) {
      
      const data = yield call(create, payload)
      if (data.status == 1) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    * update ({ payload }, { select, call, put }) {
      const data = yield call(update, payload)
      if (data.status == 1) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state,modalVisible: false }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})