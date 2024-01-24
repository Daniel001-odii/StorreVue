import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Profile from '../views/Profile.vue';
import Register from '../views/Regsiter.vue';
import Login from '../views/Login.vue';
import SignupSuccess from '../views/RegisterSuccess.vue';
import Dashboard from '@/views/Dashboard.vue';
import ActivityVue from '@/views/Activity.vue';

import ProductListVue from '@/views/ProductList.vue';
import CustomerListVue from '@/views/CustomerList.vue';
import StoresListVue from '@/views/StoresList.vue';
import StoreVue from '@/views/Store.vue';

import ActivityListVue from '@/views/ActivityList.vue';
import ReportsAnalysisVue from '@/views/ReportsAnalysis.vue';
import PageNotFound from '../views/PageNotFound.vue'

const routes = [
  {path: '/', name: 'home', component: HomeView},
  {path: '/:username', name: 'profile - public', component: Profile},


  {path: '/login', name: 'login', component: Login},
  {path: '/register', name: 'register', component: Register},
  {path: '/register/success', name: 'register success', component: SignupSuccess},

  {path: '/profile', name: 'profile', component: Profile},
  {path: '/dashboard', name: 'dashboard', component: Dashboard},
  {path: '/activity/:activityId', name: 'activity', component: ActivityVue},

  {path: '/activities', name: 'activities', component: ActivityListVue},
  {path: '/customers', name: 'customers', component: CustomerListVue},
  {path: '/stores', name: 'stores', component: StoresListVue},
  {path: '/stores/:storeId', name: 'my store', component: StoreVue},
  {path: '/products', name: 'products', component: ProductListVue},
  {path: '/reports', name: 'reports', component: ReportsAnalysisVue},

  {path: '/support', name: 'support', component: ActivityVue},

  {path: "/404", name: "PageNotFound", component: PageNotFound},
  {path: "/:catchAll(.*)", redirect: "/404"},

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



// Global navigation guard
let redirectToLogin = false; // Initialize a flag to redirect to login after authentication
let requestedRoute = null; // Initialize a variable to store the requested route

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('uselesToken');
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  if (to.meta.requiresAuth && token) {
    redirectToLogin = true; // Set the flag to true
    requestedRoute = to.fullPath; // Store the requested route
    next('/login'); // Redirect to login for unauthorized access
  } else {
    next(); // Proceed to the route
  }
});




export default router
