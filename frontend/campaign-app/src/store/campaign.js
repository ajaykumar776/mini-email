import campaignService from '../services/campaignService'

export default {
  namespaced: true,
  state: {
    campaigns: []
  },
  mutations: {
    SET_CAMPAIGNS(state, campaigns) {
      state.campaigns = campaigns
    },
    ADD_CAMPAIGN(state, campaign) {
      state.campaigns.push(campaign)
    }
  },
  actions: {
    async fetchCampaigns({ commit }) {
      try {
        const campaigns = await campaignService.fetchCampaigns()
        commit('SET_CAMPAIGNS', campaigns)
      } catch (error) {
        throw error
      }
    },
    async uploadCampaign({ commit }, formData) {
      try {
        const campaign = await campaignService.uploadCampaign(formData)
        commit('ADD_CAMPAIGN', campaign)
      } catch (error) {
        throw error
      }
    }
  }
}
