import * as myprogramsService from '../services/myprogramsmysql';

export default  {
  namespace: 'myprogramsmysql',
  state: {
    tags: [],
    value:1,
  },
  reducers: {
    save1(state, { payload: {tags, } }) {
      console.log(tags)
      return { ...state, tags, };

    },

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
    *changeStates({ payload:  id}, { call, put ,select}) {
      console.log("changeStates");
      let a=parseInt(id/2);
      let tags = yield select(state => state.myprograms.tags);
      console.log(tags[a]);
      tags[a].values=id;
      yield put({
        type: 'save1',
        payload: {
          tags,
        },
      });
    },
  },

};
