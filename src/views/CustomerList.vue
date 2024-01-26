<template>
<div class="container mt-5 text-start">
  <h1>Customers across your stores</h1>
  <div class="mb-3 fs-5">Search for customers</div>
  <div v-for="(customer, index) in customers" :key="index">
      <!-- {{ customer }} -->
      <div class="st_customer_card mb-3">
        <div class="st_dummy_profile_thumb" :style="`background: ${customer.profileThumbBgColor}`">{{ customer.name.split(" ")[0][0] }}</div>
        <div class="st_cc_content">
          <div class="st_cc_stuff">
            <span class="fs-3">{{ customer.name }}</span>
            <span class="fs-6">{{ customer.email }} - {{ customer.contact }}</span>
          </div>
          <div class="st_cc_stuff_2">
            <i v-if="customer.contact" class="bi bi-telephone-fill"></i>
            <i v-if="customer.contact" class="bi bi-whatsapp"></i>
            <i v-if="customer.email" class="bi bi-envelope-fill"></i>
          </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import  axios from 'axios'
  export default {
    data(){
      return{
        user: '',
        customers: [],
      }
    },
    methods:{
      async getUser(){
                const token = localStorage.getItem("uselessToken");
                const headers = {
                    Authorization: `JWT ${token}`
                }
                try{
                    const response = await axios.get(`${this.api_url}/get-user`, {headers});
                    this.user = response.data.user;
                    this.customers = response.data.user.customers;

                    this.isRealUser = true;
                    this.currentStore = this.user.stores[0];
                    console.log(this.user);
                }
                catch(error){
                    console.log(error);
                }
            },
    },
    mounted(){
      this.getUser();
    }
  }
</script>

<style scoped>
.st_customer_card{
  display: flex;
  flex-direction: row;
  align-items: center;
  /* border: 1px solid red; */
  background: #efefee71;
  border-radius: 10px;
  padding: 10px;
  gap: 10px;
  border: 1px solid transparent;
}
.st_customer_card:hover{
  border: 1px solid #0000001f;
}
.st_cc_content{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid green; */
  width: 90%;
}

.st_cc_stuff{
  display: flex;
  flex-direction: column;
}
.st_dummy_profile_thumb{
    background: #0e26af;
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    border-radius: 20%;
    color: #fff;
}

.bi{
  font-size: 25px;
  background: #00ff6625;
  padding: 10px;
  border-radius: 10px;
  height: 50px;
  width: 50px;
  text-align: center;
  color: #095d2c;
}
.st_cc_stuff_2{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* border: 1px solid red; */
  gap: 10px;
}
</style>