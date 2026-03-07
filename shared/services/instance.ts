import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})


export const axiosServerInstance = axios.create({
  baseURL: process.env.API_URL_ADMIN
})