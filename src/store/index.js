import Vue from 'vue';
import Vuex from 'vuex';

import classicGoL from './modules/classicGoL';
import GoLTricolor from './modules/GoLTricolor';
import quadLife from './modules/quadLife';
// import stage from './modules/stage';

Vue.use(Vuex);

export default new Vuex.Store(
    {
        modules: {
            classicGoL,
            GoLTricolor,
            quadLife,
            // game,
        },
    },
);
