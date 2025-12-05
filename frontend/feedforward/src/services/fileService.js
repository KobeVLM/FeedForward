import api from './api';

const fileService = {
  /**
   * Upload file attachment
   * @param {File} file - The file to upload
   * @param {string} feedbackId - The feedback ID
   * @param {string} userId - The user ID who uploaded
   * @returns {Promise<Object>} Attachment data
   */
  uploadFile: async (file, feedbackId, userId) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('feedbackId', feedbackId);
    formData.append('userId', userId);

    const response = await api.post('/attachments/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Download file
   * @param {string} attachmentId - The attachment ID
   * @returns {Promise<Blob>} File blob
   */
  downloadFile: async (attachmentId) => {
    const response = await api.get(`/attachments/${attachmentId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },

  /**
   * Get attachments by feedback ID
   * @param {string} feedbackId - The feedback ID
   * @returns {Promise<Array>} List of attachments
   */
  getAttachmentsByFeedback: async (feedbackId) => {
    const response = await api.get(`/attachments/feedback/${feedbackId}`);
    return response.data;
  },

  /**
   * Delete attachment
   * @param {string} attachmentId - The attachment ID
   * @returns {Promise<string>} Success message
   */
  deleteAttachment: async (attachmentId) => {
    const response = await api.delete(`/attachments/${attachmentId}`);
    return response.data;
  },

  /**
   * Validate file before upload
   * @param {File} file
   * @returns {Object} { valid: boolean, error: string }
   */
  validateFile: (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain',
    ];

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'File size exceeds 10MB limit',
      };
    }

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'File type not allowed. Allowed: Images, PDF, Word, Excel, Text',
      };
    }

    return { valid: true, error: '' };
  },

  /**
   * Format file size for display
   * @param {number} bytes
   * @returns {string} Formatted size
   */
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  },
};

export default fileService;
