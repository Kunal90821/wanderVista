import axios from 'axios'

const api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:4000/api/'
})

export const postServices = {
    loginUser : (userCredentials) => {
        return api.post('login', userCredentials)
    },
    registerUser: (userCredentials) => {
        return api.post('register', userCredentials)
    },
    fetchUser: () => {
        return api.get('me')
    }
}