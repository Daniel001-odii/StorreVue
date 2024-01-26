<template>
  <Loader v-if="loading"/>
  
<div class="container mt-5 text-start">
  <LeftNav/>
  <h1>Your Activities</h1>
  <!-- {{ userActivity }} -->

<ul class="nav nav-underline justify-content-center mb-4">
  <li class="nav-item">
    <a class="nav-link active" aria-disabled="true">All</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#" aria-current="page">Sales</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Expenses</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Deleted</a>
  </li>
</ul>

<div class="d-flex flex-row-reverse align-items-center justify-content-center  mt-3" style="width: 350px;">
  <form class="form" style="width: 100%;">
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">
        <i class="bi bi-search"></i>
      </span>
      <input type="search" class="form-control" placeholder="Search for activities" aria-label="activitySearch" aria-describedby="basic-addon1">
    </div>
  </form>
</div>

<div v-for="(activity, index) in userActivity" :key="index" class="d-flex flex-row my-3  gap-0 row-gap-3 p-2 align-items-center  st_activity">
  <div class="d-flex  flex-column st_line ps-3">
    <div class="d-flex fs-4 fw-bold flex-row justify-content-between">
      <div>{{ activity.customer.name }}</div>
      <div>#{{ formatCurrency(activity.amount) }}</div>
    </div>

    <div class="d-flex fs-5 flex-row justify-content-between">
      <div class="">{{ activity.product.name }}</div>
      <div class="d-flex flex-row gap-0 row-gap-3" style="gap: 5px !important">
        <div>
          <div class="badge text-bg-success" v-if="activity.paymentStatus == 'paid'">{{ activity.paymentStatus }}</div>
          <div class="badge text-bg-danger" v-if="activity.paymentStatus == 'unpaid'">{{ activity.paymentStatus }}</div>
        </div>
        <div>
          <div v-if="activity.activityType == 'income'" class="badge text-bg-success">{{ activity.activityType }}</div>
          <div v-if="activity.activityType == 'expense'" class="badge text-bg-danger">{{ activity.activityType }}</div>
        </div>
      </div>
    </div>
    <div class="d-flex fs-6 flex-row justify-content-between">
      <div class="text-black-50">{{ formatTimestamp(activity.date) }}</div>
    </div>
  </div>
  <div class="dropdown">
    <button class="btn ms-3 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <!-- <i class="bi bi-three-dots"></i> -->
  </button>
  <ul class="dropdown-menu">
    <li><RouterLink class="dropdown-item" :to="'/activity/' + activity._id"><i class="bi bi-receipt-cutoff"></i> View</RouterLink></li>
    <li><RouterLink class="dropdown-item" :to="'/activity/' + activity._id"><i class="bi bi-pencil-fill"></i> Edit</RouterLink></li>
    <li @click="deleteActivity(activity._id)"><i class="bi bi-trash-fill"></i> Delete</li>
  </ul>
  </div>

<hr/>
</div>

</div>
</template>

<script>
import axios from 'axios'
import Loader from '@/components/Loader.vue';
import LeftNav from '@/components/LeftNav.vue'

  export default {
    components:{
      Loader, LeftNav
    },  
    data(){
      return{
        user: '',
        userActivity: '',
        loading: null,
        currentStore: '',
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
                    this.currentStore = this.user.stores[0]._id;
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

      // get all users activities....
      async getActivities(){
        this.loading = true;
                const token = localStorage.getItem("uselessToken");
                const headers = {
                    Authorization: `JWT ${token}`
                }
                try{
                    const response = await axios.get(`${this.api_url}/activities/store/${this.currentStore}`, {headers});
                    this.userActivity = response.data.allActivities.reverse();
                    console.log(response);
                    // now get all users total...
                    // loading...
                    this.loading = false;
                }
                catch(error){
                  console.log(error);
                  this.loading = false;
                }
       },

      // delete an activity...
      async deleteActivity(activityId){
        const token = localStorage.getItem("uselessToken");
                const headers = {
                    Authorization: `JWT ${token}`
                }
        try{
          const response = await axios.delete(`${this.api_url}/activities/${this.currentStore}/${activityId}`, {headers});
          console.log(response)
        }
        catch(error){

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
      // this.getActivities();
    }
  }
</script>

<style scoped>
  .st_line{
    /* border: 1px solid red; */
    width: 100%;
  }

  .st_activity{
    border-radius: 10px;
    border: 1px solid #efefef;
  }

  .st_activity:hover{
    background: #f9f9f9;

  }
</style>