import { createStore } from 'vuex';
import { getData, setData } from '../firebase';

const store = createStore({
  state: {
    user: {
      name: '',
      lat: 0,
      lng: 0,
      addr: '',
    },
    data: [],
  },
  mutations: {
    login(state, name) {
      state.user.name = name;
    },

    setData(state, data) {
      state.data = data;
    },
  },
  actions: {
    login(context, name) {
      context.commit('login', name);
    },

    async getData(context) {
      const newData = await getData();
      context.commit('setData', newData);
    },

    async setData(context, pos) {
      console.log(pos);

      if (Boolean(pos.lat)) {
        const result = await setData(context.state.user.name, pos);

        context.dispatch('getData');
      }
    },
  },
});

export default store;
