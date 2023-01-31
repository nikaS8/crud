import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

export const getNumAPI = async () => axios.get('/api/get')

export const addNumAPI = async (data) => axios.post(`/api/insert`, data)

export const deleteNumByIdAPI = async (id) => axios.delete(`/api/delete/${id}`)
