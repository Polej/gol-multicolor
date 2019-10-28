import { vectorsToCheck, makeArray, makeValidatorForRange } from '../helpers';

// When this const is set to 4, half of the container is empty,
// and half is colored, giving colors free space to evolve.
// It should be integer.
const CHANCE_TO_GET_EMPTY_CELL = 4; // out of (CHANCE_TO_GET_EMPTY_CELL + 4) = 1/2


/**
 *  This function produces random integer number in interval [0, 4].
 *  If the number is less than
 *  CHANCE_TO_GET_EMPTY_CELL, it yields 0. Therefore there is
 *  greater probability to see 0. It is done to create more free space for
 *  colors to evolve.
 *  For remaining colors it yields 1,2,3,4 with standard probabilities
 *  (number between x and x+1 is transformed to
     * (x - (CHANCE_TO_GET_EMPTY_CELL - 1)).
 *
 * so [0, CHANCE_TO_GET_EMPTY_CELL] -> 0
 * and e.g.
 * 4.1 -> 1
 * 5.5 -> 2
 * 6.3 -> 3
 * 7.5 -> 4
 */
function nonUniformFlooredRandom() {
    // 4 is the number of colours
    const d8 = Math.floor(Math.random() * (CHANCE_TO_GET_EMPTY_CELL + 4)); // {0..8}
    return Math.floor(Math.max(0,
        d8 - (CHANCE_TO_GET_EMPTY_CELL - 1))); // half chance to get 0, 1/8 chance to get {1..4}
    // when CHANCE_TO_GET_EMPTY_CELL = 4
}

// function emptyPixelsQuadLife(width, height) {
//     return makeArray(height, () => (
//         makeArray(width, () => 0)
//     ));
// }
//

export function probabilisticRandomPixel() {
    return nonUniformFlooredRandom();
}

/**
 * Generate arrays with random content.
 */
export function probabilisticRandomPixels(width, height) {
    return makeArray(height, () => (
        makeArray(width, () => probabilisticRandomPixel())
    ));
}

function randomPixelFromProbabilityArray(arr) {
    const total = arr.reduce((a, b) => a + b, 0);
    const probabilities = arr.map((pI) => pI / total);

    let cumulatedProb = 0;

    let whichOne = null;

    const random = Math.random();

    probabilities.forEach((prob, i) => {
        if (cumulatedProb <= random && random < cumulatedProb + prob) {
            whichOne = i;
        }
        cumulatedProb += prob;
    });

    return whichOne;
}

/**
 * QuadLifeRule produces number symbolizing empty cell (0) or one of 4 ON colors. (1-4)
 */
function probabilisticRule(neighboursByType, oldPixels, i, j) {
    const centralPoint = oldPixels[i][j];
    /* eslint-disable-next-line no-unused-vars */
    const [numberOfEmptyCells, ...rest] = neighboursByType;
    const totalNumberOfAlive = rest.reduce((a, b) => a + b, 0);

    // when cell is empty and has 3 neighbours - give birth, with probabilities
    if (centralPoint === 0 && totalNumberOfAlive === 3) {
        return randomPixelFromProbabilityArray(rest) + 1; // shift by 1 to have index
        // corresponding to `neighboursByType` array
    }
    // stay alive when 2 or 3
    if (centralPoint !== 0 && (totalNumberOfAlive === 2 || totalNumberOfAlive === 3)) {
        return centralPoint;
    }
    return 0;
}

/**
 * Basic logic function saying if pixel should be turned on or off.
 */
function turnOnOrOffProbabilisticQuadLife(i, j, oldPixels, height, width) {
    let neighboursByType = [0, 0, 0, 0, 0]; // empty cells at first place [0],
    // the rest [1], [2], [3], [4] are numbers of cells for 4 different colors

    const validXCoordinate = makeValidatorForRange(0, width - 1);
    const validYCoordinate = makeValidatorForRange(0, height - 1);

    const validCoordinates = ([x, y]) => (
        validXCoordinate(x) && validYCoordinate(y)
    );

    // firstly, scan the vicinity, and filter points if out of bounds,
    // then calculate how many cells are in the vicinity for a given color

    neighboursByType = neighboursByType.map((colorSum, colorIdx) => vectorsToCheck
        // translate to point [j, i]
        .map(([x, y]) => ([x + j, y + i]))
        // filter out points out of bounds
        .filter(validCoordinates)
        // sum alive neighbours
        .reduce(
            (value, [x, y]) => {
                if (oldPixels[y][x] === colorIdx) {
                    return (value + 1);
                }
                return value;
            },
            colorSum,
        ));

    // Should the central cell be alive?
    return probabilisticRule(neighboursByType, oldPixels, i, j);
}

/**
 * Function to apply turnOnOrOff on every pixel, to transform old pixels
 * into newer version, in one time step.
 */
export function probabilisticEvolve(pixels) {
    const oldPixels = pixels;

    const height = oldPixels.length;
    const width = oldPixels[0].length;

    const newPixels = oldPixels.map(
        (row, i) => row.map(
            (pixel, j) => turnOnOrOffProbabilisticQuadLife(i, j, oldPixels, height, width),
        ),
    );

    return newPixels;
}
