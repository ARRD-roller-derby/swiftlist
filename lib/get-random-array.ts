export function getRandomArray<T>(array: T[], length: number): T[] {
  const randomArray: T[] = []
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * array.length)
    if (!randomArray.includes(array[randomIndex])) {
      randomArray.push(array[randomIndex])
    }
  }
  return randomArray
}
