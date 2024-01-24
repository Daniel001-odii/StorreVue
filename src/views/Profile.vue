<template>

<!-- Modal -->
<div class="modal fade" id="profileSettings" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="profileSettingsLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <div>
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="profileSettingsLabel">Profile Settings</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <!-- <div>Here you ca adjust your settings...</div> -->
      <div class="modal-body">
        <form @submit.prevent="setProfile" style="text-align: left;">
            <div class="input-group g-col-3">
                <div class="mb-3 mx-1">
                    <label for="firstnameInput" class="form-label">Firstname</label>
                    <input type="text" class="form-control" id="firstnameInput" v-model="userSettings.firstname">
                </div>
                <div class="mb-3 mx-1">
                    <label for="lastnameInput" class="form-label">Lastname</label>
                    <input type="text" class="form-control" id="lastnameInput" v-model="userSettings.lastname">
                </div>
            </div>
            <div class="mb-3 mx-1">
                <label for="usernameInput" class="form-label">Email</label>
                <input type="email" class="form-control" id="usernameInput" v-model="userSettings.email" disabled>
            </div>
            <div class="mb-3 mx-1">
                <label for="usernameInput" class="form-label">Username</label>
                <input type="text" class="form-control" id="usernameInput" v-model="userSettings.username">
            </div>

            <div class="input-group g-col-3">
                <div class="mb-3 mx-1">
                    <label for="bisNameInput" class="form-label">Business name</label>
                    <input type="text" class="form-control" id="bisNameInput" v-model="userSettings.business_name">
                </div>
                <div class="mb-3 mx-1">
                    <label for="contactInput" class="form-label">Contact</label>
                    <input type="text" class="form-control" id="contactInput" v-model="userSettings.contact">
                </div>
            </div>

            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Business description</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="userSettings.business_description"></textarea>
            </div>

            <select class="form-select" aria-label="Default select example">
                <option selected>Select curreny type</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button @click="setProfile" class="btn btn-primary">
            <div v-if="profileIsSaving">
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <span class="mx-2">Saving...</span>
            </div>
            <div v-if="!profileIsSaving">Save</div>
        </button>
      </div>
    </div>
  </div>
</div>
</div>


<div class="container mt-5 text-start">
        <h1 class="fw-bolder">Profile</h1>
        <div class="st_img_container mt-5">
            <div class="st_user_profile_image rounded-circle border" style="height: 100px; width: 100px;" :style="`background: url(${user.avatar_url})`"></div>
            <div>
                <h2 v-if="!user.firstname">{{ user.username }}</h2>
                <div v-else>
                    <h2>{{ user.firstname }} {{ user.lastname }}</h2>
                    <h5>{{ user.username }}</h5>
                </div>
                {{ user.email }}
            </div>
        </div>

        <div class="w-75 p-6 mt-5 st_user_profile_block">
            <!-- <button class="st_edit_profile rounded-circle border">
                <i class="bi bi-pencil-fill"></i>
            </button> -->
            <button v-if="isRealUser" class="st_edit_profile btn btn-primary" style="color: #fff;" data-bs-toggle="modal" data-bs-target="#profileSettings"><i class="bi bi-pencil-fill"></i> Edit Profile</button>

            <h2 class="fw-medium"> <i class="bi bi-person"></i> About.</h2>
            <div class="st_user_profile_details mt-3">
                <h5>{{ user.business_name }}</h5>
                <p v-if="user.business_description" style="width: 90%;">{{ user.business_description }}</p>
                <h5 v-else>No bio info yet...</h5>
                <small style="text-transform: capitalize;">{{ user.subscription }} plan <i v-if="user.subscription == 'basic'" style="color: orange" class="bi bi-stars"></i></small>
                <p> Joined: {{ formatTimestamp(user.date_joined) }}</p>
                <RouterLink v-if="!this.$route.params.username" :to="'/' + user.username" target="_blank"><i class="bi bi-eye-fill"></i> View profile as others</RouterLink>
            </div>
        </div>

        <div v-if="!strangerView" class="mt-5 st_user_profile_block">
            <h2 class="fw-medium"><i class="bi bi-shop"></i> Stores.</h2>
            <div class="st_user_profile_details mt-3">
                <div class="st_setings_content mt-3">
                    <h3 class="st_settings_title">Your stores</h3>
                    ...
                </div>
            </div>
        </div>

        <!-- <div v-if="!strangerView" class="mt-5 st_user_profile_block">
            <h2 class="fw-medium"><i class="bi bi-person-fill-gear"></i> Preferences...</h2>
            <div class="st_user_profile_details mt-3">
                <div class="st_setings_content mt-3">
                    <h3 class="st_settings_title">Notification settings</h3>
                    <div class="form-check">
                        <input class="form-check-input " type="checkbox" role="switch" id="flexSwitchCheckDefault">
                        <label class="form-check-label" for="flexSwitchCheckDefault">In app Notifications</label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input " type="checkbox" value="true" role="switch" id="emailNotifySwitch">
                        <label class="form-check-label" for="emailNotifySwitch">Email Notifications</label>
                    </div>
                </div>
            </div>
        </div> -->

        <div v-if="!strangerView" class="mt-5 st_user_profile_block mb-5">
            <h2 class="fw-medium"><i class="bi bi-person-exclamation"></i> Privacy & Account</h2>
            <div class="st_user_profile_details mt-3">
                <div class="st_setings_content mt-3">
                    <h3 class="st_settings_title">Danger Zone</h3>
                    <div>
                        <span><b>Delete my account</b></span><br/>
                            <div style="max-width: 300px;">Deleting your account will remove all of your information from our database. This cannot be undone</div><br/>
                        <button class="btn btn-danger">Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>

<script>
import axios from 'axios';

    export default {
        data(){
            return{
                user: '',
                userSettings: {
                    username: '',
                    firstname: '',
                    lastname: '',
                    email: '',
                    business_name: '',
                    business_address: '',
                    contact: '',
                    subscription: '',
                    settings: {
                        currency: '',
                    }
                },

                profileIsSaving: false,
                strangerView: false,
                isRealUser: false,
            }
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

            // get user details if the usernme is provided in url
            async getUserByUsername(){
                try{
                    const response = await axios.get(`${this.api_url}/get-username/${this.$route.params.username}`);
                    this.user = response.data.user;
                    this.userSettings = this.user;
                }
                catch(error){
                    console.log(error);
                }
            },


            // adjusts profile settings and saves to db
            async setProfile(){
                this.profileIsSaving = true;
                const token = localStorage.getItem("uselessToken");
                const headers = {
                    Authorization: `JWT ${token}`
                }
                try{
                    const response = await axios.put(`${this.api_url}/set-user/${this.user._id}`, this.userSettings, {headers});
                    console.log(response);
                    this.profileIsSaving = false;
                }
                catch(error){
                    console.log(error);
                    this.profileIsSaving = false;
                }
            },

            formatTimestamp(timestamp) {
                const date = new Date(timestamp);
                const options = { year: "numeric", month: "long", day: "numeric" };
                return date.toLocaleDateString(undefined, options);
            },
        },

        mounted(){
            if(this.$route.params.username){
                this.getUserByUsername();
                this.strangerView = true;
            } else{
                this.getUser();
                this.strangerView = false;
            }

        }
    }
</script>

<style scoped>
    .st_user_profile_image{
        background-position: center !important;
        background-size: contain !important;
        background-repeat: no-repeat !important;
    }

    .st_user_profile_block{
        /* background: #fff; */
        border: 1px solid #efefef;
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
