import Vue from 'vue';
import Vuex from 'vuex';

import baseGoLModule from './modules/BaseGoLModule';

import { classicEvolve, classicRandomPixel, classicRandomPixels } from '../logic/classicLogic';
import { tricolorEvolve, tricolorRandomPixel, tricolorRandomPixels } from '../logic/tricolorLogic';
import { quadLifeEvolve, quadLifeRandomPixel, quadLifeRandomPixels } from '../logic/quadLifeLogic';
import { probabilisticEvolve, probabilisticRandomPixel, probabilisticRandomPixels } from '../logic/probabilisticLogic';
import { predatorPreyEvolve, predatorPreyRandomPixel, predatorPreyEmptyPixels } from '../logic/predatorPreyLogic';

Vue.use(Vuex);

export default new Vuex.Store(
    {
        modules: {
            GoLModule: baseGoLModule(classicEvolve, classicRandomPixel, classicRandomPixels),
            TricolorModule: baseGoLModule(
                tricolorEvolve,
                tricolorRandomPixel,
                tricolorRandomPixels,
            ),
            QuadLifeModule: baseGoLModule(
                quadLifeEvolve,
                quadLifeRandomPixel,
                quadLifeRandomPixels,
            ),
            ProbabilisticModule: baseGoLModule(
                probabilisticEvolve,
                probabilisticRandomPixel,
                probabilisticRandomPixels,
            ),
            PredatorPreyModule: baseGoLModule(
                predatorPreyEvolve,
                predatorPreyRandomPixel,
                predatorPreyEmptyPixels,
            ),
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
