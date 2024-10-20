<script setup lang="ts">
import {computed, ref} from "vue";

export interface FilterByProps {
  choices: {label: string; value: string}[];
  modelValue: string;
  label: string;
}

const emit = defineEmits<{
  (event: "update:modelValue", payload: string): void;
}>();

const props = withDefaults(defineProps<FilterByProps>(), {
  choices: () => []
});

const show = ref(false);

const toggle = () => {
  show.value = !show.value;
};

const onClickOption = (key: string) => {
  emit("update:modelValue", key);
  show.value = false;
};

const currentLabel = computed(() => {
  return props.choices.find((choice) => choice.value === props.modelValue)?.label || "";
});
</script>
<template>
  <div class="flex items-center mb-4 text-blue-900">
    <label for="options-menu" class="mr-3" @click="toggle()">{{ label }}</label>

    <div class="flex items-stretch">
      <div class="relative w-28 border rounded">
        <button
          type="button"
          aria-label="change filter"
          class="flex items-center justify-center h-full w-full p-1 px-2 hover:bg-blueGray-300 focus:bg-blueGray-300 rounded"
          @click="toggle()"
        >
          {{ currentLabel || " - " }}
        </button>
        <div
          v-show="show"
          class="absolute left-[-1px] z-[100] bg-white origin-top-right rounded-md shadow-lg border border-gray-200 overflow-hidden"
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
    </div>
  </div>
</template>
