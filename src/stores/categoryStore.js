import { api } from "@/services/api";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore('categories',{
    state : ()=>({
        categories : []
    }),
    persist : true,
    actions : {
        async getCategories (){
            try {
                const response = await api.get('/category')
                this.categories = [...response.data.data]
                return response.data
            } catch (error) {
                throw error
            }
        }
    }
})