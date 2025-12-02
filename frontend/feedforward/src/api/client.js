import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

client.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem('user');
        if (user) {
            // const parsedUser = JSON.parse(user);
            // config.headers['Authorization'] = `Bearer ${parsedUser.token}`; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default client;
