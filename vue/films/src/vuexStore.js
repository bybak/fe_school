import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import databaseService from './lib/databaseService'

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
        setUser (state, currentUser) {
            if (currentUser) {
                state.logged = true;
                state.user = currentUser;
            } else {
                state.logged = false;
                state.user = {};
            }
        }
    },
    actions: {
        setCurrentUser(context) {
            const currentUser = firebase.auth().currentUser;

            if (currentUser) {
                databaseService.getUserById(currentUser.uid).then((data) => {
                    context.commit('setUser', data);
                });
            }
            else {
                context.commit('setUser', null);
            }

        },

    }
});

export default store;
