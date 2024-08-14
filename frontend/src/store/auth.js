import authService from '../services/authService'

export default {
  namespaced: true,
  state: {
    user: null,
    isAuthenticated: !!localStorage.getItem('token'),
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.isAuthenticated = !!user
    },
    LOGOUT(state) {
      state.user = null
      state.isAuthenticated = false
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const user = await authService.login(credentials)
        commit('SET_USER', user)
      } catch (error) {
        throw error
      }
    },
    async register(_, userData) {
      try {
        await authService.register(userData)
      } catch (error) {
        throw error
      }
    },
    logout({ commit }) {
      authService.logout()
      commit('LOGOUT')
    }
  }
}
