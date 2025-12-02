import client from './client';

export const userAPI = {
    getProfile: (id) => client.get(`/users/${id}`).then(res => res.data),
    updateProfile: (id, data) => client.put(`/users/${id}`, data).then(res => res.data),
    changePassword: (id, data) => client.post(`/users/${id}/change-password`, data),
    deleteAccount: (id) => client.delete(`/users/${id}`),
};
