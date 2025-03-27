import { api } from "@/services/api"
import { defineStore } from "pinia"

export const useProfileStore = defineStore('profiles',{
    state : ()=>({
        phoneNumber : ''
    }),
    persist : true,
    actions : {
        async getProfiles (id){
            try {
                const response = await api.get(`/user/profile/${id}`)
                return response.data
            } catch (error) {
                throw error
            }
        },
        async updateOrCreateProfile(id,payload){
            try {
                const response = await api.put(`/user/profile/${id}`,payload)
                return response.data
            } catch (error) {
                throw error
            }
        },
        async getAddress (id){
            try {
                const response = await api.get(`/user/address/${id}`)
                return response.data
            } catch (error) {
                throw error
            }
        },
        async addAddress (payload){
            try {
                const response = await api.post(`/user/address`,payload)
                return response.data
            } catch (error) {
                throw error
            }
        },
        async deleteAddress (id){
            try {
                const response = await api.delete(`/user/address/${id}`)
                return response.data
            } catch (error) {
                throw error
            }
        }
    }
})