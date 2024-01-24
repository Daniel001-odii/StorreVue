import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';

import 'bootstrap-icons/font/bootstrap-icons.css';
import '../src/assets/css/style.css'

// import 'expose?$!expose?jQuery!jquery'
// import 'jquery/src/css';


// import './assets/css/style.css';
// import './assets/css/default.css';
// import './assets/css/LineIcons.css';
// import './assets/css/slick.css';
// import './assets/css/magnific-popup.css';
// import './assets/css/animate.css';


const app = createApp(App);


// Declare a global variable
app.config.globalProperties.api_url = 'http://127.0.0.1:3000/api/v1';


// createApp(App).use(store).use(router).mount('#app');
app.mixin({
    data() {
      return {
        title: 'Storre',
      };
    },
    mounted(){
      var title = this.$route.name
      document.title = title
    },
  });
  app.use(store).use(router).mount('#app');



