export function getRandomArray<T>(array: T[], length: number): T[] {
  if (length > array.length) {
    throw new Error('La longueur demandée dépasse la taille du tableau fourni.')
  }

  const randomArray: T[] = []

  while (randomArray.length < length) {
    const randomIndex = Math.floor(Math.random() * array.length)
    const randomElement = array[randomIndex]
    if (!randomArray.includes(randomElement)) {
      randomArray.push(randomElement)
    }
  }

  return randomArray
}
