<template>
    <v-container>
      <v-form @submit.prevent="register">
        <v-text-field label="Name" v-model="name" required></v-text-field>
        <v-text-field label="Email" v-model="email" required></v-text-field>
        <v-text-field label="Password" v-model="password" type="password" required></v-text-field>
        <v-btn type="submit">Register</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: ''
      }
    },
    methods: {
      ...mapActions('auth', ['register']),
      async register() {
        try {
          await this.register({ name: this.name, email: this.email, password: this.password })
          this.$router.push('/login')
        } catch (error) {
          alert(error.message)
        }
      }
    }
  }
  </script>
  