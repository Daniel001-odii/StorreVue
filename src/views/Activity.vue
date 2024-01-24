<template>

<div v-if="activityModal" class="st_modal_container">
    <div class="st_modal">
        <form @submit.prevent="newActivity">
        <div class="modal_title mb-3">Record an activity</div>
        <div>Select activity type</div>
        <div class="form-group">
            <div class="form-check">
                <input class="form-check-input" value="income" v-model="activity.activityType" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                <label class="form-check-label" for="flexRadioDefault1">Income</label>
                </div>
                <div class="form-check">
                <input class="form-check-input" value="expense" v-model="activity.activityType" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
                <label class="form-check-label" for="flexRadioDefault2">Expense</label>
            </div>
        </div>

        <div class="my-4">
            <label for="amountInput" class="form-label">Amount</label>
            <input type="number" class="form-control" id="amountInput" v-model="activity.amount">
        </div>

        <div class="my-4">
            <label for="customerInput" class="form-label">Customer</label>
            <input type="text" class="form-control" v-model="activity.customer.name" id="customerInput">
        </div>

        <div class="my-4">
            <label for="productInput" class="form-label">Product</label>
            <input type="text" class="form-control" v-model="activity.product" id="productInput">
        </div>

        <div class="mb-4">
            <div class="mb-2">Select payment status</div>
            <input type="radio" class="btn-check" value="paid" v-model="activity.paymentStatus" name="options-base" id="option5">
            <label class="btn btn-outline-success" style="margin-right: 5px;" for="option5">Paid</label>

            <input type="radio" class="btn-check" value="unpaid"  v-model="activity.paymentStatus" name="options-base" id="option6">
            <label class="btn btn-outline-danger" for="option6">Unpaid</label>
        </div>
        <div class="my-4">
            <label for="productInput" class="form-label">Date of activity</label>
            <input type="date" :max="getCurrentDate" v-model="activity.date" class="form-control">
        </div>
        </form>
        <div class="st_modal_footer">
            <button type="submit" class="btn btn-danger" @click="activityModal = !activityModal">close</button>
            <button @click="newActivity" style="background: #8a2be2 !important; color: #fff;" class="btn">Add Activity</button>
        </div>
    </div>

</div>

<div class="container mt-5 text-start">
        <h1 class="fw-bolder">Activity Details</h1>
        <p v-if="isLoading">Loading...</p>
        <div v-if="!isLoading">

        <p>activity {{ this.$route.params.activityId }}</p>
        <div>
            <!-- <span class="badge text-bg-success">{{ userActivity.paymentStatus }}</span> -->

            <h3>{{ userActivity.product }}</h3>
            <h3>#{{ userActivity.amount }}</h3>
            <div class="d-flex" :class="userActivity.activityType ">{{ userActivity.activityType }}</div>
            <div class="d-flex tag" :class="userActivity.paymentStatus">{{ userActivity.paymentStatus }}</div>

            <h2>Customer Details</h2>
            <div v-if="userActivity.customer">
            <h3>Customer: {{ userActivity.customer.name }}</h3>
            <h5>Email: {{ userActivity.customer.email }}</h5>
            <h5>Handle: {{ userActivity.customer.handle }}</h5>
            <h5>Phone: {{ userActivity.customer.contact }}</h5>
            <h5>{{ userActivity.date }}</h5>
            </div>
        </div>

        <!-- {{ userActivity }} -->
        </div>
</div>
</template>

