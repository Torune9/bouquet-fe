import { api } from "@/services/api";
import { defineStore } from "pinia";

export const useOrderStore = defineStore('order',{
    state : ()=>({
        cart : [],
        selectedItems: [],
        totalPrice : 0,
        orderId : ''
    }),
    persist : true,
    actions : {
        resetPrice (){
            if (this.cart.length == 0 && this.selectedItems.length == 0) {
                return this.totalPrice = 0
            }
        },
        async createOrder(payload){
            try {
                const response = await api.post('/order',payload)
                return response.data
            } catch (error) {
                throw error
            }
        },
        async getOrder(id) {
            try {
                const response = await api.get(`/order/${id}`)
                return response.data
            } catch (error) {
                throw error
            }
        },
        async updateStatus (id){
            try {
                const response = await api.put(`/order/${id}`)
                return response.data
            } catch (error) {
                throw error
            }
        }
    }
})