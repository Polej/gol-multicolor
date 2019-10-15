module.exports = {
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        'airbnb-base',
        'plugin:vue/essential',
    ],
    plugins: [
        'vue'
    ],
    env: {
        browser: true,
        node: true,
        mocha: true,
    },
    globals: {
        expect: true
    },
    rules: {
        'indent': ['error', 4],
        'no-param-reassign': [2, {"props": false}],
    },
}
