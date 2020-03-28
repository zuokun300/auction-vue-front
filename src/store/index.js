import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo:{
            uName:'',
            uGender: '',
            uPhone:''
        },
        userOrder:[],

        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
    },
    mutations: {

        //设置用户登录信息
        SET_USER_LOGIN_INFO(state,data){
            state.userInfo=data;
        },

        //设置token
        changeLogin (state, user) {
            state.Authorization = user.Authorization;
            localStorage.setItem('Authorization', user.Authorization);
        }



    },
    actions: {

        //登录方法


        //检查是否登录
        isLogin(){
            const token=localStorage.getItem('Authorization');
            if (token){

            }
        },

        //退出登录
        signOut(){
            localStorage.removeItem('Authorization');
            commit('SET_USER_LOGIN_INFO',{})
        }
    },
    modules: {

    },

    getters:{

    }
})
