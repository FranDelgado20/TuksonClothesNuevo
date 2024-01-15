import axios from "axios";

const token = JSON.parse(sessionStorage.getItem('token'))
const clienteAxios = axios.create({
    baseURL: 'http://localhost:8080'
})

export const config = {
    headers:{
        "Content-Type" : "application/json",
        Authorization: `Bearer ${token}`
    }
}

export default clienteAxios