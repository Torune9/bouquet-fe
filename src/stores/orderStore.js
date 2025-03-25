import { defineStore } from "pinia";

export const useOrderStore = defineStore('order',{
    state : ()=>({
        cart : [],
        selectedItems: [],
        totalPrice : 0
    }),
    persist : true,
    actions : {
        resetPrice (){
            if (this.cart.length == 0 && this.selectedItems.length == 0) {
                return this.totalPrice = 0
            }
        }
    }
})