import { vectorsToCheck, makeArray, makeValidatorForRange } from '../helpers';

export function tricolorRandomPixel() {
    return [
        Math.round(Math.random()),
        Math.round(Math.random()),
        Math.round(Math.random()),
    ];
}

/**
 * Generate arrays with random content.
 */
export function tricolorRandomPixels(width, height) {
    return makeArray(height, () => (
        makeArray(width, () => tricolorRandomPixel())
    ));
}

/**
 * @param colorIdx color index
 */
function classicGoLTricolorRule(aliveNeighbours, oldPixels, i, j, colorIdx) {
    if (aliveNeighbours === 3) {
        return 1;
    }
    if (aliveNeighbours === 2 && oldPixels[i][j][colorIdx] === 1) {
        return 1;
    }

    return 0;
}

/**
 * Basic logic function saying if pixel colors should be turned on or off.
 * @param {integer} i y-index of central cell
 * @param {integer} j x-index of central cell
 * @param {Array} oldPixels Array of Arrays containing pixel color data as Array
 * with 3 elements, each for different color
 * @param {integer} height Maximal index for i, the height of GoL board
 * @param {integer} width Maximal index for j, the width of GoL board
 * @returns {Array} Array with 3 elements, each for different colour, each may
 * take value of 1 or 0
 */
function turnOnOrOffTricolor(i, j, oldPixels, height, width) {
    let aliveNeighboursByColor = [0, 0, 0];

    const validXCoordinate = makeValidatorForRange(0, width - 1);
    const validYCoordinate = makeValidatorForRange(0, height - 1);

    const validCoordinates = ([x, y]) => (
        validXCoordinate(x) && validYCoordinate(y)
    );

    // vector way

    aliveNeighboursByColor = aliveNeighboursByColor.map((colorSum, colorIdx) => vectorsToCheck
        // translate to point [j, i]
        .map(([x, y]) => ([x + j, y + i]))
        // filter out points out of bounds
        .filter(validCoordinates)
        // sum alive neighbours
        .reduce(
            (value, [x, y]) => (value + oldPixels[y][x][colorIdx]),
            colorSum,
        ));

    // Should the central cells be alive? (color index iterates over colors)
    return aliveNeighboursByColor.map(
        (colorSum, colorIdx) => classicGoLTricolorRule(colorSum, oldPixels, i, j, colorIdx),
    );
}

/**
 * Function to apply turnOnOrOff on every pixel, to transform old pixels
 * into newer version, in one time step.
 */
export function tricolorEvolve(pixels) {
    const oldPixels = pixels;

    const height = oldPixels.length;
    const width = oldPixels[0].length;

    const newPixels = oldPixels.map(
        (row, i) => row.map(
            (pixel, j) => turnOnOrOffTricolor(i, j, oldPixels, height, width),
        ),
    );

    return newPixels;
}
