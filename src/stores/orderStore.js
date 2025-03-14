import { defineStore } from "pinia";

export const useOrderStore = defineStore('order',{
    state : ()=>({
        cart : []
    }),
    persist : true
})