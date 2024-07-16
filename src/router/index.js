import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Databases from '@/components/Databases.vue';
import Contact from '@/components/Contact.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ddui/src/components/Databases.vue', // Corrected path for Databases.vue
    name: 'Databases',
    component: Databases
  },
  {
    path: '/contact', // Corrected path for Contact.vue
    name: 'Contact',
    component: Contact
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
