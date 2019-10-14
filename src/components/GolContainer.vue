<template>
    <div>
        GolContainer
        <button @click="toggleStart">Pause</button>
        <table cellspacing="0" cellpadding="0">
            <tr v-for="(row, i) in pixels" :key="i">
                <td v-for="(pixel, j) in row"
                    :key="j" :style="pixelStyle(pixel)"
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

const { mapState, mapActions } = createNamespacedHelpers('classicGoL');


export default {
    mounted() {
        this.start();
    },

    computed: {
        ...mapState(['pixels']),
    },

    methods: {
        ...mapActions(['stepForward', 'start', 'stop', 'toggleStart']),

        pixelStyle(bit) {
            return `background-color: rgb(${255 * (1 - bit)},${255 * (1 - bit)},${255 * (1 - bit)})`;
        },

        addCell(i, j) {
            this.pixels[i][j] = 1;
        },
    },

    destroyed() {
        this.stop();
    },
};
</script>
