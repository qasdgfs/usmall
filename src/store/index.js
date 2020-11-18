import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import actions from './actions'
import {state,mutations,getters} from './mutations'



import cate from './modules/cate'
import specs from './modules/specs'
import seck from './modules/seck'
import banner from './modules/banner'
import goods from './modules/goods'

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        cate,
        specs,
        seck,
        banner,
        goods
    }
})