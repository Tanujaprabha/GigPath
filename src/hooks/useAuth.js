/**
 * Custom hook for managing authentication state.
 */

import { useState } from 'react';

export const useAuth = () => {
  const [user] = useState(null);
  const [loading] = useState(true);

  // TODO: Implement auth state listener

  return { user, loading };
};
