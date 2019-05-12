import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: {},
        logged: false
    },
    getters: {
        getUser: state => {
            return state.user;
        },
        logged: state => {
            return state.logged;
        }
    },
    mutations: {
        setUser (state, user) {
            if (user) {
                state.logged = true;
                state.user = user;
            } else {
                state.logged = false;
                state.user = {};
            }
        }
    },
    actions: {
        setCurrentUser() {
        },
    }
});

export default store;
