<template>
    <v-container>
      <v-form @submit.prevent="login">
        <v-text-field label="Email" v-model="email" required></v-text-field>
        <v-text-field label="Password" v-model="password" type="password" required></v-text-field>
        <v-btn type="submit">Login</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  
  export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      ...mapActions('auth', ['login']),
      async login() {
        try {
          await this.login({ email: this.email, password: this.password })
          this.$router.push('/campaigns')
        } catch (error) {
          alert(error.message)
        }
      }
    }
  }
  </script>
  