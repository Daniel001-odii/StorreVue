<template>
<Loader v-if="loading"/>

<!-- modal to create new store starts here.... -->
<div v-if="newStoreModal" class="st_modal_container">
    <div class="st_modal">
        <div class="modal_header fs-3">
            <span>Create a new store</span>
            <span class="close_btn"  @click="newStoreModal = !newStoreModal">&times;</span>
        </div>
        <div class="st_modal_content">
        <form @submit.prevent="createStore">
            <div class="mb-3">
                <label for="storeName" class="form-label">Store Name*</label>
                <input type="name" class="form-control mb-2" v-model="store.name" id="storeName" required>
            </div>
            <div class="mb-3">
                <label for="storeCategory" class="form-label">Store Category*</label>
                <input type="name" class="form-control mb-2" v-model="store.category" id="storeCategory" required>
            </div>
            <div class="st_modal_footer">
                <button class="btn btn-danger" @click="newStoreModal = !newStoreModal">close</button>
                <button type="submit" style="background: #8a2be2 !important; color: #fff;" class="btn">Create Store</button>
            </div>
        </form>
        </div>
    </div>
</div>
<!-- modal to create new store ends here..... -->



<div class="container mt-5 text-start">
  <h1>Your Stores</h1>
  <button @click="newStoreModal = !newStoreModal" class="btn btn-primary"> + New Store</button>
<!-- {{ userStores }} -->
<div class="container mt-5">
  <div style="display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 30px;" v-for="(store, index) in userStores" :key="index">
    <div>
      <div class="fs-3">{{ store.name }}</div>
      <div class="fs-5">Category: {{ store.category }}</div>
      <div class="fs-5">Total visits: {{ store.views }}</div>
      <div class="fs-6" v-if="store.total_income">Total sales: {{ formatCurrency(store.total_income) }}</div>
      <div class="fs-6" v-if="store.total_expenses" style="color: red">Total expenses: {{ formatCurrency(store.total_expenses) }}</div>
      <div class="fs-6">Products: {{ store.products.length }}</div>
      <div class="fs-6" style="color: #cacaca;">Created: {{ formatTimestamp(store.createdAt) }}</div>
      <RouterLink :to="'/stores/' + store._id">Visit Store</RouterLink>
      <!-- <span class="nav-link">visit store - edit store</span> -->
    </div>
    <span><i class="bi bi-box-arrow-up-right"></i></span>
    <br/>
  </div>
</div>



</div>
</template>

<script>
import axios from 'axios'
import Loader from '@/components/Loader.vue';

  export default {
    components:{
      Loader
    },  
    data(){
      return{
        user: '',
        userstore: '',
        loading: null,
        userDefaultStore: '',

        userStores: '',
        newStoreModal: false,

        store: {},
      }
    },
    methods:{
       // gets user details via api
       async getUser(){
                // loader....
                this.loading = true;
            
                const token = localStorage.getItem("uselessToken");
                const headers = {
                    Authorization: `JWT ${token}`
                }
                try{
                    const response = await axios.get(`${this.api_url}/get-user`, {headers});
                    this.user = response.data.user;
                    // this.userSettings = this.user;
                    // this.isRealUser = true;
                    this.userDefaultStore = response.data.user.stores[0];
                    this.userStores = response.data.user.stores;
                    console.log(this.user);
                    this.getActivities();
                    // loader...
                    this.loading = false;
                }
                catch(error){
                    console.log(error);
                    // loader...
                    this.loading = false;
                }
            },

         // creating new stores...
       async createStore(){
                const token = localStorage.getItem("uselessToken");
                const headers = {
                    Authorization: `JWT ${token}`
                }
                try{
                    const response = await axios.post(`${this.api_url}/stores/create`, this.store, {headers});
                    console.log(response);
                    this.newStoreModal = !this.newStoreModal;
                }
                catch(error){
                    console.log(error)
                }
            },

      formatCurrency(value){
          const formattedValue = new Intl.NumberFormat('en-US').format(value);
          return formattedValue;
       },

      formatTimestamp(timestamp) {
                const date = new Date(timestamp);
                const options = { year: "numeric", month: "long", day: "numeric" };
                return date.toLocaleDateString(undefined, options);
       },
    },
    mounted(){
      this.getUser();
    }
  }
</script>

<style scoped>
  .st_line{
    /* border: 1px solid red; */
    width: 100%;
  }

  .st_store{
    border-radius: 10px;
    border: 1px solid #efefef;
  }

  .st_store:hover{
    background: #f9f9f9;

  }
</style>