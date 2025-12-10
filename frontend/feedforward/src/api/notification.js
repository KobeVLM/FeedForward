import api from './axios';

export const notificationAPI = {
    getNotifications: async (userId) => {
        const res = await api.get(`/notifications/user/${userId}`);
        return res.data;
    },

    markAsRead: async (notificationId) => {
        const res = await api.patch(`/notifications/${notificationId}/read`);
        return res.data;
    },

    markAllAsRead: async (userId) => {
        const res = await api.patch(`/notifications/user/${userId}/read-all`);
        return res.data;
    },

    deleteNotification: async (notificationId) => {
        const res = await api.delete(`/notifications/${notificationId}`);
        return res.data;
    }
};
