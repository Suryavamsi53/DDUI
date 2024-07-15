import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import Databases from '@/components/Databases.vue';
import Contact from '@/components/Contact.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: 'component/Databases',
      name: 'Databases',
      component: Databases
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }
  ]
});
