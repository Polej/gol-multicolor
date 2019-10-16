<template>
    <div>
        <button @click="setContainer('ClassicGoL')">Classic GoL</button>
        <button @click="setContainer('Tricolor')">Tricolor</button>
        <button @click="setContainer('QuadLife')">QuadLife</button>
        <button @click="setContainer('ProbabilisticGoL')">ProbabilisticGoL</button>
        <GolContainer v-if="container === 'ClassicGoL'"/>
        <TricolorContainer v-if="container === 'Tricolor'"/>
        <QuadLifeContainer v-if="container === 'QuadLife'"/>
        <ProbabilisticGoLContainer v-if="container === 'ProbabilisticGoL'"/>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import GolContainer from './GolContainer.vue';
import TricolorContainer from './TricolorContainer.vue';
import QuadLifeContainer from './QuadLifeContainer.vue';
import ProbabilisticGoLContainer from './ProbabilisticGoL.vue';

export default {
    components: {
        GolContainer,
        TricolorContainer,
        QuadLifeContainer,
        ProbabilisticGoLContainer,
    },

    computed: {
        ...mapGetters(['container']),
    },

    methods: {
        ...mapActions(['setContainer']),
    },
};
</script>
