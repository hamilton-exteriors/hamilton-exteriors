const CARDINALS = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

export function bearingToCardinal(degrees: number): string {
  const idx = Math.round(((degrees % 360) + 360) % 360 / 22.5) % 16;
  return CARDINALS[idx];
}
