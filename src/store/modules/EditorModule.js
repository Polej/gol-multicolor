const state = {
    B: Array(9),
    S: Array(9),
};

const getters = {};

const mutations = {
    setB: (s, index) => {
        s.B[index] = 1;
    },
    unsetB: (s, index) => {
        s.B[index] = 0;
    },

    setS: (s, index) => {
        s.S[index] = 1;
    },
    unsetS: (s, index) => {
        s.S[index] = 0;
    },
};

const actions = {};

export default {
    namespaced: true,

    state,
    getters,
    mutations,
    actions,
};
