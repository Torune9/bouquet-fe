import { defineStore } from "pinia"
import { api } from "@/services/api"
import router from "@/router"
import { toast } from "vue3-toastify"

export const useAuthStore = defineStore('authenticate',{
    state : ()=>({
       token : null,
       currentUser : null,
       isAuthenticated : false 
    }),
    persist : true,
    actions : {
        async login(payload){
            try { 
                const response = await api.post('/user/login',payload)
                const {token,data} = response.data
                this.isAuthenticated = true
                this.currentUser = data
                this.token = token
                return response.data
            } catch (error) {        
                throw error
            }
        },
        async register(payload){
            try {
                const response = await api.post('/user/register',payload)
                return response.data
            } catch (error) {
                throw error
            }
        },
        logout (){
            console.log('logout');
            toast.success('Logout success',{
                onClose : ()=>router.replace('/sign-in')
            })
            this.$reset()
        }
    }
})