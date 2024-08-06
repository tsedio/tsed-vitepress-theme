import {ref} from "vue";

export interface UseRandomProps<Data = any> {
  initItems: Data[];
  maxItems: number;
  numberToChange: number;
}

const getRandomIndex = (arrayLength: number) => {
  if (arrayLength === 0) {
    return 0;
  }
  return Math.floor(Math.random() * arrayLength);
};

export function useRandomItems<Data = unknown>({initItems, maxItems, numberToChange}: UseRandomProps<Data>) {
  const randomItems = ref<Data[]>([]);
  const shuffledItems = ref<Data[]>([]);
  const lastChangedIndex = ref<number>(-1);

  function update() {
    if (initItems.length > 0) {
      // Si randomItems est vide, remplir initialement avec 10 éléments aléatoires
      if (randomItems.value.length === 0) {
        shuffledItems.value = initItems.sort(() => 0.5 - Math.random()) as never;

        randomItems.value = shuffledItems.value.slice(0, maxItems);
      } else {
        const currentList = [...randomItems.value];

        // Remplacer partiellement les éléments existants
        for (let i = 0; i < numberToChange; i++) {
          let randomItemIndex = getRandomIndex(currentList.length);

          while (lastChangedIndex.value === randomItemIndex) {
            randomItemIndex = getRandomIndex(currentList.length);
          }

          lastChangedIndex.value = randomItemIndex;

          const item = shuffledItems.value.pop()!;

          shuffledItems.value.unshift(currentList[randomItemIndex]);

          currentList[randomItemIndex] = item;
        }

        randomItems.value = currentList;
      }
    }
  }

  return {update, lastChangedIndex, items: randomItems};
}
