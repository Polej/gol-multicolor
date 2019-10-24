<template>
    <div>
        <button @click="setContainer('BaseGoL')">BaseGoL</button>
        <button @click="setContainer('BaseTricolor')">BaseTricolor</button>
        <button @click="setContainer('BaseQuadLife')">BaseQuadLife</button>
        <button @click="setContainer('BaseProbabilisticGoL')">BaseProbabilisticGoL</button>
        <button @click="setContainer('BasePredatorPrey')">BasePredatorPrey</button>

        <ProbabilisticGoLContainer v-if="container === 'ProbabilisticGoL'"/>
        <PredatorPreyContainer v-if="container === 'PredatorPrey'"/>
        <BaseContainer v-if="container === 'BaseGoL'"
            vuexModuleName="classicGoL"
            :pixelStyleFunction="classicPixelStyle"
            />
        <BaseContainer v-if="container === 'BaseTricolor'"
            vuexModuleName="GoLTricolor"
            :pixelStyleFunction="pixelStyleTricolor"
            />
        <BaseContainer v-if="container === 'BaseQuadLife'"
            vuexModuleName="quadLife"
            :pixelStyleFunction="pixelStyleQuadLife"
            />
        <BaseContainer v-if="container === 'BaseProbabilisticGoL'"
            vuexModuleName="probabilisticGoL"
            :pixelStyleFunction="pixelStyleQuadLife"
            />
        <BaseContainer v-if="container === 'BasePredatorPrey'"
            vuexModuleName="predatorPrey"
            :pixelStyleFunction="pixelStyleQuadLife"
            />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import BaseContainer from './BaseContainer.vue';

import ProbabilisticGoLContainer from './ProbabilisticGoLContainer.vue';
import PredatorPreyContainer from './PredatorPreyContainer.vue';

import { classicPixelStyle, pixelStyleTricolor, pixelStyleQuadLife } from './PixelStyleFunctions/pixelStyleFunctions';

export default {
    components: {
        ProbabilisticGoLContainer,
        PredatorPreyContainer,
        BaseContainer,
    },

    computed: {
        ...mapGetters(['container']),
    },

    methods: {
        ...mapActions(['setContainer']),

        classicPixelStyle,
        pixelStyleTricolor,
        pixelStyleQuadLife,
    },
};
</script>