<script>
import axios from 'axios';

    export default {
        data(){
            return{
                user: '',
                activity: {
                    amount: '',
                    activityType: '',
                    customer: {},
                    product: '',
                    paymentStatus: '',
                    date: ''
                },
                activityModal: false,
                userActivity: '',

                isLoading: null,
            }
        },
        computed:{
            getCurrentDate() {
            const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in 'YYYY-MM-DD' format
            return currentDate;
            },
        },
        methods:{
            // gets user details via api
            async getUser(){
                const token = localStorage.getItem("uselessToken");
                const headers = {
                    Authorization: `JWT ${token}`
                }
                try{
                    const response = await axios.get(`${this.api_url}/get-user`, {headers});
                    this.user = response.data.user;
                    this.userSettings = this.user;
                    this.isRealUser = true;
                }
                catch(error){
                    console.log(error);
                }
            },

            // record new activity...
            async newActivity(){
                const token = localStorage.getItem("uselessToken");
                const headers = {
                    Authorization: `JWT ${token}`
                }

                try{
                    console.log(this.activity)
                    const response = await axios.post(`${this.api_url}/activity`, this.activity, {headers});
                    console.log(response);
                    this.activityModal = !this.activityModal;
                    this.getActivityById();
                }
                catch(error){
                    console.log(error);
                }
            },

            // get all users activities....
            async getActivityById(){
                this.isLoading = true;
                const token = localStorage.getItem("uselessToken");
                const headers = {
                    Authorization: `JWT ${token}`
                }
                try{
                    const response = await axios.get(`${this.api_url}/activity/${this.$route.params.activityId}`, {headers});
                    this.userActivity = response.data.activity;
                    console.log(response);
                    this.isLoading = false;
                }
                catch(error){
                    this.isLoading = false;
                }
            },

            formatTimestamp(timestamp) {
                const date = new Date(timestamp);
                const options = { year: "numeric", month: "long", day: "numeric" };
                return date.toLocaleDateString(undefined, options);
            },

        },

        mounted(){
            this.getActivityById();
        }
    }
</script>

<style scoped>
:root {
    --blue: #8a2be2;
}

.paid{
    background: green;
    color: #fff;
    padding: 3px 10px;
    border-radius: 5px;
}

.unpaid{
    background: red;
    color: #fff;
    padding: 3px 10px;
    border-radius: 5px;
}


.st_modal_container{
    width: 100%;
    background: #212529a8;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 9999999999999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.st_modal{
    /* height: 80vh; */
    width: 500px;
    background: #fff;
    padding: 15px;
    border-radius: 10px;
    text-align: left;
    /* justify-content: space-between; */
    align-items: space-between;
}
.modal_title{
    font-size: 20px;
    font-weight: bolder;
    border-bottom: 1px solid #efefef;
}
.st_modal_footer{
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    /* border: 1px solid red; */
}

/* ------------------------------ */
.income{
    background: #d9ffde;
    color: #062f13 !important;
}
.expense{
    border: 2px solid #ffd9d9;
    border-radius: 10px;
    color: #2f0606 !important;
    padding: 10px;
    max-width: 200px;
}
.record_sale_first{
    gap: 15px;
    display: flex;
    flex-direction: row;
}

.db_record_stat{
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 300px;
    overflow-y: scroll;
}
    .record{
        display: flex;
        flex-direction: row;
        gap: 10px;
        font-size: 20px;
        padding: 15px;
        border-radius: 10px;
        justify-content: space-between;
        border: 1px solid transparent;
    }
    .record:hover{
        border: 1px solid #9e9e9e;
    }
    .db_stat_row{
        display: flex;
        flex-direction: row;
        /* border: 1px solid red; */
        justify-content: flex-start;
        gap: 10px;
        margin-top: 20px;
        flex-wrap: wrap;
    }
    .dashboard_stat{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        background:#e5e5e5;
        width: 250px;
        border-radius: 20px;
        padding: 8px 20px;
        gap: 10px;
        /* text-transform: uppercase; */
    }

    .dashboard_stat > i{
        font-size: 35px;
    }
    .db_stat_number{
        font-size: 35px;
    }
    .st_user_profile_image{
        background-position: center !important;
        background-size: contain !important;
        background-repeat: no-repeat !important;
    }

    .st_user_profile_block{
        background: #fff;
        border-radius: 10px;
        padding: 20px;
        width: 100% !important;
        position: relative;
    }

    .st_img_container{
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        gap: 15px;
    }

    .st_edit_profile{
        /* height: 30px; */
        /* width: 30px; */
        position: absolute;
        right: 20px;
        /* display: flex; */
        /* align-items: center; */
        /* justify-content: center; */
    }

    .st_user_profile_details{
        border-top: 1px solid #efefef;
        padding-top: 10px;
        position: relative;
    }

    .st_setings_content{
        font-size: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-left: 20px;
        /* margin-top: 50px; */
    }

    .st_settings_title{
        color: #6b0ea4;
    }
</style>
