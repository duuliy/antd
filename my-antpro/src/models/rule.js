import { queryRule, removeRule, addRule } from '../services/api';
import { message } from 'antd'

export default {
  namespace: 'rule',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {   //history，windows原生方法
      history.listen((location) => {
        // console.log(history)
        if (location.pathname === '/list/table-list') {   //在这里发起请求拿到data
          console.log(location.pathname)
          
          // const payload = queryString.parse(location.search) || { page: 1, pageSize: 10 }
          // dispatch({
          //   type: 'query',
          //   payload,
          // })
        }
      })
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      if(response){
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },
    *add({ payload, callback }, { call, put }) {
      // console.log(555)
      const response = yield call(addRule, payload);
      if(response){
        yield put({
          type: 'save',
          payload: response,
        });
        // message.success('添加成功');
      }
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      // console.log(action)
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
