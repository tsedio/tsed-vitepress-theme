<script setup lang="ts">
import {computed, ref} from "vue";
import {SortAsc, SortDesc} from "lucide-vue-next";

type PayloadValue = {value: string; order: "asc" | "desc"};

export interface SortByProps {
  choices: {label?: string; value: string}[];
  modelValue: PayloadValue;
}

const emit = defineEmits<{
  (event: "update:modelValue", payload: PayloadValue): void;
}>();

const props = withDefaults(defineProps<SortByProps>(), {
  choices: () => []
});

const show = ref(false);

const toggle = () => {
  show.value = !show.value;
};

const onClickOption = (key: string) => {
  emit("update:modelValue", {value: key, order: props.modelValue.order});
  show.value = false;
};

const toggleOrder = () => {
  emit("update:modelValue", {
    value: props.modelValue.value,
    order: props.modelValue.order === "asc" ? "desc" : "asc"
  });
};
const currentLabel = computed(() => {
  return props.choices.find((choice) => choice.value === props.modelValue.value)?.label || "";
});
</script>
<template>
  <div class="flex items-center mb-4 text-blue-900">
    <label for="options-menu" class="mr-3" @click="toggle()">Sort by</label>

    <div class="flex items-stretch">
      <div class="relative w-28 border rounded-l-md">
        <button
          type="button"
          aria-label="change sort"
          class="flex items-center justify-center h-full w-full p-1 px-2 hover:bg-blueGray-300 focus:bg-blueGray-300 rounded-l-md"
          @click="toggle()"
        >
          {{ currentLabel }}
        </button>
        <div
          v-show="show"
          class="absolute left-[-1px] z-10 origin-top-right rounded-md shadow-lg border border-gray-200 overflow-hidden"
        >
          <div id="options-menu" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              v-for="option in props.choices"
              :key="option.value"
              type="button"
              :aria-label="`sort by ${option.label}`"
              :class="{'rounded-bl-none border-b-grey-light': show}"
              class="flex items-center justify-center p-1 px-2 border-0 shadow-xs w-28 hover:bg-blueGray-300 focus:text-gray-700 text-blue-900 focus:outline-none"
              @click="onClickOption(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="flex items-stretch relative border border-l-0 rounded-r-md">
        <button
          type="button"
          data-testid="button-sort-order"
          :aria-label="modelValue.order === 'asc' ? 'sort ascending' : 'sort descending'"
          :aria-checked="modelValue.order === 'asc'"
          class="flex items-center justify-center h-full w-full p-1 px-2 hover:bg-blueGray-300 focus:bg-blueGray-300 focus:outline-none rounded-r-md"
          @click="toggleOrder"
        >
          <SortAsc v-if="modelValue.order === 'asc'" class="fill-current" :size="18" />
          <SortDesc v-if="modelValue.order === 'desc'" class="fill-current" :size="18" />
        </button>
      </div>
    </div>
  </div>
</template>
