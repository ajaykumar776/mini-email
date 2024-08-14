import api from './api'

export default {
  async login(credentials) {
    try {
      const response = await api.post('/login', credentials)
      localStorage.setItem('token', response.data.token)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/register', userData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed')
    }
  },

  logout() {
    localStorage.removeItem('token')
  }
}
