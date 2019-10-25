<template>
    <div>
        <button @click="setContainer('GoL')">GoL</button>
        <button @click="setContainer('Tricolor')">Tricolor</button>
        <button @click="setContainer('QuadLife')">QuadLife</button>
        <button @click="setContainer('ProbabilisticGoL')">ProbabilisticGoL</button>
        <button @click="setContainer('PredatorPrey')">PredatorPrey</button>
        <button @click="setContainer('baseGoLModule')">baseGoLModule</button>

        <Container v-if="container === 'GoL'"
            vuexNamespace="classicGoL"
            :pixelStyleFunction="classicPixelStyle"
            />
        <Container v-if="container === 'Tricolor'"
            vuexNamespace="GoLTricolor"
            :pixelStyleFunction="pixelStyleTricolor"
            />
        <Container v-if="container === 'QuadLife'"
            vuexNamespace="quadLife"
            :pixelStyleFunction="pixelStyleQuadLife"
            />
        <Container v-if="container === 'ProbabilisticGoL'"
            vuexNamespace="probabilisticGoL"
            :pixelStyleFunction="pixelStyleQuadLife"
            />
        <Container v-if="container === 'PredatorPrey'"
            vuexNamespace="predatorPrey"
            :pixelStyleFunction="pixelStyleQuadLife"
            />
        <Container v-if="container === 'baseGoLModule'"
            vuexNamespace="baseGoLModule"
            :pixelStyleFunction="classicPixelStyle"
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
