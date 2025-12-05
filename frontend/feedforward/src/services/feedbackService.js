import api from '../api/client';

const feedbackService = {
  /**
   * Submit new feedback
   * @param {Object} feedbackData - The feedback data (title, description, categoryId, priority, tags)
   * @returns {Promise<Object>} Created feedback entity
   */
  submitFeedback: async (feedbackData) => {
    // Get the current user from localStorage
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    if (!user || !user.userId) {
      throw new Error('User not authenticated. Please log in.');
    }

    // Construct the DTO payload expected by backend
    const payload = {
      title: feedbackData.title,
      description: feedbackData.description,
      categoryId: feedbackData.categoryId,
      priority: feedbackData.priority || 'MEDIUM',
      tagIds: feedbackData.tags || [],
      userId: user.userId // This is the critical field for the foreign key
    };

    const response = await api.post('/feedback', payload);
    return response.data;
  },

  /**
   * Get all feedback
   * @returns {Promise<Array>} List of feedback
   */
  getAllFeedback: async () => {
    const response = await api.get('/feedback');
    return response.data;
  },

  /**
   * Get feedback by ID
   * @param {string} feedbackId - The feedback ID
   * @returns {Promise<Object>} Feedback entity
   */
  getFeedbackById: async (feedbackId) => {
    const response = await api.get(`/feedback/${feedbackId}`);
    return response.data;
  },

  /**
   * Update feedback status
   * @param {string} feedbackId - The feedback ID
   * @param {string} status - New status
   * @returns {Promise<Object>} Updated feedback
   */
  updateStatus: async (feedbackId, status) => {
    const response = await api.patch(`/feedback/${feedbackId}/status`, null, {
      params: { status }
    });
    return response.data;
  }
};

export default feedbackService;
