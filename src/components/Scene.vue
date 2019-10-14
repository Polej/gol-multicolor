<template>
    <div>
        <button @click="setContainer('ClassicGoL')">Classic GoL</button>
        <button @click="setContainer('Tricolor')">Tricolor</button>
        <button @click="setContainer('QuadLife')">QuadLife</button>
        <GolContainer v-if="container === 'ClassicGoL'"/>
        <TricolorContainer v-if="container === 'Tricolor'"/>
        <QuadLifeContainer v-if="container === 'QuadLife'"/>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import GolContainer from './GolContainer.vue';
import TricolorContainer from './TricolorContainer.vue';
import QuadLifeContainer from './QuadLifeContainer.vue';

export default {
    components: {
        GolContainer,
        TricolorContainer,
        QuadLifeContainer,
    },

    computed: {
        ...mapGetters(['container']),
    },

    methods: {
        ...mapActions(['setContainer']),
    },
};
</script>
