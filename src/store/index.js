import Vue from 'vue';
import Vuex from 'vuex';

import baseGoLModule from './modules/BaseGoLModule';

import classicImplementation from '../logic/classicLogic';
import tricolorImplementation from '../logic/tricolorLogic';
import quadLifeImplementation from '../logic/quadLifeLogic';
import probabilisticImplementation from '../logic/probabilisticLogic';
import predatorPreyImplementation from '../logic/predatorPreyLogic';

Vue.use(Vuex);

export default new Vuex.Store(
    {
        modules: {
            GoLModule: baseGoLModule(classicImplementation),
            TricolorModule: baseGoLModule(tricolorImplementation),
            QuadLifeModule: baseGoLModule(quadLifeImplementation),
            ProbabilisticModule: baseGoLModule(probabilisticImplementation),
            PredatorPreyModule: baseGoLModule(predatorPreyImplementation),
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
