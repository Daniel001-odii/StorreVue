<template>


<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Logout</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h4>{{ user.username }} are you sure you want to logout?</h4>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
        <button type="button" class="btn btn-danger" @click="logout">Yes Logout</button>
      </div>
    </div>
  </div>
</div>



<div v-if="user">
<!-- <div> -->
<nav class="navbar navbar-expand-lg">
  <div class="container">
    <RouterLink to="/" class="navbar-brand" href="#">80Leaves</RouterLink>
    <div class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <i class="bi bi-microsoft"></i>
    </div>
    <div class="collapse navbar-collapse " id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 align-items-start">
        <li class="nav-item">
          <RouterLink to="/dashboard" class="nav-link" href="#">Dashboard</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/activities" class="nav-link active" aria-current="page" href="#">Activities</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/customers" class="nav-link active" aria-current="page" href="#">Customers</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/stores" class="nav-link active" aria-current="page" href="#">Stores</RouterLink>
        </li>
        <!-- <li class="nav-item">
          <RouterLink to="/products" class="nav-link active" aria-current="page" href="#">Products</RouterLink>
        </li> -->
        <li class="nav-item dropdown">
          <RouterLink to="/" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Profile
          </RouterLink>
          <ul class="dropdown-menu">
            <li><RouterLink to="/profile" class="dropdown-item">
              Settings</RouterLink>
            </li>
            <li><RouterLink to="/reports" class="dropdown-item" href="#">
              Reports & Analysis</RouterLink>
            </li>

           <li><RouterLink to="/register" class="dropdown-item" href="#">
              Support</RouterLink>
            </li>
            <li><span data-bs-toggle="modal" data-bs-target="#exampleModal" class="dropdown-item">
              Logout</span>
            </li>
          </ul>
        </li>
      </ul>
      <span class="navbar-text d-flex flex-row justify-content-center align-items-center g-col-6">
        <div>Signed in as {{ user.username }}</div>
        <div class="st_user_thumbnail mx-3" :style="`background: url(${user.avatar_url})`"></div>
      </span>
    </div>
  </div>
</nav>
</div>

<!-- non signed in user -->
<div>
<nav class="navbar navbar-expand-lg" v-if="!user">
  <div class="container">
    <RouterLink to="/" class="navbar-brand" href="#">80Leaves</RouterLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-lg-end" id="navbarText">
      <div>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 align-items-start">
        <li class="nav-item">
          <RouterLink to="/login" class="nav-link active" aria-current="page" href="#">Login</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/register" class="nav-link" href="#">Register</RouterLink>
        </li>
      </ul>
    </div>
    </div>
  </div>
</nav>
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

<style scoped>
.st_user_thumbnail{
  height: 35px;
  width: 35px;
  /* background: red; */
  border-radius: 50%;
  background-position: center !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  border: 1px solid grey;
}
</style>