import { createStore } from 'vuex'
import auth from './auth'
import campaign from './campaign'

export default createStore({
  modules: {
    auth,
    campaign
  }
})
