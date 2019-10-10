<template>
    <div>
        GolContainer
        <table cellspacing="1" cellpadding="0">
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
import { mapState, mapActions } from 'vuex';


export default {

    mounted() {
        setInterval(() => this.stepForward(), 100);
    },

    computed: {
        ...mapState('GoLTricolor', ['pixels']),
    },

    methods: {
        ...mapActions('GoLTricolor', ['stepForward']),

        pixelStyle(bit) {
            return `background-color: rgb(${255 * (1 - bit)},${255 * (1 - bit)},${255 * (1 - bit)})`;
        },

        pixelStyleTricolor(bits) {
            return `background-color: rgb(${255 * (bits[0])},${255 * (bits[1])},${255 * (bits[2])})`;
        },

        addCell(i, j) {
            this.pixels[i][j] = 1;
        },
    },
};
</script>
