// Utility to detect high stress (future EEG integration)
export function isHighStress(stressScore: number): boolean {
  return stressScore > 0.8;
}
