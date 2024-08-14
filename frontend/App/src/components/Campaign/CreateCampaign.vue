<template>
    <MainLayout>
      <div class="container mt-5">
        <h2>Create New Campaign</h2>
        <form @submit.prevent="createCampaign">
          <div class="mb-3">
            <label for="name" class="form-label">Campaign Name</label>
            <input
              v-model="name"
              type="text"
              id="name"
              class="form-control"
              placeholder="Campaign Name"
              required
            />
          </div>
          <div class="mb-3">
            <label for="csvFile" class="form-label">CSV File</label>
            <input
              type="file"
              id="csvFile"
              class="form-control"
              @change="handleFileUpload"
            />
          </div>
          <button type="submit" class="btn btn-primary">Create Campaign</button>
        </form>
      </div>
    </MainLayout>
  </template>
  
  <script>
  import MainLayout from '../../layout/MainLayout.vue'; // Import the MainLayout component
  import axios from 'axios';
  
  export default {
    components: { MainLayout },
    data() {
      return {
        name: '',
        csvFile: null,
      };
    },
    methods: {
      handleFileUpload(event) {
        this.csvFile = event.target.files[0];
      },
      async createCampaign() {
        const formData = new FormData();
        formData.append('name', this.name);
        formData.append('csv_file', this.csvFile);
  
        try {
          const token = localStorage.getItem('authToken');
          const response = await axios.post('http://127.0.0.1:8001/api/campaigns', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          // Handle response, e.g., show success message and redirect
          console.log('Campaign created:', response.data);
          this.$router.push('/campaigns');
        } catch (error) {
          console.error('Error creating campaign:', error.response ? error.response.data : error.message);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  