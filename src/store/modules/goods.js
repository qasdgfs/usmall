import { reqgoodscount, reqgoodslist } from '../../utils/http'

const state = {
    list: [],
    total: 0,
    page: 1,
    size: 2
}
const mutations = {
    changeTotal(state, data) {
        state.total = data
    },
    changeList(state, data) {
        state.list = data
    },
    changePage(state, data) {
        state.page = data
    }
}
const actions = {
    reqTotal(context) {
        reqgoodscount().then(res => {
            context.commit('changeTotal', res.data.list[0].total)
        })
    },
    reqList(context) {
        let state = context.state
        reqgoodslist({ page: state.page, size: state.size }).then(res => {
            let list = res.data.list ? res.data.list : []
            if (list.length == 0 && context.state.page > 1) {
                context.commit("changePage", context.state.page - 1)
                context.dispatch("reqList");
                return;
            }
            context.commit("changeList", list)
        })
    },
    changePage(context, page) {
        context.commit('changePage',page)
        context.commit('reqList')
    }
}
const getters = {
    total(state) {
        return state.total
    },
    list(state){
        
    }
}
export default { state, mutations, actions, getters, namespaced: true }