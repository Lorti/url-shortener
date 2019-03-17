import Vue from 'vue';
import VueApollo from 'vue-apollo';
import VueRouter from 'vue-router';

import ApolloClient from 'apollo-boost';

import App from './App.vue';
import Form from './components/Form';
import Redirector from './components/Redirector';

Vue.use(VueApollo);
Vue.use(VueRouter);

const apolloClient = new ApolloClient({
  uri: 'YOUR_GRAPHCMS_ENDPOINT',
  headers: {
    Authorization: 'Bearer YOUR_PERMANENT_AUTH_TOKEN'
  }
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

const router = new VueRouter({
  routes: [
    { path: '/', component: Form },
    { path: '/:url', component: Redirector, props: true }
  ]
});

Vue.config.productionTip = false;

new Vue({
  apolloProvider,
  router,
  render: h => h(App)
}).$mount('#app');
