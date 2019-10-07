<template>
    <div>
        GolContainer
        <table cellspacing="1" cellpadding="0">
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

function emptyPixels(width, height) {
    return Array.from(
        new Array(height),
        () => [],
    )
        .map(
        /* eslint-disable-next-line no-unused-vars */
            (list, i) => Array.from(new Array(width), () => [])
            /* eslint-disable-next-line no-unused-vars */
                .map((point, j) => Math.round(Math.random())),
        );
}

function turnOnOrOff(i, j, oldPixels, height, width) {
    let sum = 0;

    let noLeft = false;
    let noRight = false;
    let noTop = false;
    let noBottom = false;

    if (i === 0) noTop = true;
    if (i === height - 1) noBottom = true;

    if (j === 0) noLeft = true;
    if (i === width - 1) noRight = true;

    if (!noTop && !noLeft) sum += oldPixels[i - 1][j - 1];
    if (!noLeft) sum += oldPixels[i][j - 1];
    if (!noBottom && !noLeft) sum += oldPixels[i + 1][j - 1];

    if (!noTop) sum += oldPixels[i - 1][j];
    if (!noBottom) sum += oldPixels[i + 1][j];

    if (!noTop && !noRight) sum += oldPixels[i - 1][j + 1];
    if (!noRight) sum += oldPixels[i][j + 1];
    if (!noBottom && !noRight) sum += oldPixels[i + 1][j + 1];

    if (sum === 3) return 1;
    if (sum === 2 && oldPixels[i][j] === 1) return 1;
    return 0;
}

function evolve(pixels) {
    const oldPixels = pixels;

    const height = oldPixels.length;
    const width = oldPixels[0].length;

    const newPixels = oldPixels.map(
        (row, i) => row.map(
            (pixel, j) => turnOnOrOff(i, j, oldPixels, height, width),
        ),
    );

    return newPixels;
}

export default {

    data() {
        return {
            pixels: emptyPixels(100, 100),
        };
    },

    mounted() {
        setInterval(() => this.stepForward(), 100);
    },

    methods: {
        pixelStyle(bit) {
            return `background-color: rgb(${255 - 255 * bit},${255 - 255 * bit},${255 - 255 * bit})`;
        },

        stepForward() {
            this.pixels = evolve(this.pixels);
        },

        addCell(i, j) {
            this.pixels[i][j] = 1;
        },
    },
};
</script>
