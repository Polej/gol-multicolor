<template>
    <div>
        <button @click="setContainer('BaseGoL')">BaseGoL</button>
        <button @click="setContainer('BaseTricolor')">BaseTricolor</button>
        <button @click="setContainer('BaseQuadLife')">BaseQuadLife</button>
        <button @click="setContainer('BaseProbabilisticGoL')">BaseProbabilisticGoL</button>
        <button @click="setContainer('BasePredatorPrey')">BasePredatorPrey</button>

        <BaseContainer v-if="container === 'BaseGoL'"
            vuexNamespace="classicGoL"
            :pixelStyleFunction="classicPixelStyle"
            />
        <BaseContainer v-if="container === 'BaseTricolor'"
            vuexNamespace="GoLTricolor"
            :pixelStyleFunction="pixelStyleTricolor"
            />
        <BaseContainer v-if="container === 'BaseQuadLife'"
            vuexNamespace="quadLife"
            :pixelStyleFunction="pixelStyleQuadLife"
            />
        <BaseContainer v-if="container === 'BaseProbabilisticGoL'"
            vuexNamespace="probabilisticGoL"
            :pixelStyleFunction="pixelStyleQuadLife"
            />
        <BaseContainer v-if="container === 'BasePredatorPrey'"
            vuexNamespace="predatorPrey"
            :pixelStyleFunction="pixelStyleQuadLife"
            />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import BaseContainer from './BaseContainer.vue';

import { classicPixelStyle, pixelStyleTricolor, pixelStyleQuadLife } from './PixelStyleFunctions/pixelStyleFunctions';

export default {
    components: {
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
