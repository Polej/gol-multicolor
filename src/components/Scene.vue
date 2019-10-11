<template>
    <div>
        <button @click="container = 'ClassicGoL'">Classic GoL</button>
        <button @click="container = 'Tricolor'">Tricolor</button>
        <button @click="container = 'QuadLife'">QuadLife</button>
        <GolContainer v-if="container === 'ClassicGoL'"/>
        <TricolorContainer v-if="container === 'Tricolor'"/>
        <QuadLifeContainer v-if="container === 'QuadLife'"/>
    </div>
</template>

<script>
import GolContainer from './GolContainer.vue';
import TricolorContainer from './TricolorContainer.vue';
import QuadLifeContainer from './QuadLifeContainer.vue';

export default {
    components: {
        GolContainer,
        TricolorContainer,
        QuadLifeContainer,
    },

    data() {
        return {
            container: null,
        };
    },
};
</script>
