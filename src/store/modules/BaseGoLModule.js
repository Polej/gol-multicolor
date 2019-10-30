const state = (startPixels) => ({
    pixels: startPixels(100, 100),
    interval: null,
    lastI: null,
    lastJ: null,
});

const getters = (pixelStyleFunction) => ({
    pixelStyle: () => (pixel) => pixelStyleFunction(pixel),
});

const mutations = (evolveFunction, generatePixel) => ({
    stepForward(s) {
        s.pixels = evolveFunction(s.pixels);
    },

    setInterval(s, interval) {
        s.interval = interval;
    },

    addCell(s, { i, j }) {
        if (i !== s.lastI || j !== s.lastJ) {
            if (s.pixels[i]) {
                s.pixels[i].splice(j, 1, generatePixel(s));
            }

            s.lastI = i;
            s.lastJ = j;
        }
    },
});

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

export default ({
    evolve,
    generatePixel,
    startPixels,
    pixelStyle,
}) => ({
    namespaced: true,

    state: state(startPixels),
    getters: getters(pixelStyle),
    mutations: mutations(evolve, generatePixel),
    actions,
});
