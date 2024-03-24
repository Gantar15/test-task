export function replaceArrayElements<T extends { id: number }>(
  arr1: { id: number; [key: string]: unknown }[],
  arr2: { id: number; [key: string]: unknown }[]
): T[] {
  const newArr = arr1.map((item1) => {
    const matchingItem = arr2.find((item2) => item2.id === item1.id);
    return matchingItem ? { ...matchingItem } : item1;
  });

  return newArr as T[];
}
