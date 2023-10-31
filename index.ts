const world = 'you';

export function hello (who: string = world): string {
  return `Hello ${who}! `;
}
