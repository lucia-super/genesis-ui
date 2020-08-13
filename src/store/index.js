import axios from 'axios';
export default {
    state: {
        loading: true,
        data: []
    },
    mutations: {
        SET_LOADING_STATUS(state, payload) {
            state.loading = payload
        },

        SET_DATA(state, payload) {
            state.data = payload
        }
    },
    actions: {
        listAll({ commit }) {
            commit('SET_LOADING_STATUS', true)
            axios({
                method: 'get',
                url: "/getAllModules",
                responseType: 'json'
            }).then(function (response) {
                commit('SET_DATA', response.data);
            });
        },
        updateAll({ commit }, payload) {
            commit('SET_LOADING_STATUS', true)
            axios({
                method: 'post',
                url: "/rebuild",
                data: payload,
                responseType: 'json'
            }).then(function (response) {
                commit('SET_DATA', response.data);
            });

        }
    }
}