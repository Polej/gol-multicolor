<template>
    <div>
        GolContainer
        <table>
            <tr v-for="(row, i) in pixels" :key="i">
                <td v-for="(pixel, j) in row" :key="j">{{ i + j }}</td>
            </tr>
        </table>
    </div>
</template>

<style lang="stylus" scoped>
td
    width 5px
    height 5px

tr
    font-size 6px
</style>

<script>

function emptyPixels(width, height) {
    return Array.from(
        new Array(height),
        () => [],
    )
        .map(
            (list, i) => Array.from(new Array(width), () => [])
                .map((point, j) => i + j),
        );
}

export default {

    data() {
        return {
            pixels: emptyPixels(100, 100),
        };
    },

    mounted() {
        console.log('Pixels', this.pixels);
    },
};
</script>
