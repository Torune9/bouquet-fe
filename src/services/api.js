import { useAuthStore } from "@/stores/authStore"
import axios from "axios"
const BASE_URL = import.meta.env.VITE_BASE_APP_URL

export const api = axios.create({
    baseURL : BASE_URL,
})


api.interceptors.request.use(
    (config) => {
        console.log('Intercepting request...');

        const token = useAuthStore()?.token;
        const protectedEndpoints = [
            '/user/profile',
            '/user/address',
            '/role',
            '/order'
        ];

        const restrictedEndpoints = [
            '/order',
            '/bouquet',
            '/category'
        ];

        let needsAuth = protectedEndpoints.some(endpoint => config.url.startsWith(endpoint));

        if (!needsAuth) {
            needsAuth = restrictedEndpoints.some(endpoint => 
                config.url.startsWith(endpoint) && config.method.toLowerCase() !== 'get'
            );
        }

        console.log(`Needs Auth: ${needsAuth}, URL: ${config.url}, Method: ${config.method}`);

        if (needsAuth && token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

