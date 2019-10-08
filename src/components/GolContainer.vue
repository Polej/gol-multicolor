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

/**
 * Generate empty array of a given length.
 */
function emptyArray(len) {
    return Array.from(new Array(len), () => []);
}

/**
 * Generate arrays with random content.
 */
function randomPixels(width, height) {
    return emptyArray(height).map(
        () => emptyArray(width)
            .map(() => Math.round(Math.random())),
    );
}

/**
 * Basic logic function saying if pixel should be turned on or off.
 */
function turnOnOrOff(i, j, oldPixels, height, width) {
    let sum = 0;

    // vector way

    const arr = [];

    // generating the array of vectors in closest vicinity of (0,0)
    // (not including (0,0))
    for (let k = -1; k < 2; k += 1) {
        for (let l = -1; l < 2; l += 1) {
            if (!(k === 0 && l === 0)) {
                arr.push({ k, l });
            }
        }
    }

    sum = arr.map(({ k, l }) => {
        if ((i + k >= 0) && (i + k < height)
        && (j + l >= 0) && (j + l < width)) {
            return oldPixels[i + k][j + l];
        }

        return 0;
    }).reduce((a, b) => a + b);

    if (sum === 3) return 1;
    if (sum === 2 && oldPixels[i][j] === 1) return 1;
    return 0;
}

/**
 * Function to apply turnOnOrOff on every pixel, to transform old pixels
 * into newer version, in one time step.
 */
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
            pixels: randomPixels(100, 100),
        };
    },

    mounted() {
        setInterval(() => this.stepForward(), 100);
    },

    methods: {
        pixelStyle(bit) {
            return `background-color: rgb(${255 * (1 - bit)},${255 * (1 - bit)},${255 * (1 - bit)})`;
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
