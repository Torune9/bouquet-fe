import { api } from "@/services/api";
import { defineStore } from "pinia";

export const useBouquetStore = defineStore('bouquet',{
    state :()=>({

    }),
    actions : {
        async addBouquet (payload){
            try {
                const response = await api.post('/bouquet',payload)
                return response.data
            } catch (error) {
               throw error
            }
        },
        async getBouquets (){
            try {
                const response = await api.get('/bouquet')
                return response.data
            } catch (error) {
               throw error
            }
        },
        async getDetailBouquet (id){
            try {
                const response = await api.get(`/bouquet/${id}`)
                return response.data
            } catch (error) {
               throw error
            }
        },
        async updateBouquet (id,payload){
            try {
                const response = await api.put(`/bouquet/${id}`,payload)
                return response.data
            } catch (error) {
               throw error
            }
        },
        async deleteImageBouquet (id){
            try {
                const response = await api.delete(`/bouquet/image/${id}`)
                return response.data
            } catch (error) {
               throw error
            }
        },
    }
})