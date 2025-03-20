import { api } from "@/services/api";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore('categories',{
    state : ()=>({
        
    }),
    actions : {
        async getCategories (){
            try {
                const response = await api.get('/category')
                return response.data
            } catch (error) {
                throw error
            }
        }
    }
})