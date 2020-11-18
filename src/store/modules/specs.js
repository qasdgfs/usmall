import { reqspecslist } from '../../utils/http'
const state = {
    list: [],
}
const mutations = {
    changeList(state, data) {
        state.list = data
    },
}
const actions = {
    reqList(context, obj) {
        reqspecslist(obj).then(res => {
            let list=res.data.list?res.data.list:[]
            if(list.length==0&&obj.page>1){
                obj.page = obj.page-1
                context.dispatch("reqList",obj);
                return;
            }
            context.commit("changeList",list)
        })
    },
}
const getters = {
    list(state) {
        return state.list
    },
}
export default { state, mutations, actions, getters, namespaced: true }