<template>
    <div>
        TricolorContainer
        <button @click="toggleStart">Pause</button>
        <table cellspacing="0" cellpadding="0">
            <tr v-for="(row, i) in pixels" :key="i">
                <td v-for="(pixel, j) in row"
                    :key="j" :style="pixelStyleTricolor(pixel)"
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

const { mapState, mapActions } = createNamespacedHelpers('GoLTricolor');


export default {
    mounted() {
        this.start();
    },

    computed: {
        ...mapState(['pixels']),
    },

    methods: {
        ...mapActions(['stepForward', 'start', 'stop', 'toggleStart']),

        pixelStyleTricolor(bits) {
            return `background-color: rgb(${255 * (bits[0])},${255 * (bits[1])},${255 * (bits[2])})`;
        },

        addCell(i, j) {
            this.pixels[i][j] = [1, 1, 1];
        },
    },

    destroyed() {
        this.stop();
    },
};
</script>
