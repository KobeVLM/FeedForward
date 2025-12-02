import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the user ID if available (simple auth)
api.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            // In a real JWT setup, we would send 'Authorization': `Bearer ${token}`
            // For this simple setup, we might send a custom header or just rely on the user ID being sent in the body for some requests
            // But for now, let's just leave it clean. The backend is open.
            // If we needed to simulate "who is logged in" for backend logic, we might need to pass a header.
            // config.headers['X-User-Id'] = parsedUser.userId; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
