<template>
    <div style="max-width: 400px; margin: 0 auto; text-align: center; margin-top: 100px; padding: 20px;">
        <h1>Sorry, the page was not found.</h1>
        <p>Continue to <RouterLink to="/login">Home</RouterLink></p>
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
