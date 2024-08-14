<template>
    <div class="container mt-5">
      <div class="d-flex justify-content-between mb-4">
        <h3>Campaign List</h3>
        <router-link to="/create-campaign" class="btn btn-primary">
          Create Campaign
        </router-link>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="campaign in campaigns" :key="campaign.id">
            <td>{{ campaign.id }}</td>
            <td>{{ campaign.name }}</td>
            <td>
              <span :class="statusClass(campaign.status)">{{ campaign.status }}</span>
            </td>
            <td>
              <button class="btn btn-info btn-sm me-2" @click="viewCampaign(campaign.id)">View</button>
              <button class="btn btn-warning btn-sm" @click="editCampaign(campaign.id)">Edit</button>
              <button 
                v-if="campaign.status === 'processed'" 
                class="btn btn-success btn-sm" 
                @click="downloadCSV(campaign.csv_file)"
              >
                Download CSV
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        campaigns: [],
      };
    },
    async created() {
      try {
        const token = localStorage.getItem('authToken'); // Get the token from localStorage
        const response = await axios.get('http://127.0.0.1:8001/api/campaigns', {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        });
        this.campaigns = response.data.campaigns; // Adjust based on the actual structure of your API response
      } catch (error) {
        console.error('Failed to fetch campaigns:', error);
      }
    },
    methods: {
      statusClass(status) {
        switch (status) {
          case 'in_progress':
            return 'text-warning';
          case 'processed':
            return 'text-success';
          default:
            return 'text-muted';
        }
      },
      viewCampaign(id) {
        this.$router.push({ name: 'view-campaign', params: { id } });
      },
      editCampaign(id) {
        this.$router.push({ name: 'edit-campaign', params: { id } });
      },
      downloadCSV(filePath) {
        const token = localStorage.getItem('authToken'); // Get the token from localStorage
        window.open(`http://127.0.0.1:8001/storage/${filePath}`, '_blank', `Authorization=Bearer ${token}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .text-warning {
    color: #ffc107;
  }
  
  .text-success {
    color: #28a745;
  }
  
  .text-muted {
    color: #6c757d;
  }
  </style>  