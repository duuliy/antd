import { qqqUser2,queryUser2, removeUser2, addUser2 } from '../services/api';
// import queryString from 'query-string'   //传数据用
export default {
    namespace: 'userr',


    state: {
        data: {
            list: {}
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {   //history，windows原生方法
            history.listen((location) => {
                if (location.pathname === '/Home/Users') {   //在这里发起请求拿到data
                      console.log(location.pathname)
                    dispatch({
                        type: 'qqUser2',
                        payload:{},
                })
                }
            })
        },
    },
    effects: {
        *qqUser2({ payload }, { call, put }) {
            const response = yield call(qqqUser2, payload);
            // console.log(response)
            if (response) {
                yield put({
                    type: 'query',
                    payload: response,
                });
            }
        },
        *fetch({ payload }, { call, put }) {
            console.log(555)
            const response = yield call(queryUser2, payload);
            if (response) {
                yield put({
                    type: 'save',
                    payload: response,
                });
            }
        },
        *add({ payload }, { call, put }) {
            console.log(555)
            const respones = yield call(addUser2, patload);
            if (response) {
                yield put({
                    type: 'save',
                    payload: response,
                });
            }
        },
        *remove({ payload }, { call, put }) {
            const respones = yield call(removeUser2, payload);
            if (response) {
                yield put({
                    type: 'save',
                    payload: response,
                });
            }
        }
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                data: action.payload
            }
        },
        query(state, action) {
            return {
                ...state,
                data: action.payload
            }
        }
    }

}

