import axios from "axios";

const api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:4000/api/'
});

export const postServices = {
    loginUser: (userCredentials) => {
        return api.post('login',userCredentials);
    },
    registerUser: (userData) => {
        return api.post('register',userData);
    },
    fetchUser: () => {
        return api.get(`me`);
    }
}