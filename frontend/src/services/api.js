import axios from "axios";

const API = "http://localhost:8081";

export const loginUser = (data) => axios.post(`${API}/auth/login`, data);
export const getProducts = () => axios.get(`${API}/products`);
export const addProduct = (data) => axios.post(`${API}/products`, data);
export const deleteProduct = (id) => axios.delete(`${API}/products/${id}`);
export const addProduction = (data) => axios.post(`${API}/production`, data);
export const addOrder = (data) => API.post("/orders", data);