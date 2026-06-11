let currentCurrency = 'INR';
let currentLocale = 'en-IN';

export function setGlobalCurrency(currency) {
  currentCurrency = currency || 'INR';
  currentLocale = currency === 'USD' ? 'en-US' : currency === 'EUR' ? 'en-DE' : currency === 'GBP' ? 'en-GB' : 'en-IN';
}

export function formatCurrency(value) {
  return new Intl.NumberFormat(currentLocale, {
    style: 'currency',
    currency: currentCurrency,
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)
}

export function formatCurrencyCompact(value) {
  return new Intl.NumberFormat(currentLocale, {
    style: 'currency',
    currency: currentCurrency,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(Number(value) || 0)
}

export function formatDate(value, options = {}) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  }).format(new Date(value))
}

export function formatMonthLabel(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

export function formatPercent(value) {
  return `${Math.round(Number(value) || 0)}%`
}

export function getInitials(name) {
  return (name || '')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function formatTimeAgo(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  return formatDate(dateString);
}
