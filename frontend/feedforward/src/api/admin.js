import client from './client';

export const adminAPI = {
    getCategories: () => client.get('/categories').then(res => res.data),
    createCategory: (data) => client.post('/categories', data),
    updateCategory: (id, data) => client.put(`/categories/${id}`, data),
    deleteCategory: (id) => client.delete(`/categories/${id}`),

    getTags: () => client.get('/tags').then(res => res.data),
    createTag: (data) => client.post('/tags', data),
    updateTag: (id, data) => client.put(`/tags/${id}`, data),
    deleteTag: (id) => client.delete(`/tags/${id}`),

    getActivityLogs: () => client.get('/activity-logs').then(res => res.data),
};
