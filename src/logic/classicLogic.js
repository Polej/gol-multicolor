import { vectorsToCheck, makeArray, makeValidatorForRange } from '../helpers';

function classicTurnOnOrOff(i, j, oldPixels, height, width) {
    let aliveNeighbours = 0;

    const validXCoordinate = makeValidatorForRange(0, width - 1);
    const validYCoordinate = makeValidatorForRange(0, height - 1);

    const validCoordinates = ([x, y]) => (
        validXCoordinate(x) && validYCoordinate(y)
    );

    // vector way

    aliveNeighbours = vectorsToCheck
        // translate to point [j, i]
        .map(([x, y]) => ([x + j, y + i]))
        // filter out points out of bounds
        .filter(validCoordinates)
        // sum alive neighbours
        .reduce(
            (value, [x, y]) => (value + oldPixels[y][x]),
            0,
        );

    if (aliveNeighbours === 3) {
        return 1;
    }
    if (aliveNeighbours === 2 && oldPixels[i][j] === 1) {
        return 1;
    }

    return 0;
}

export function classicEvolve(pixels) {
    const oldPixels = pixels;

    const height = oldPixels.length;
    const width = oldPixels[0].length;

    const newPixels = oldPixels.map(
        (row, i) => row.map(
            (pixel, j) => classicTurnOnOrOff(i, j, oldPixels, height, width),
        ),
    );

    return newPixels;
}

/* eslint-disable-next-line no-unused-vars */
export function classicGeneratePixel(state) {
    return Math.round(Math.random());
}

export function classicRandomPixels(width, height) {
    return makeArray(height, () => (
        makeArray(width, () => classicGeneratePixel())
    ));
}

export function classicPixelStyle(bit) {
    return `background-color: rgb(${255 * (1 - bit)},${255 * (1 - bit)},${255 * (1 - bit)})`;
}

export default {
    evolve: classicEvolve,
    generatePixel: classicGeneratePixel,
    startPixels: classicRandomPixels,
    pixelStyle: classicPixelStyle,
};
