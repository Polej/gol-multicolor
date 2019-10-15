import Vue from 'vue';
import App from './App.vue';

import store from './store';

import '../assets/app.css';

/* eslint-disable-next-line no-new */
new Vue({
    store,
    el: '#app',
    render: (h) => h(App),
});
