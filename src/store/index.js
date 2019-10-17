import Vue from 'vue';
import Vuex from 'vuex';

import classicGoL from './modules/classicGoL';
import GoLTricolor from './modules/GoLTricolor';
import quadLife from './modules/quadLife';
import probabilisticGoL from './modules/probabilisticGoL';
import predatorPrey from './modules/predatorPrey';

Vue.use(Vuex);

export default new Vuex.Store(
    {
        modules: {
            classicGoL,
            GoLTricolor,
            quadLife,
            probabilisticGoL,
            predatorPrey,
        },

        state: {
            container: null,
        },

        getters: {
            container: ({ container }) => container,
        },

        mutations: {
            setContainer(s, container) {
                s.container = container;
            },
        },

        actions: {
            setContainer({ commit }, container) {
                commit('setContainer', container);
            },
        },
    },
);
