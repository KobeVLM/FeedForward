import client from './client';

export const authAPI = {
    login: (credentials) => client.post('/users/login', credentials),
    register: (userData) => client.post('/users/register', userData),
    getDepartments: () => client.get('/departments'), // Assuming this exists or will exist
};
