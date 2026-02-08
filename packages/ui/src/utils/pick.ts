export const pick = <Obj extends Record<string, any>, const Keys extends readonly (keyof Obj)[]>(o: Obj, keys: Keys) => {
  return (Object.keys(o) as Keys[number][])
    .filter((key) => keys.includes(key))
    .reduce((acc, key) => {
      acc[key] = o[key]
      return acc
    }, { } as Pick<Obj, Keys[number]>)
}
