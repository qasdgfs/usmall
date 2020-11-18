import Axios from 'axios'
import qs from 'qs'
import { errorAlert } from "./alert"
import Vue from "vue"



//开发环境
let baseUrl = '/aa'
Vue.prototype.$imgPre = 'http://localhost:3000'

//生产环境
// let baseUrl=''



Axios.interceptors.request.use(req => {
    if (req.url != baseUrl + "/api/userlogin") {
        req.headers.authorization = store.state.userInfo.token;
    }
    return req
})
Axios.interceptors.response.use(res => {
    console.group("本次路径：" + res.config.url)
    console.log(res)
    console.groupEnd()
    if (res.data.code !== 200) {
        errorAlert(res.data.msg)
    }
    if(res.data.msg==="登录已过期或访问权限受限"){
        store.dispatch("changeUser",{})
        router.push("/login")
    }
    return res
})

// ===========菜单接口====================

//添加
export const reqMenuAdd = (form) => {
    return Axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(form)
    })
}

//删除
export const reqMenuDel = (id) => {
    return Axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

//列表
export const reqMenuList = () => {
    return Axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: {
            istree: true
        }
    })
}

//获取一条数据
export const reqMenuDetail = (id) => {
    return Axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//修改
export const reqMenuUpdate = (form) => {
    return Axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(form)
    })
}

// ===========角色接口===================

//添加角色
export const reqRoleadd = (form) => {
    return Axios({
        url: baseUrl + '/api/roleadd',
        method: 'post',
        data: qs.stringify(form)
    })
}

//角色列表
export const reqRolelist = () => {
    return Axios({
        url: baseUrl + "/api/rolelist",
        method: "get",
    })
}

//角色删除
export const reqRoledelete = (id) => {
    return Axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: {
            id: id
        }
    })
}

//一条角色
export const reqRoleinfo = (id) => {
    return Axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//修改
export const reqRoleedit = (form) => {
    return Axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(form)
    })
}

// ===========管理员接口===================

//总数
export const reqUsercount = () => {
    return Axios({
        url: baseUrl + '/api/usercount',
        method: 'get'
    })
}

//列表
export const reqUserlist = (obj) => {
    return Axios({
        url: baseUrl + '/api/userlist',
        method: 'get',
        params: obj
    })
}

//添加
export const reqUseradd = (obj) => {
    return Axios({
        url: baseUrl + '/api/useradd',
        method: 'post',
        data: qs.stringify(obj)
    })
}

//一条
export const reqUserinfo = (uid) => {
    return Axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: {
            uid: uid
        }
    })
}

//修改
export const reqUseredit = (obj) => {
    return Axios({
        url: baseUrl + "/api/useredit",
        method: "POST",
        data: qs.stringify(obj)
    })
}

//删除
export const reqUserdelete = (uid) => {
    return Axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify({
            uid: uid
        })
    })
}

//登录
export const reqUserlogin = (obj) => {
    return Axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(obj)
    })
}

// ===========会员管理接口===================
//一条数据
export const reqMemberinfo = (uid) => {
    return Axios({
        url: baseUrl + "/api/memberinfo",
        method: "get",
        params: {
            uid: uid
        }
    })
}

//列表
export const reqMemberlist = () => {
    return Axios({
        url: baseUrl + "/api/memberlist",
        method: "get"
    })
}


//修改
export const reqMemberedit = (obj) => {
    return Axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: qs.stringify(obj)
    })
}

// ===========商品分类接口===================

//列表
export const reqCatelist = (obj) => {
    return Axios({
        url: baseUrl + "/api/catelist",
        method: "GET",
        params: obj
    })
}

//添加
export const reqCateadd = (user) => {
    let d = new FormData()
    for (let i in user) {
        d.append(i, user[i])
    }
    return Axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: d
    })
}

//请求一条
export const reqCateinfo = (id) => {
    return Axios({
        url: baseUrl + "/api/cateinfo",
        method: "GET",
        params: {
            id: id
        }
    })
}

//修改
export const reqCateedit = (user) => {
    let d = new FormData()
    for (let i in user) {
        d.append(i, user[i])
    }
    return Axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: d
    })
}

//删除
export const reqCatedelete = (id) => {
    return Axios({
        url: baseUrl + "/api/catedelete",
        method: "POST",
        data: {
            id: id
        }
    })
}


// ===========商品规格接口===================
//列表
export const reqspecslist = (obj) => {
    return Axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: obj
    })
}

//总数
export const reqspecscount = () => {
    return Axios({
        url: baseUrl + "/api/specscount",
        method: "get",
    })
}

//一条
export const reqspecsinfo = (id) => {
    return Axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//添加
export const reqspecsadd = (obj) => {
    return Axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data:qs.stringify(obj) 
    })
}

//修改
export const reqspecsedit = (obj) => {
    return Axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data:qs.stringify(obj) 
    })
}

//删除
export const reqspecsdelete = (id) => {
    return Axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data:qs.stringify({id:id}) 
    })
}

//===========商品分类接口===================
//列表
export const reqsecklist = () => {
    return Axios({
        url: baseUrl + "/api/secklist",
        method: "get",
    })
}