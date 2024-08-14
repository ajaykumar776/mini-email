<template>
    <v-container>
      <v-form @submit.prevent="uploadCampaign">
        <v-text-field label="Campaign Name" v-model="name" required></v-text-field>
        <v-file-input label="Upload CSV" v-model="file" required></v-file-input>
        <v-btn type="submit">Upload</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  
  export default {
    data() {
      return {
        name: '',
        file: null
      }
    },
    methods: {
      ...mapActions('campaign', ['uploadCampaign']),
      async uploadCampaign() {
        const formData = new FormData()
        formData.append('name', this.name)
        formData.append('file', this.file)
  
        try {
          await this.uploadCampaign(formData)
          alert('Campaign uploaded successfully')
        } catch (error) {
          alert(error.message)
        }
      }
    }
  }
  </script>
  