import * as myprogramsService from '../services/myprograms';

export default  {
  namespace: 'myprograms',
  state: {
    tags: [],
  },
  reducers: {
   
    save2(state, { payload: {data:tags, } }) {
      console.log(tags)
      return { ...state, tags, };
      
    },
    
  },
  effects: {
    *fetchTags({ payload: { page = 1 } }, { call, put }) {
      
      const { data, headers } = yield call(myprogramsService.fetchTags, { page });
      console.log("put")
      yield put({
        type: 'save2',
        payload: {
          data,
        },
      });
    },
    
  },

};
