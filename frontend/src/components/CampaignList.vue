<template>
    <v-container>
      <v-list>
        <v-list-item v-for="campaign in campaigns" :key="campaign.id">
          <v-list-item-content>
            <v-list-item-title>{{ campaign.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex'
  
  export default {
    computed: {
      ...mapState('campaign', ['campaigns'])
    },
    created() {
      this.fetchCampaigns()
    },
    methods: {
      ...mapActions('campaign', ['fetchCampaigns'])
    }
  }
  </script>
  