<template>
    <div>
        <button @click="setContainer('GoL')">GoL</button>
        <button @click="setContainer('Tricolor')">Tricolor</button>
        <button @click="setContainer('QuadLife')">QuadLife</button>
        <button @click="setContainer('Probabilistic')">ProbabilisticGoL</button>
        <button @click="setContainer('PredatorPrey')">PredatorPrey</button>

        <Container v-if="container === 'GoL'"
            vuexNamespace="GoLModule"
            />
        <Container v-if="container === 'Tricolor'"
            vuexNamespace="TricolorModule"
            />
        <Container v-if="container === 'QuadLife'"
            vuexNamespace="QuadLifeModule"
            />
        <Container v-if="container === 'Probabilistic'"
            vuexNamespace="ProbabilisticModule"
            />
        <Container v-if="container === 'PredatorPrey'"
            vuexNamespace="PredatorPreyModule"
            />

        <RuleEditorClassic/>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Container from './Container.vue';
import RuleEditorClassic from './RuleEditorClassic.vue';

export default {
    components: {
        Container,
        RuleEditorClassic,
    },

    computed: {
        ...mapGetters(['container']),
    },

    methods: {
        ...mapActions(['setContainer']),
    },
};
</script>
