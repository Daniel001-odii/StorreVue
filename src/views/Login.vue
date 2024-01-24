<template>
    <div style="max-width: 400px; margin: 0 auto; text-align: left; margin-top: 110px; padding: 20px;">
        <form @submit.prevent="login">
        <h2>Storre Login</h2>

        <div class="alert alert-danger alert-dismissible fade show" v-if="error_message"  role="alert">
            <span>{{ error_message }}</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email or Username</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email or username" v-model="loginForm.usernameOrEmail" required>
            <!-- <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> -->
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="loginForm.password" required>
        </div>
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Remeber me</label>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%;">Login</button>
        </form>
        <div class="mt-3">
            Need an account? <RouterLink to="/register">Register</RouterLink>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            loginForm:{
                usernameOrEmail: '',
                password: '',
            },
            error_message: '',

        }
    },
    methods:{

        // the login function...
        async login(){
            try{
                const response = await axios.post(`${this.api_url}/login`, this.loginForm);
                // console.log(response.data.message);
                localStorage.setItem("uselessToken", response.data.token);
                window.location.reload();
            }
            catch(error){
                // console.log(error);
                this.error_message = error.response.data.message;
            }
        },
    },
    mounted(){
        if(localStorage.getItem("uselessToken")){
            this.$router.push('/dashboard');
        }
    }
}
</script>

<style scoped>

</style>