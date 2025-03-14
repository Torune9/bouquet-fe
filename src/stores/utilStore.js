import { defineStore } from "pinia";

export const useUtilStore = defineStore('utils',{
    state : ()=>({
        showToast : false
    }),
    persist:true
})