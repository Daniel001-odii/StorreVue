<template>
    <div style="max-width: 400px; margin: 0 auto; text-align: left; margin-top: 100px; padding: 20px;">

        <form @submit.prevent="register">
        <h2>Storre Registration</h2>
        <span v-if="formSubmissionErrors" class="text-danger">{{ formSubmissionErrors }}</span>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Username</label>
          <input type="text" class="form-control" aria-describedby="emailHelp" v-model.trim="registerForm.username" required>
          <div v-if="!isUsernameValid" class="text-danger">Username should be lowercase and without spaces.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" aria-describedby="emailHelp" v-model.trim="registerForm.email" required>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" v-model.trim="registerForm.password" required>
          <div v-if="!isPasswordValid" class="text-danger">Password should be at least 8 characters long with symbols and alphabets.</div>
        </div>
        <button type="submit" class="btn btn-primary px-4" :disabled="!isUsernameValid || !isPasswordValid">Register</button>
      </form>
    </div>
  </template>

  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        registerForm: {
          username: '',
          email: '',
          password: ''
        },

        formSubmissionErrors: '',
      };
    },
    computed: {
      isUsernameValid() {
        // Validate username: lowercase and no spaces
        return this.registerForm.username === this.registerForm.username.toLowerCase() && !/\s/.test(this.registerForm.username);
      },
      isPasswordValid() {
        // Validate password: at least 8 characters with symbols and alphabets
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        return passwordRegex.test(this.registerForm.password);
      }
    },
    methods: {
      async register() {
        if (this.isUsernameValid && this.isPasswordValid) {
          try {
            const response = await axios.post(`${this.api_url}/register`, this.registerForm);
            console.log(response.data.message);
            this.$router.push('/register/success');
          } catch (error) {
            console.error(error);
            this.formSubmissionErrors = error.response.data.message;
          }
        }
      }
    }
  };
  </script>

  <style scoped>
  .text-danger {
    color: red;
  }
  </style>
