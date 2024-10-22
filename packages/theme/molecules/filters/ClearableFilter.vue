<script setup lang="ts">
export interface ClearableFilterProps {
  count?: number;
  keywords: string[];
  label?: string;
}

const emit = defineEmits<{
  (e: "clear"): void;
}>();

const props = withDefaults(defineProps<ClearableFilterProps>(), {
  label: "plugin",
  keywords: () => [],
  count: 0
});

const clearFilters = () => {
  emit("clear");
};
</script>
<template>
  <div class="mb-4 text-blue-900">
    <span>{{ count }} {{ props.label }}{{ count > 1 ? "s" : "" }} found</span>

    <template v-if="keywords.length">
      <div>
        Filter{{ props.keywords.length ? "s" : "" }}:
        <strong class="mr-1">{{ props.keywords.join(", ") }}</strong>
        <a @click.prevent="clearFilters"
           class="cursor-pointer"
          >(<u>clear filter{{ props.keywords.length > 1 ? "s" : "" }}</u
          >)
        </a>
      </div>
    </template>
  </div>
</template>
