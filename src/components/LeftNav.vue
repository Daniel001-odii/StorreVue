<template>
    <div class="st_left_nav">
        <div class="st_nav_inner">
            <div class="st_brand" style="border: 1px solid re; height: 100px; display: flex; justify-content: flex-start; ">
                <div class="st_nav_item_title">80Leaves</div>
            </div>
            <div class="st_nav_menu">
                <RouterLink to="/dashboard">
                <div class="st_nav_item" :class="{ 'active': isOverview }">
                    <div class="st_nav_item_title"><i class="bi bi-compass"></i>Overview</div>
                </div>
                </RouterLink>
                <RouterLink to="/activities">
                <div class="st_nav_item" :class="{ 'active': isOrders }">
                    <div class="st_nav_item_title"><i class="bi bi-tags"></i>Orders</div>
                </div>
                </RouterLink>
                <RouterLink to="/customers">
                <div class="st_nav_item" :class="{ 'active': isCustomers }">
                    <div class="st_nav_item_title"><i class="bi bi-people"></i>Customers</div>
                </div>
                </RouterLink>
                <RouterLink to="/customers">
                <div class="st_nav_item" :class="{ 'active': isStores }">
                    <div class="st_nav_item_title"><i class="bi bi-shop"></i>Stores</div>
                </div>
                </RouterLink>
                <!-- <RouterLink to="/profile"> -->
                <div class="st_nav_item profile">
                    <div style="width: 100%; display: flex; justify-content: space-between;">
                        <div class="st_nav_item_title">
                            <i class="bi bi-person"></i>Profile
                        </div>
                        <i class="bi bi-caret-down"></i>
                    </div>
                    <div class="st_nav_item_sub">
                        <div class="st_sub_item" :class="{ 'active': isProfile }">Settings</div>
                        <div class="st_sub_item">Reports & Analysis</div>
                        <div class="st_sub_item">Support</div>
                    </div>
                </div>
                <!-- </RouterLink> -->
                
                <RouterLink to="/notifications">
                <div class="st_nav_item" :class="{ 'active': isNotifications }">
                    <div class="st_nav_item_title"><i class="bi bi-bell"></i>Notifications</div>
                </div>
                </RouterLink>
            </div>
        </div>
        <div class="st_user">
            <div class="st_user_thumb"></div>
            <div class="st_user_inner" style="text-align: left;">
                <b>{{user.username}}</b><br/>
                <span class="st_user_email">{{user.email}}</span>
                <!-- <div class="st_user_settings">
                    <i class="user_i bi bi-person-gear"></i>
                    <i class="user_i bi bi-box-arrow-right"></i>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

    export default {
      data(){
        return{
          isUser: false,
          user: '',
        }
      },

      computed: {
        isOverview() { return this.$route.path.startsWith("/dashboard"); },
        isOrders() { return this.$route.path.startsWith("/activities"); },
        isCustomers() { return this.$route.path.startsWith("/customers"); },
        isStores() { return this.$route.path.startsWith("/stores"); },
        isProfile() { return this.$route.path.startsWith("/profile"); },
        isNotifications() { return this.$route.path.startsWith("/notifications"); },
    },

      methods:{
        async getUser() {
          const token = localStorage.getItem('uselessToken');
          try {
            const headers = {
              Authorization: `JWT ${token}`, // Assuming it's a JWT token, use Bearer prefix
            };
            const response = await axios.get(`${this.api_url}/get-user`, { headers });
            this.user = response.data.user;
          } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 401 && token) {
                // Unauthorized error then Perform re-login
                localStorage.removeItem('uselessToken');
                this.$router.push("/login");
                alert("Your token expired, please login again")

          }
        }},

        logout(){
          localStorage.removeItem("uselessToken");
          this.$router.push('/');
          window.location.reload();
        }
      },
      mounted(){
        this.getUser();
      },
    }
</script>
<style>
.profile:hover .st_nav_item_sub{
    display: flex;
}
a{
    text-decoration: none !important;
}
/* blue 6147DB */
.bi{
    font-size: 25px;
}
.st_left_nav{
    height: 100dvh;
    /* min-height: 900px; */
    width: 350px !important;
    /* background: #6147DB; */
    background: #F5F8FF;
    /* color: #fff !important; */
    /* border-right: 1px solid red; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.st_nav_inner{
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: left;
}
.st_nav_menu{
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: left;
    text-align: left;
    width: 100% !important;
}

.st_nav_item{
    padding: 6px 0px;
    /* border: 1px solid red; */
    color: #000;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    border-right: 3px solid transparent;
}
.st_nav_item:hover{
    font-weight: bold;
    color: #000;
    background: #006eff21;
    /* border-left: 4px solid #006EFF; */
    border-radius: 10px;
}
.st_nav_item:hover .st_nav_item_sub{
    color: none !important;
}
.active{
    font-weight: bold;
    color: #ffffff !important;
    background: #006EFF !important;
    border-radius: 10px;
    border: none !important;
    /* border-right: 3px solid #12BC95; */
}
.active > .st_nav_item_title{
    /* border-left: 6px solid #12BC95; */
}

.st_nav_item_title{
    display: flex;
    gap: 15px;
    align-items: center;
    padding: 0px 10px;
}

.st_user{
    /* border: 1px solid red; */
    width: 80%;
    font-size: 16px;
    display: flex;
    /* justify-content: center; */
    flex-direction: row;
    align-items: center;
    margin-bottom: 50px;
    gap: 5px;
}

.st_user_email{
    font-size: 12px;
}

.st_nav_item_sub{
    /* border: 1px solid green; */
    align-self: flex-end;
    display: none;
    flex-direction: column;
    animation-duration: 3s;
   
    /* width: 180px; */
}
.st_sub_item{
    padding: 8px 30px;
    border-radius: 10px;
}
.st_sub_item:hover{
    color: #ffffff;
    background: #006EFF;
}
.st_user_thumb{
    height: 60px;
    width: 60px;
    background: #efefef;
    border-radius: 50%;
    margin-bottom: 10px;
}
.st_user_settings{
    margin-top: 10px;
    display: flex;
    justify-content: center;
    gap: 20px;
}
.user_i{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 1px solid #8A8A8A;
    background: #FFF;
    padding: 5px;
    font-size: 16px;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
}
</style>
