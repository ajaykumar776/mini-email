import api from './api'

export default {
  async fetchCampaigns() {
    try {
      const response = await api.get('/campaigns')
      return response.data.campaigns
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch campaigns')
    }
  },

  async uploadCampaign(formData) {
    try {
      const response = await api.post('/campaigns', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload campaign')
    }
  }
}
