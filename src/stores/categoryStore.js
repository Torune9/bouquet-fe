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
        },
        async addCategory (payload){
            try {
                const response = await api.post('/category',payload)
                return response.data
            } catch (error) {
                throw error
            }
        },
        async updateCategory (id,payload){
            try {
                const response = await api.put(`/category/${id}`,payload)
                return response.data
            } catch (error) {
                throw error
            }
        },
        async deleteCategory (id){
            try {
                const response = await api.delete(`/category/${id}`)
                return response.data
            } catch (error) {
                throw error
            }
        },
    }
})