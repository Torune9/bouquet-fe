import { defineStore } from "pinia";

export const useOrderStore = defineStore('order',{
    state : ()=>({
        cart : [],
        selectedItems: [],
        totalPrice : 0
    }),
    persist : true
})