<template>
    <div>
        <button @click="setContainer('GoL')">GoL</button>
        <button @click="setContainer('Tricolor')">Tricolor</button>
        <button @click="setContainer('QuadLife')">QuadLife</button>
        <button @click="setContainer('Probabilistic')">ProbabilisticGoL</button>
        <button @click="setContainer('PredatorPrey')">PredatorPrey</button>

        <Container v-if="container === 'GoL'"
            vuexNamespace="GoLModule"
            :pixelStyleFunction="classicPixelStyle"
            />
        <Container v-if="container === 'Tricolor'"
            vuexNamespace="TricolorModule"
            :pixelStyleFunction="pixelStyleTricolor"
            />
        <Container v-if="container === 'QuadLife'"
            vuexNamespace="QuadLifeModule"
            :pixelStyleFunction="pixelStyleQuadLife"
            />
        <Container v-if="container === 'Probabilistic'"
            vuexNamespace="ProbabilisticModule"
            :pixelStyleFunction="pixelStyleQuadLife"
            />
        <Container v-if="container === 'PredatorPrey'"
            vuexNamespace="PredatorPreyModule"
            :pixelStyleFunction="pixelStyleQuadLife"
            />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Container from './Container.vue';

import { classicPixelStyle, pixelStyleTricolor, pixelStyleQuadLife } from './PixelStyleFunctions/pixelStyleFunctions';

export default {
    components: {
        Container,
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
