import Vue from 'vue';
import VDragged from 'v-dragged';
import App from './App.vue';

import store from './store';

import '../assets/app.css';

Vue.use(VDragged);

/* eslint-disable-next-line no-new */
new Vue({
    store,
    el: '#app',
    render: (h) => h(App),
});
