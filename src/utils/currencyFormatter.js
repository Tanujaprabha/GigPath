/**
 * Utility for formatting currency values.
 */

export const formatCurrency = (amount, currency = 'INR') => {
  if (amount == null || isNaN(amount)) return '';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
