/**
 * Hook for managing application language and translations.
 */

import { useState } from 'react';

export const useLanguage = () => {
  const [currentLanguage] = useState('en');
  // TODO: Implement language switching logic
  return { currentLanguage };
};
