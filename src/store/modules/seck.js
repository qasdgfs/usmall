import { reqsecklist } from '../../utils/http'
const state = {
    list: []
}
const mutations = {
    changeSeck(state, data) {
        state.list = data
    }
}
const actions = {
    reqList(context) {
        reqsecklist().then(res => {
            context.commit('changeSeck', res.data.list)
        })
    }
}
const getters = {
    list(state){
        return state.list
    }
}
export default { state, mutations, actions, getters, namespaced: true }