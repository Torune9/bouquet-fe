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
        async getBouquets (query) {
            const params = {
                category : query.category,
                stockBelow : query.stockBelow,
                stockAbove : query.stockAbove,
                stockAsc : query.stock,
                stockDesc : query.stock,
                minPrice : query.minPrice,
                maxPrice : query.maxPrice,
                sortBy : query.sortBy,
            } 
            
            if (query.isParanoid) {
                params.paranoid = query.isParanoid
            }

            try {
                const response = await api.get('/bouquet',{params});
                return response.data;
            } catch (error) {
                throw error;
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
        async updateBouquet (id,isRestores,payload){
            try {
                const response = await api.put(`/bouquet/${id}`,payload,{
                    params : {
                        restore : isRestores
                    }
                })
                return response.data
            } catch (error) {
               throw error
            }
        },
        async deleteBouquet (id,query){
            try {
                const response = await api.delete(`/bouquet/${id}`,{
                    params : {
                        force : query ? true : null
                    }
                })
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