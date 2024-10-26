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
  <div class="mb-4 text-blue-900" data-testid="ClearableFilter">
    <span>{{ count + " " + props.label + (count > 1 ? "s" : "") + " found" }}</span>

    <template v-if="keywords.length">
      <div>
        Filter{{ props.keywords.length ? "s" : "" }}:
        <strong class="mr-1">{{ props.keywords.join(", ") }}</strong>
        <a role="button"
           @click.prevent="clearFilters"
           aria-label="Clear filters"
           class="cursor-pointer"
        >(<u>clear filter{{ props.keywords.length > 1 ? "s" : "" }}</u
        >)
        </a>
      </div>
    </template>
  </div>
</template>
