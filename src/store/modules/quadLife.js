import makeValidatorForRange from '../../helpers';

const vectorsToCheck = [[-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

/**
 * Generate arrays with content generated by gen function.
 */
function makeArray(len, gen) {
    return Array.from(new Array(len), gen);
}

function indexOfMax(a) {
    return a.reduce((iMax, x, i, arr) => (x > arr[iMax] ? i : iMax), 0);
}


// When this const is set to 4, half of the container is empty,
// and half is colored, giving colors free space to evolve.
// It should be integer.
const PROBABILITY_FOR_ZERO_MULTIPLYING_FACTOR = 4;


/**
 *  This function produces random integer number in interval [0, 4].
 *  If the number is less than
 *  PROBABILITY_FOR_ZERO_MULTIPLYING_FACTOR, it yields 0. Therefore there is
 *  greater probability to see 0. It is done to create more free space for
 *  colors to evolve.
 *  For remaining colors it yields 1,2,3,4 with standard probabilities
 *  (number between x and x+1 is transformed to
     * x - (PROBABILITY_FOR_ZERO_MULTIPLYING_FACTOR - 1)).
 *
 * so [0, PROBABILITY_FOR_ZERO_MULTIPLYING_FACTOR] -> 0
 * and
 * 4.1 -> 1
 * 6.3 -> 3
 * 7.5 -> 4
 */
function nonUniformFlooredRandom() {
    // 4 is the number of colours
    const random = Math.random() * (PROBABILITY_FOR_ZERO_MULTIPLYING_FACTOR + 4);

    if (random <= PROBABILITY_FOR_ZERO_MULTIPLYING_FACTOR) {
        return 0;
    }
    return Math.floor(random - (PROBABILITY_FOR_ZERO_MULTIPLYING_FACTOR - 1));
}

/**
 * Generate arrays with random content.
 */
function randomPixelsQuadLife(width, height) {
    return makeArray(height, () => (
        makeArray(width, () => nonUniformFlooredRandom())
    ));
}

/**
 * QuadLifeRule produces number symbolizing empty cell (0) or one of 4 ON colors. (1-4)
 */
function quadLifeRule(aliveNeighboursByColor, oldPixels, i, j) {
    const centralPoint = oldPixels[i][j];
    /* eslint-disable-next-line no-unused-vars */
    const [numberOfEmptyCells, ...rest] = aliveNeighboursByColor;
    const totalNumberOfAlive = rest.reduce((a, b) => a + b, 0);

    // This is resulting index from `rest` Array, to have position on
    // `aliveNeighboursByColor` Array, it is needed to add +1 to the index.
    const maxColorIdx = indexOfMax(rest);
    const maxColorQuantity = rest[maxColorIdx];

    // firstly, there are 2 cases with empty central cell

    // central cell empty,
    // give birth to a color for which there is majority (>=2 out of 3)
    if (centralPoint === 0 && (totalNumberOfAlive === 3)
        && maxColorQuantity >= 2) {
        return maxColorIdx + 1; // + 1 because we search idx on input Array.
        // explained before
    }
    // central cell empty
    // give birth to 4th colour, when there are 3 different cells
    if (centralPoint === 0 && totalNumberOfAlive === 3
        // are there 3 colors each having one cell?
        && rest.filter((number) => number === 1).length === 3) {
        // give birth to the fourth non-present here color
        return rest.findIndex((number) => number === 0) + 1;
    }

    // living central cell

    // if there is living cell in the central point, make it stay alive when 2 or 3 neighbours
    if (centralPoint !== 0 && (totalNumberOfAlive === 2 || totalNumberOfAlive === 3)) {
        return centralPoint;
    }
    return 0;
}

/**
 * Basic logic function saying if pixel should be turned on or off.
 */
function turnOnOrOffQuadLife(i, j, oldPixels, height, width) {
    let aliveNeighboursByColor = [0, 0, 0, 0, 0];

    const validXCoordinate = makeValidatorForRange(0, width - 1);
    const validYCoordinate = makeValidatorForRange(0, height - 1);

    const validCoordinates = ([x, y]) => (
        validXCoordinate(x) && validYCoordinate(y)
    );

    // firstly, scan the vicinity, and filter points if out of bounds,
    // then calculate how many cells are in the vicinity for a given color

    aliveNeighboursByColor = aliveNeighboursByColor.map((colorSum, colorIdx) => vectorsToCheck
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
    return quadLifeRule(aliveNeighboursByColor, oldPixels, i, j);
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
            (pixel, j) => turnOnOrOffQuadLife(i, j, oldPixels, height, width),
        ),
    );

    return newPixels;
}

const state = {
    pixels: randomPixelsQuadLife(100, 100),
    interval: null,
};

const getters = {
    pixel: (s) => (i, j, col) => s.pixels[i][j][col],
};

const mutations = {
    stepForward(s) {
        s.pixels = evolve(s.pixels);
    },

    setInterval(s, intrvl) {
        s.interval = intrvl;
    },
};

const actions = {
    stepForward({ commit }) {
        commit('stepForward');
    },

    start({ commit, state: s, dispatch }) {
        if (!s.interval) {
            commit('setInterval', setInterval(() => dispatch('stepForward', 100)));
        }
    },

    stop({ commit, state: s }) {
        if (s.interval) {
            clearInterval(s.interval);
            commit('setInterval', null);
        }
    },

    toggleStart({ state: s, dispatch }) {
        if (s.interval) {
            dispatch('stop');
        } else {
            dispatch('start');
        }
    },
};

export default {
    namespaced: true,

    state,
    getters,
    mutations,
    actions,
};
