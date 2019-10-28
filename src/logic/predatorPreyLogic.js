import { vectorsToCheck, makeArray, makeValidatorForRange } from '../helpers';


export function predatorPreyRandomPixel() {
    return Math.floor(Math.random() * 3); // three is number of states:
    // 0 - empty 1 - predator 2 - prey
}

/**
 * Generate arrays with empty content.
 */
export function predatorPreyEmptyPixels(width, height) {
    return makeArray(height, () => (
        makeArray(width, () => 0)
    ));
}

/**
 * Predator-Prey rule. [0] are empty cells
 * [1] are predators
 * [2] are prey
 *
 * @returns {number} Number of state 0, 1, or 2. As above.
 */
function predatorPreyRule(neighboursByType, oldPixels, i, j) {
    const centralPoint = oldPixels[i][j];
    /* eslint-disable-next-line no-unused-vars */
    const [numberOfEmptyCells, ...rest] = neighboursByType;
    const totalNumberOfAlive = rest.reduce((a, b) => a + b, 0);

    // 2 = green prey, 1 = red predator
    // when central point is empty, and there are 3 neighbours,
    // and there is one or two predators in neighbourhood,
    // give birth to predator
    if (centralPoint === 0 && (totalNumberOfAlive === 3) && (neighboursByType[2] > 0)
        && neighboursByType[1] > 0) {
        return 1; // predator
    }
    // when central point is empty, there are 2 neighbours,
    // and there are no predators, give birth to new prey
    if (centralPoint === 0 && (totalNumberOfAlive === 1)
        && neighboursByType[1] === 0) {
        return 2; // prey
    }

    // when central point is prey, stay if no predator present
    if (centralPoint === 2 && neighboursByType[1] === 0) {
        return centralPoint;
    }
    // when central point is predator, stay if number of prey is nonzero
    if (centralPoint === 1 && neighboursByType[2] > 0 && neighboursByType[1] < 4) {
        return centralPoint;
    }

    return 0;
}

/**
 * Basic logic function saying if pixel should be turned on or off.
 */
function turnOnOrOffPredatorPrey(i, j, oldPixels, height, width) {
    let neighboursByType = [0, 0, 0]; // empty cells at first place [0],
    // the rest [1], [2], are numbers of cells for predator (red) and prey (green)

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

    // Should the central cell be alive? Which state/species?
    return predatorPreyRule(neighboursByType, oldPixels, i, j);
}

/**
 * Function that applies turnOnOrOff on every pixel, to transform old pixels
 * into newer version, in one time step.
 */
export function predatorPreyEvolve(pixels) {
    const oldPixels = pixels;

    const height = oldPixels.length;
    const width = oldPixels[0].length;

    const newPixels = oldPixels.map(
        (row, i) => row.map(
            (pixel, j) => turnOnOrOffPredatorPrey(i, j, oldPixels, height, width),
        ),
    );

    return newPixels;
}
