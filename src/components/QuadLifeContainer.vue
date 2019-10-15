<template>
    <div>
        QuadLifeContainer
        <table cellspacing="0" cellpadding="0">
            <tr v-for="(row, i) in pixels" :key="i">
                <td v-for="(pixel, j) in row"
                    :key="j" :style="pixelStyleQuadLife(pixel)"
                    @click="addCell(i,j)"></td>
            </tr>
        </table>
    </div>
</template>

<style lang="stylus" scoped>
td
    width 6px
    height 6px
    border none
    padding 0px
    margin 0px

tr
    font-size 6px
</style>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('quadLife');

const color = {
    1: 'rgb(255, 0, 0)',
    2: 'rgb(0, 255, 0)',
    3: 'rgb(0, 0, 255)',
    4: 'rgb(255, 255, 0)',
    0: 'rgb(255, 255, 255)',
};

export default {
    mounted() {
        this.start();
    },

    computed: {
        ...mapState(['pixels']),
    },

    methods: {
        ...mapActions(['stepForward', 'start', 'stop']),

        pixelStyleQuadLife(number) {
            return `background-color: ${color[number]}`;
        },

        addCell(i, j) {
            this.pixels[i][j] = Math.floor(Math.random() * 5);
        },
    },

    destroyed() {
        this.stop();
    },
};
</script>
