import client from './client';

export const feedbackAPI = {
    getAll: () => client.get('/feedback').then(res => res.data),
    getById: (id) => client.get(`/feedback/${id}`).then(res => res.data),
    create: (data) => client.post('/feedback', data).then(res => res.data),
    updateStatus: (id, status) => client.patch(`/feedback/${id}/status`, null, { params: { status } }),
    addResponse: (data) => client.post('/responses', data),
    uploadAttachment: (feedbackId, formData) => client.post(`/feedback/${feedbackId}/attachments`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    getByUser: (userId) => client.get('/feedback').then(res => res.data.filter(f => f.createdBy?.userId === userId || f.createdBy?.id === userId)),
};
