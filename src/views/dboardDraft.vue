
<template>
    <Loader v-if="loading"/>
    <LeftNav/>
    <!-- modal to select customer starts here.... -->
    <div v-if="customersModalActive" class="customersModal" style="">
        <div class="customersModal_inner"  style="">
            <div class="modal_header fs-2">
                <div class="">Select a customer</div>
                <span class="close_btn" @click="customersModalActive = !customersModalActive">&times;</span>
            </div>
            <div class="modal_inner_body" style="
            overflow-y: scroll;
            border-radius: 0px 0px 10px 10px;
            height: 100% !important;">
                <div v-for="(customer, index) in user.customers" @click="selectUser(customer.name, customer.email, customer.contact)" :key="index" class="d-flex flex-row justify-content-start p-3 align-items-center gap-3 border-bottom st_customer_line">
                    <!-- {{ customer }} -->
                    <!-- <i class="bi bi-person-circle"></i> -->
                    <div class="st_dummy_profile_thumb" :style="`background: ${customer.profileThumbBgColor}`">{{ customer.name.split(" ")[0][0] }}</div>
                    <div style="height: 100%;">
                        <div class="fs-5">{{ customer.name }}</div>
                        <small>{{ customer.email }}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- modal to select customer ends here..... -->
    
    
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
    
    <!-- modal to add a new activity starts here........ -->
    <div v-if="activityModal" class="st_modal_container">
        <div class="st_modal">
            <div class="modal_header fs-2">
                <span>Record an activity</span>
                <span class="close_btn"  @click="activityModal = !activityModal">&times;</span>
            </div>
            <div class="st_modal_content">
            <form @submit.prevent="newActivity">
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
                <div class="st_modal_footer">
                    <button class="btn btn-danger" @click="activityModal = !activityModal">close</button>
                    <button type="submit" style="background: #8a2be2 !important; color: #fff;" class="btn">Add Activity</button>
                </div>
            </form>
            </div>
        </div>
    </div>
    <!-- modal to add a new activity ends herer......... -->
    
    <!-- modal form to add a new customer starts here........ -->
    <div v-if="newCustomerModal" class="st_modal_container">
        <div class="st_modal">
            <div class="modal_header fs-3">
                <span>Add a new customer to your store</span>
                <span class="close_btn"  @click="newCustomerModal = !newCustomerModal">&times;</span>
            </div>
            <div class="st_modal_content">
            <form @submit.prevent="newCustomer">
                <div class="">
                    <label for="customerInput" class="form-label">Customer Name*</label>
                    <input type="name" class="form-control mb-2" v-model="customer.name" id="customerInput" required>
                    
                        <div class="mb-2">
                            <label for="customerInput" class="form-label">Customer email</label>
                            <input type="email" class="form-control" v-model="customer.email" id="customerInput">
                        </div>
                        <div class="mb-2">
                            <label for="customerInput" class="form-label">Customer contact</label>
                            <input type="contact" class="form-control" v-model="customer.contact" id="customerInput">
                        </div>
                </div>
                <div class="st_modal_footer">
                    <button class="btn btn-danger" @click="newCustomerModal = !newCustomerModal">close</button>
                    <button type="submit" style="background: #8a2be2 !important; color: #fff;" class="btn">Save Customer</button>
                </div>
            </form>
            </div>
        </div>
    </div>
    <!-- modal to add a new activity ends herer......... -->
    
    
    
    <div v-if="!loading" class="container pt-5 px-5 text-start">
            <h1 class="fw-bolder">Dashboard</h1>
            <!-- {{ user }} -->
            <div class="db_stat_row align-items-start mt-5 justify-content-between">
                <div class="total_sales ">
                    <div class="db_stat_title">Total Sales Today</div>
                    <div class="d-flex align-items-end db_stat_number fw-bolder">
                        <i class="bi bi-currency-dollar"></i>
                        <div v-if="totalIsLoading">Loading...</div>
                        <div v-if="total_income && !totalIsLoading" class="">{{ total_income.today }}
                            <span style="font-size: 15px !important; color: red;">{{ total_expenses.today }}</span>
                        </div>
                    </div>
                </div>
    
                <button class="btn" style="background: blueviolet; color: #fff" @click="activityModal = !activityModal">+ New Activity</button>
            </div>
    
            <div class="db_stat_row">
                <div class="dashboard_stat">
                    <i class="bi bi-box2-fill"></i>
                    <div class="dashboard_stat_inner">
                        <div class="db_stat_number">{{total_income.allProducts}}</div>
                        <div class="db_stat_title">Products Sold</div>
                    </div>
                </div>
    
                <div class="dashboard_stat">
                    <i class="bi bi-people-fill"></i>
                    <div class="dashboard_stat_inner" v-if="user.customers">
                        <div class="db_stat_number">{{ user.customers.length }}</div>
                        <div class="db_stat_title">New Customers</div>
                    </div>
                </div>
    
                <div class="dashboard_stat">
                    <i class="bi bi-shop"></i>
                    <div class="dashboard_stat_inner">
                        <div class="db_stat_number">{{ user.stores.length }}</div>
                        <div class="db_stat_title">Stores owned</div>
                    </div>
                </div>
    
                <div class="dashboard_stat">
                    <i class="bi bi-eye-fill"></i>
                    <div class="dashboard_stat_inner">
                        <div class="db_stat_number">0</div>
                        <div class="db_stat_title">Stores visits</div>
                    </div>
                </div>
            </div>
    
            <div class="db_stats mt-5">
                <h4>Recent Activities...</h4>
                <div class="db_record_stat">
                    <!-- for(i = 0; i isLessTh) -->
                    <div v-for="(activity, activityIndex) in userActivity.slice(0, 5)" :key="activityIndex">
                        <RouterLink :to="'/activity/' + activity._id" target="_blank" style="text-decoration: none !important;">
                            <div class="record" :class="activity.type" >
                                <div class="record_sale_first">
                            <!-- {{ activity }} -->
                                    <div>
                                        <i class="bi bi-bag-check-fill" style="color: green;" v-if="activity.type == 'income'"></i>
                                        <i class="bi bi-bag-dash-fill" style="color: red" v-if="activity.type == 'expense'"></i>
                                    </div>
                                    <div>{{ activity.customer.name }} - <span v-if="activity.customer">{{activity.product.name.slice(0,12) }}..</span></div>
                                </div>
                                <i class="bi bi-caret-right-fill"></i>
                            </div>
                        </RouterLink>
                    </div>
                </div>
            </div>
    
            <RouterLink to="/activities">See all Activities</RouterLink>
    
    
            <div class="db_header mt-5">
                <h4>Quick Actions</h4>
                <div class="d-flex flex-row gap-3">
                    <button class="btn btn-primary"><i class="bi bi-box2-fill"></i>  Add New Product</button>
                    <button class="btn btn-primary"  @click="newCustomerModal = !newCustomerModal"><i class="bi bi-people-fill"></i> Add New Customer</button>
                    <button class="btn btn-primary" @click="newStoreModal = !newStoreModal"><i class="bi bi-people-fill"></i> Create New Store</button>
                </div>
                <br/>
                <h4>Your Stores</h4>
                <div v-for="store in user.stores">
                    <RouterLink :to="'/stores/' + store._id">{{ store.name }}</RouterLink>
                </div>
    
            </div>
    
            <div class="db_header mt-5">
                <h4><i class="bi bi-pin"></i> Latest from Storre</h4>
                <div class="card text-bg-dark mb-3" style="max-width: 18rem;">
                <div class="card-header">Header</div>
                <div class="card-body">
                    <h5 class="card-title">Dark card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                </div>
            </div>
    
    </div>
    </template>
    
    <script>
    import axios from 'axios';
    import Loader from '../components/Loader.vue'
    import LeftNav from '../components/LeftNav'
    
    
        export default {
            components:{
                Loader, LeftNav
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
    .st_modal_container{
        overscroll-behavior-y: none;
    }
    .container{
        background: #fff !important;
    }
    :root {
        --blue: #8a2be2;
    }
    
    
    /* ------------------------------ */
    .income{
        background: #d9ffde;
        color: #062f13 !important;
    }
    .expense{
        background: #ffd9d9;
        color: #2f0606 !important;
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
        padding: 10px;
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
            /* border: 1px solid #9e9e9e; */
            box-shadow: 1px 1px 4px #9e9e9e;
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
            background:#f6f6f6;
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
    
        .st_customer_line{
    
        }
    
        .st_customer_line:hover{
            background: #efefef;
        }
    
    .customersModal{
        z-index: 99;
        height: 100dvh;
        position: fixed;
        width: 100%; top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #00000078;
    }
    
    .customersModal_inner{
        height: 300px;
        width: 400px; 
        background: #fff;
        display: flex;
        flex-direction: column;
        text-align: left;
    }
    
    .st_dummy_profile_thumb{
        background: #8a2be2;
        height: 50px;
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        border-radius: 20%;
        color: #fff;
    }
    </style>
    