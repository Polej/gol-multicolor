<template>
    <div>
        GolContainer
        <button @click="toggleStart">Pause</button>
        <table cellspacing="0" cellpadding="0" v-dragged="onDragged">
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

const { mapState, mapActions, mapMutations } = createNamespacedHelpers('classicGoL');

const CELL_SIZE = 6;

export default {
    mounted() {
        this.start();
    },

    computed: {
        ...mapState(['pixels']),
    },

    methods: {
        ...mapMutations(['addCell']),
        ...mapActions(['stepForward', 'start', 'stop', 'toggleStart']),

        pixelStyle(bit) {
            return `background-color: rgb(${255 * (1 - bit)},${255 * (1 - bit)},${255 * (1 - bit)})`;
        },

        onDragged({
            el,
            clientX,
            clientY,
        }) {
            if ((el.offsetLeft < clientX && clientX < (el.offsetLeft + el.clientWidth))
                && (el.offsetTop < clientY && clientY < (el.offsetTop + el.clientHeight))) {
                const xInside = clientX - el.offsetLeft;
                const yInside = clientY - el.offsetTop;

                const posX = Math.floor(xInside / CELL_SIZE);
                const posY = Math.floor(yInside / CELL_SIZE);

                this.addCell({ i: posY, j: posX });
            }
        },
    },

    destroyed() {
        this.stop();
    },
};
</script>
