
<template>
    <Loader v-if="loading"/>
    <!-- modal components starts here-------- -->
        <!-- modal to add a new activity starts here........ -->
        <div v-if="activityModal" class="st_modal_container">
            <div class="st_modal">
                <div class="modal_header">
                    <span>Record an activity</span>
                    <span class="close_btn"  @click="activityModal = !activityModal">&times;</span>
                </div>
                
                <form @submit.prevent="newActivity">
                    <div class="st_modal_content">
                    <div class="mb-2">Select activity type</div>
                    <div class="mb-4">
                        <input type="radio" class="btn-check" value="income" v-model="activity.type"  name="activity-type" id="option1" required>
                        <label class="btn btn-outline-success" style="margin-right: 5px;" for="option1"><i class="bi bi-bag-plus-fill"></i> Income</label>
        
                        <input type="radio" class="btn-check" value="expense" v-model="activity.type"  name="activity-type" id="option2" required>
                        <label class="btn btn-outline-danger" for="option2"><i class="bi bi-bag-dash-fill"></i> Expense</label>
                    </div>
        
                    <div class="my-4">
                        <label for="amountInput" class="form-label">Amount</label>
                        <input type="number" class="form-control" id="amountInput" v-model="activity.amount" required="true">
                    </div>
                    <div class="my-4" style="border: 1px solid #efefef; padding: 10px;">
                        <label for="customerInput" class="form-label">Add new customer or <span style="text-decoration: underline; color: blue; cursor: pointer;" @click="customersModalActive = !customersModalActive">select from existing</span></label>
                        <input type="name" class="form-control" v-model="activity.customer.name" id="customerInput"  placeholder="name" required>
                        <span class="fs-5" style="font-size: 12px !important"><i class="bi bi-info-circle-fill" style="color: green"></i> Leave blank if you dont have customer's contact information</span>
        
                        <div v-if="moreCustomerDetails" class="my-2 ml-3 d-flex flex-column gap-3">
                            <div>
                                <label for="customerInput" class="form-label">Customer email</label>
                                <input type="email" class="form-control"  placeholder="email" v-model="activity.customer.email" id="customerInput">
                            </div>
                            <div>
                                <label for="customerInput" class="form-label">Customer contact</label>
                                <input type="contact" class="form-control" placeholder="phone number" v-model="activity.customer.contact" id="customerInput">
                            </div>
                        </div>
                        <div class="mt-3" @click="moreCustomerDetails = !moreCustomerDetails">
                            <span v-if="!moreCustomerDetails"><i class="bi bi-plus-lg"></i> More</span>
                            <span v-if="moreCustomerDetails"><i class="bi bi-dash-lg"></i> Less</span>
                            details
                        </div>
                    </div>
                    <div class="my-4">
                        <label for="productInput" class="form-label">Add new product or select from existing</label>
                        <input type="text" class="form-control" v-model="activity.productName" id="productInput" required>
                    </div>
                    <div class="mb-4">
                        <div class="mb-2">Select payment status</div>
                        <input type="radio" class="btn-check" value="paid" v-model="activity.paymentStatus" name="options-base" id="option5" required>
                        <label class="btn btn-outline-success" style="margin-right: 5px;" for="option5">Paid</label>
        
                        <input type="radio" class="btn-check" value="unpaid"  v-model="activity.paymentStatus" name="options-base" id="option6" required>
                        <label class="btn btn-outline-danger" for="option6">Unpaid</label>
                    </div>
                    <div class="my-4">
                        <label for="productInput" class="form-label">Date of activity</label>
                        <input type="date" :max="getCurrentDate" v-model="activity.date" class="form-control" required>
                    </div>
                    </div>
                    <div class="st_modal_footer">
                        <button class="btn btn-danger" @click="activityModal = !activityModal">close</button>
                        <button type="submit" style="background: #8a2be2 !important; color: #fff;" class="btn">Add Activity</button>
                    </div>
                </form>
                
            </div>
        </div>
        <!-- modal to add a new activity ends herer......... -->
    <!-- modal components ends here-------- -->
    
    <div class="" style="max-width: 1920px; margin: 0 auto;">
        <div class="" style="
        display: flex;
        flex-direction: row;">
            <LeftNav/>
            <div class=" " v-if="!loading" style="
            height: 100dvh;
            /* border: 1px solid red; */
            width: 100%;
            display: flex;
            flex-direction: column;">
                <div class="top_nav" style="
            padding: 20px 30px;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            gap: 15px;">
                <button style="
                border-radius: 10px;
                background: #12BC95;
                border: none;
                color: #fff;
                font-size: 16px;
                font-weight: 700;
                display: flex;
                flex-direction: row;
                gap: 10px;
                align-items: center;
                padding: 10px 20px;">
                <i class="bi bi-star-fill" style="font-size: 16px;"></i>Upgrade your plan
                </button>
                <div class="st_nav_icon" style="">
                    <i class="bi bi-search" style="font-size: 16px;"></i>
                </div>
                <div class="st_nav_icon" style="">
                    <i class="bi bi-bell" style="font-size: 16px;"></i>
                </div>
                </div>
                <div class="st_page_container" style="
                display: flex;
                flex-direction: row;
                justify-content: space-evenly;
                overflow-y: scroll;
                /* border: 1px solid green; */
                align-items: flex-start;
                ">
                <!-- <div class="inner" style="border: 1px solid red;"> -->
                    <div class="inner_first" style="
                    width: 70%;
                    /* max-width: 640px; */
                    text-align: left;
                    ">
                        <div class="welcome_area" style="text-align: left;">
                            <!-- <span style="font-size: 18px; font-weight: 400;">Welcome back,</span>
                            <div style="font-size: 40px; font-weight: 700;">{{ user.username }}</div> -->
                            <h1>Notifications</h1>
                        </div>
                        <div class="skeleton-loader" style="
                        border-radius: 20px;
                        display: flex;
                        align-items: left;
                        flex-direction: column;
                        text-align: left;
                        padding: 20px 30px;
                        width: 100%;
                        border: 1px solid #efefef;">
                            <!-- <span>TODAY's REVENUE</span> -->
                            <!-- <div class="big_sales">
                                <span style="font-size: 40px; font-weight: 600">${{ total_income.today }}</span>
                                <span style="font-size: 16px; color: red;">-{{ total_expenses.today }}</span>
                            </div> -->
                        </div>
                        <div class="stats_area" style="display: flex;
                        flex-direction: row;
                        gap: 10px;
                        margin: 20px 0px;">
                        <div class="skeleton-loader2"></div>
                        <div class="skeleton-loader2"></div>
                        <div class="skeleton-loader2"></div>
                        </div>

                        <div style="height: 28px; width: 200px; border: 1px solid #efefef; border-radius: 10px;" class="skeleton-loader"></div>
    
                        <!-- Recent activity and new order button starts here -->
                        <div class="st_line" style="
                        margin-top: 30px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        /* border: 1px solid red; */
                        margin-bottom: 10px;
                        flex-direction: row;">
                            <span style="font-size: 20px; font-weight: 700; color: #8A8A8A;">RECENT ACTIVITIES</span>
                        </div>
                        <!-- Recent activity and new order button ends here -->
    
                        <!-- activity records details starts here -->
                        <div class="activity_scroll" style="">
                        <div class="activity_date" style="font-weight: 700; border-bottom: 1px solid #D2D2D2; padding-bottom: 20px;" v-if="userActivity">TODAY</div>
    
                        <!-- activity line starts here---------------- -->
                        <div v-for="box in 2">
                            <div class="skeleton-loader mb-3" style="width: 100%; height: 80px !important; border: 1px solid #efefef; border-radius: 10px;"></div> 
                        </div>
                        
                        <!-- activity line ends here---------------- -->
                    </div>
                    </div>
                <!-- </div> -->
                    
                    <div class="inner_second skeleton-loader" style="
                    width: 300px;
                    height: 600px;
                    border: 1px solid #efefef;
                    border-radius: 20px;">
                    </div>
                </div>
            </div>
           
        </div>
    
    </div>
    
    </template>
    
    <script>
    import axios from 'axios';
    import Loader from '../components/Loader.vue'
    import LeftNav from '../components/LeftNav'
    import StatBox from '@/components/StatBox.vue';
    
    
        export default {
            components:{
        Loader, LeftNav,
        StatBox
    },
            data(){
                return{
                    user: '',
                    currentStore: '',
                    activity: {
                        amount: '',
                        type: '',
                        customer: {},
                        productName: '',
                        paymentStatus: '',
                        date: ''
                    },
                    // activityIndex: 3,
                    activityModal: false,
                    userActivity: '',
                    total_income: {},
                    total_expenses: {},
                    totalIsLoading: false,
    
                    moreCustomerDetails: false,
                    customersModalActive: false,
                    newCustomerModal: false,
                    newStoreModal: false,
    
                    customer: {
                        name: '',
                        email: '',
                        contact: '',
                        handle: '',
                    },
    
                    store: {
                        name: '',
                    },
                    loading: true,
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
                    // loader....
                    this.loading = true;
                
                    const token = localStorage.getItem("uselessToken");
                    const headers = {
                        Authorization: `JWT ${token}`
                    }
                    try{
                        const response = await axios.get(`${this.api_url}/get-user`, {headers});
                        this.user = response.data.user;
                        this.userSettings = this.user;
                        this.isRealUser = true;
                        this.currentStore = this.user.stores[0]._id;
                        console.log(this.user);
    
                        this.getActivities();
                        this.getTotals();
    
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
                    const token = localStorage.getItem("uselessToken");
                    const headers = {
                        Authorization: `JWT ${token}`
                    }
                    try{
                        const response = await axios.get(`${this.api_url}/activities/store/${this.currentStore}`, {headers});
                        this.userActivity = response.data.allActivities.reverse();  
                        console.log("user activities:", response);
                    }
                    catch(error){
                        console.log(error);
                    }  
                },
    
                // get all activity totals....
                async getTotals(){
                    this.totalIsLoading = true;
                    const token = localStorage.getItem("uselessToken");
                    const headers = {
                        Authorization: `JWT ${token}`
                    }
                    try{
                        const response = await axios.get(`${this.api_url}/activities/${this.currentStore}/totals`, {headers});
                        this.total_income.allProducts = response.data.products;
                        this.total_income.today = response.data.todaySales;
                        this.total_income.thisWeek = response.data.thisWeekSales;
                        this.total_income.thisMonth = response.data.thisMonthSales;
                        this.total_income.thisYear = response.data.thisYearSales;
                        // expenses....
                        this.total_expenses.today = response.data.todayExpenses;
                        this.total_expenses.thisWeek = response.data.thisWeekExpenses;
                        this.total_expenses.thisMonth = response.data.thisMonthExpenses;
                        this.total_expenses.thisYear = response.data.thisYearExpenses;
                        console.log("total income: ", this.total_income);
                        this.totalIsLoading = false;
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
                        const response = await axios.post(`${this.api_url}/activities/${this.currentStore}`, this.activity, {headers});
                        // console.log(response);
                        // close the modal and reload data...
                        this.activityModal = !this.activityModal;
                    }
                    catch(error){
                        console.log(error);
                    }
                
                },
    
                // add a new customer to a specific store....
                async newCustomer(){
                    const token = localStorage.getItem("uselessToken");
                    const headers = {
                        Authorization: `JWT ${token}`
                    }
                    try{
                        const response = await axios.post(`${this.api_url}/customer/add`, this.customer, {headers});
                        console.log(response);
                        this.newCustomerModal = !this.newCustomerModal;
                    }
                    catch(error){
                        console.log(error);
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
    
                selectUser(name, email, contact){
                    this.activity.customer = {name, email, contact};
                    this.customersModalActive = false;
                    // console.log("customer details preselected..", this.activity.customer);
                },
    
                formatCurrency(value){
                    if(typeof(value) == Number){
                        const formattedValue = new Intl.NumberFormat('en-US').format(value);
                        return formattedValue;
                    } 
                    return 0
                },
    
                formatTimestamp(timestamp) {
                    const date = new Date(timestamp);
                    const options = { year: "numeric", month: "long", day: "numeric" };
                    return date.toLocaleDateString(undefined, options);
                },
    
            },
    
            computed(){
                // createProfileImg(){};
            },
    
            mounted(){
                this.getUser();            
    
                // this.getUser();
                // setTimeout(() => {
                //     this.getActivities();
                //     this.getTotals();
                // }, 500);
            }
        }
    </script>
    
    <style scoped>
    @font-face {
      font-family: Raleway;
      src: url('../assets/fonts/Raleway-Medium.ttf');
    }
    
    *{
        font-family: Raleway;
    }
    
    /* width */
    ::-webkit-scrollbar {
      width: 5px !important;
    }
    
    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1; 
    }
     
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #9b9b9b; 
      border-radius: 10px;
    }
    
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555; 
    }
    
    .st_nav_icon{
        display: flex;
        height: 40px;
        width: 40px;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        border: 1px solid #efefef;
        box-shadow: 0px 4px 40px -5px rgba(0, 0, 0, 0.20);
        font-weight: bolder;
    }
    
    .activity_scroll{
       /* margin-top: 20px; */
       display: flex;
       flex-direction: column;
       /* overflow-y: scroll; */
       /* border: 1px solid red; */
       /* overflow-y: scroll; */
       /* height: 280px; */
    }
    
    .activity_line{
        display: flex;
        padding: 0px 30px;
        flex-direction: row;
        margin: 20px 0px;
        font-size: 20px;
        align-items: center;
        justify-content: space-between;
        background: red;
        border-radius: 10px;
    }
    
    .activityLine_first{
        display: flex;
        flex-direction: row;
        gap: 30px;
        align-items: center;
    }
    
    .activity_in{
        height: 60px;
        width: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 15px;border: 1px solid #efefef;
        box-shadow: 0px 8px 50px -5px #00000026;
    }




    .skeleton-loader {
      width: 630px;
      height: 130px;
      background-color: #e9e9e9; /* Light gray background color */
      animation: loadingAnimation 1s infinite; /* Animation for loading effect */
    }

    .skeleton-loader2 {
      width: 240px;
      height: 100px;
      border-radius: 10px;
      background-color: #fff; /* Light gray background color */
      animation: loadingAnimation 1s infinite; /* Animation for loading effect */
    }

    @keyframes loadingAnimation {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.7;
      }
      100% {
        opacity: 1;
      }
    }
    </style>
    