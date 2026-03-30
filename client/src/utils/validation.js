export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password) => {
  if (!password) return { isValid: false, strength: 'weak', message: 'Password is required' };
  if (password.length < 8) return { isValid: false, strength: 'weak', message: 'Password must be at least 8 characters' };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { isValid: true, strength: 'weak', message: 'Weak password' };
  if (score <= 3) return { isValid: true, strength: 'medium', message: 'Medium strength' };
  return { isValid: true, strength: 'strong', message: 'Strong password' };
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};
