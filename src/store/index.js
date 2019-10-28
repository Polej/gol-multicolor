import Vue from 'vue';
import Vuex from 'vuex';

import baseGoLModule from './modules/BaseGoLModule';

import { classicEvolve, classicGeneratePixel, classicRandomPixels } from '../logic/classicLogic';
import { tricolorEvolve, tricolorGeneratePixel, tricolorRandomPixels } from '../logic/tricolorLogic';
import { quadLifeEvolve, quadLifeGeneratePixel, quadLifeRandomPixels } from '../logic/quadLifeLogic';
import { probabilisticEvolve, probabilisticGeneratePixel, probabilisticRandomPixels } from '../logic/probabilisticLogic';
import { predatorPreyEvolve, predatorPreyGeneratePixel, predatorPreyEmptyPixels } from '../logic/predatorPreyLogic';

Vue.use(Vuex);

export default new Vuex.Store(
    {
        modules: {
            GoLModule: baseGoLModule(classicEvolve, classicGeneratePixel, classicRandomPixels),
            TricolorModule: baseGoLModule(
                tricolorEvolve,
                tricolorGeneratePixel,
                tricolorRandomPixels,
            ),
            QuadLifeModule: baseGoLModule(
                quadLifeEvolve,
                quadLifeGeneratePixel,
                quadLifeRandomPixels,
            ),
            ProbabilisticModule: baseGoLModule(
                probabilisticEvolve,
                probabilisticGeneratePixel,
                probabilisticRandomPixels,
            ),
            PredatorPreyModule: baseGoLModule(
                predatorPreyEvolve,
                predatorPreyGeneratePixel,
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
