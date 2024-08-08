export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getNotNil = <V>(value: V, ctx: string) => {
  if (!value) {
    throw new Error(`value is Nil: ${JSON.stringify(value)}, context: ${ctx}`)
  }

  return value
}
