/**
 * Custom hook for managing user goals.
 */

import { useState } from 'react';

export const useGoals = () => {
  const [goals] = useState([]);

  // TODO: Implement goals fetching and management

  return { goals };
};
