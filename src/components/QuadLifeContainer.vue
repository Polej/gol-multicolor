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
import { mapState, mapActions } from 'vuex';


export default {
    data() {
        return {
            interval: null,
        };
    },

    mounted() {
        if (!this.interval) this.interval = setInterval(() => this.stepForward(), 100);
    },

    computed: {
        ...mapState('quadLife', ['pixels']),
    },

    methods: {
        ...mapActions('quadLife', ['stepForward']),

        pixelStyleQuadLife(number) {
            if (number === 1) return 'background-color: rgb(255, 0, 0)';
            if (number === 2) return 'background-color: rgb(0, 255, 0)';
            if (number === 3) return 'background-color: rgb(0, 0, 255)';
            if (number === 4) return 'background-color: rgb(255, 255, 0)';
            return 'background-color: rgb(255, 255, 255)';
        },

        addCell(i, j) {
            this.pixels[i][j] = Math.floor(Math.random() * 5);
        },
    },

    destroyed() {
        if (this.interval) clearInterval(this.interval);
    },
};
</script>
