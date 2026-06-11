/**
 * Calculator for savings progress and projections.
 */

function toNumber(value) {
  return Number(value) || 0;
}

export const calculateSavings = (goals) => {
  return (goals || []).reduce((sum, g) => sum + toNumber(g.savedAmount), 0);
};

export const calculateGoalTargets = (goals) => {
  return (goals || []).reduce((sum, g) => sum + toNumber(g.targetAmount), 0);
};
