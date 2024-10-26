<script setup lang="ts">
import {computed} from "vue";

export interface ButtonBoxesProps {
  choices: {label?: string; value: string}[];
  modelValue: string;
}

const props = withDefaults(defineProps<ButtonBoxesProps>(), {
  choices: () => []
});

const emit = defineEmits<{
  (event: "update:modelValue", payload: string): void;
}>();

const toggle = (item: {label?: string; value: string}) => {
  if (props.modelValue === item.value) {
    emit("update:modelValue", "");
  } else {
    emit("update:modelValue", item.value);
  }
};

const choices = computed(() => {
  return props.choices.map((choice) => {
    return {
      label: choice.label || choice.value,
      value: choice.value
    };
  });
});
</script>
<template>
  <div class="flex pt-6 space-x-2 overflow-x-auto sm:flex-wrap sm:justify-center">
    <button
      v-for="choice in choices"
      :key="choice.value"
      type="button"
      role="checkbox"
      :aria-label="choice.label"
      :aria-checked="props.modelValue === choice.value"
      class="px-4 py-2 mb-2 text-sm rounded cursor-pointer focus:outline-none"
      :class="[
        props.modelValue === choice.value
          ? 'bg-blue-active text-white'
          : 'text-blue-900 bg-blueGray-300 hover:bg-gray-300 focus:bg-gray-300'
      ]"
      @click="toggle(choice)"
    >
      {{ choice.label }}
    </button>
  </div>
</template>
