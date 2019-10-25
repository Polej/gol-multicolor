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
import { mapState, mapActions, mapMutations } from 'vuex';

const CELL_SIZE = 6;

export default {
    props: {
        vuexNamespace: String,
        pixelStyleFunction: Function,
    },

    mounted() {
        this.start();
    },

    computed: mapState({
        pixels(state) {
            return state[this.vuexNamespace].pixels;
        },
    }),

    methods: {
        ...mapMutations({
            addCell(commit, payload) {
                commit(`${this.vuexNamespace}/addCell`, payload);
            },
        }),

        ...mapActions({
            stepForward(dispatch) {
                dispatch(`${this.vuexNamespace}/stepForward`);
            },

            start(dispatch) {
                dispatch(`${this.vuexNamespace}/start`);
            },

            stop(dispatch) {
                dispatch(`${this.vuexNamespace}/stop`);
            },

            toggleStart(dispatch) {
                dispatch(`${this.vuexNamespace}/toggleStart`);
            },
        }),

        pixelStyle(pixel) {
            return this.pixelStyleFunction(pixel);
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
