/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password
 * @returns {Object} { valid: boolean, message: string }
 */
export const validatePassword = (password) => {
  if (!password) {
    return { valid: false, message: 'Password is required' };
  }
  
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }
  
  if (password.length > 50) {
    return { valid: false, message: 'Password must be less than 50 characters' };
  }
  
  return { valid: true, message: '' };
};

/**
 * Validate passwords match
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {boolean}
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

/**
 * Validate required field
 * @param {string} value
 * @param {string} fieldName
 * @returns {Object}
 */
export const validateRequired = (value, fieldName = 'Field') => {
  if (!value || value.trim() === '') {
    return { valid: false, message: `${fieldName} is required` };
  }
  return { valid: true, message: '' };
};

/**
 * Validate name (alphabets and spaces only)
 * @param {string} name
 * @returns {Object}
 */
export const validateName = (name) => {
  if (!name || name.trim() === '') {
    return { valid: false, message: 'Name is required' };
  }
  
  if (name.length < 2) {
    return { valid: false, message: 'Name must be at least 2 characters' };
  }
  
  if (name.length > 100) {
    return { valid: false, message: 'Name must be less than 100 characters' };
  }
  
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(name)) {
    return { valid: false, message: 'Name can only contain letters and spaces' };
  }
  
  return { valid: true, message: '' };
};

/**
 * Validate form data
 * @param {Object} data - Form data object
 * @param {Object} rules - Validation rules
 * @returns {Object} Errors object
 */
export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach((field) => {
    const rule = rules[field];
    const value = data[field];
    
    if (rule.required && !value) {
      errors[field] = `${rule.label || field} is required`;
    } else if (rule.email && value && !validateEmail(value)) {
      errors[field] = 'Invalid email format';
    } else if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = `${rule.label || field} must be at least ${rule.minLength} characters`;
    } else if (rule.maxLength && value && value.length > rule.maxLength) {
      errors[field] = `${rule.label || field} must be less than ${rule.maxLength} characters`;
    } else if (rule.pattern && value && !rule.pattern.test(value)) {
      errors[field] = rule.patternMessage || `Invalid ${rule.label || field} format`;
    } else if (rule.custom && value) {
      const customResult = rule.custom(value, data);
      if (!customResult.valid) {
        errors[field] = customResult.message;
      }
    }
  });
  
  return errors;
};
