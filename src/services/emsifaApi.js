import axios from "axios"

const api = axios.create({
    baseURL : 'https://www.emsifa.com/api-wilayah-indonesia/api'
})

const getProvince = async()=>{
    try {
        const response = await api.get('/provinces.json')
        console.log(response.data);
        
        return response.data
    } catch (error) {
        throw error
    }
}

const getCity = async(provinceId)=>{
    try {
        const response = await api.get(`/regencies/${provinceId}.json`) 
        return response.data
    } catch (error) {
        throw error
    }
}
const getRegency = async(regencyId)=>{
    try {
        const response = await api.get(`/districts/${regencyId}.json`)
        return response.data
    } catch (error) {
        throw error
    }
}
const getDistrict = async(districtId)=>{
    try {
        const response = await api.get(`/villages/${districtId}.json`)
        return response.data
    } catch (error) {
        throw error
    }
}

export {getProvince,getCity,getRegency,getDistrict}