import { reqbannerlist } from '../../utils/http'
const state = {
  list: []
}
const mutations = {
  changeList(state, data) {
    state.list = data
  }
}
const actions = {
  reqList(context) {
    reqbannerlist().then(res => {
      context.commit('changeList',res.data.list)
    })
  }
}
const getters = {
  list(state){
    return state.list
  }
}
export default { state, mutations, actions, getters, namespaced: true }