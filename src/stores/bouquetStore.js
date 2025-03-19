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
    }
})