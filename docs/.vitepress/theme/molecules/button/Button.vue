<script setup lang="ts">
import {type AnchorHTMLAttributes, computed} from "vue";

export interface ButtonProps extends /* @vue-ignore */ AnchorHTMLAttributes {
  component?: string | Object;
  disabled?: boolean;
  color?: string;
  bgColor?: string;
  borderColor?: string;
  hover?: string;
  fontWeight?: string;
  paddingX?: number | string;
  paddingY?: number | string;
  rounded?: string;
  shadow?: string;
  href?: string;
  title?: string;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  component: "a",
  disabled: false,
  color: "white",
  bgColor: "blue",
  borderColor: "blue",
  hover: "active",
  fontWeight: "bold",
  paddingX: 4,
  paddingY: 1,
  rounded: "full",
  shadow: "none",
  href: "",
  title: ""
});

const classes = computed(() => {
  let {borderColor, bgColor, color, disabled, rounded, shadow, hover = "active"} = props;

  if (disabled) {
    bgColor = "gray-light";
    borderColor = "gray-light";
  }

  if (!borderColor) {
    borderColor = bgColor;
  }

  return [
    bgColor && `bg-${bgColor}`,
    borderColor && `border-${borderColor}`,
    color && `text-${color}`,
    bgColor && `focus:bg-${bgColor}-active`,
    borderColor && hover && `focus:border-${borderColor}-${hover}`,
    borderColor && hover && `hover:bg-${bgColor}-${hover}`,
    borderColor && hover && `hover:border-${borderColor}-${hover}`,
    color && hover && `focus:text-${color}-${hover}`,
    color && hover && `hover:text-${color}-${hover}`,
    "cursor-pointer",
    `border-1`,
    `border-solid`,
    rounded && `rounded-${rounded}`,
    shadow && `shadow-${shadow}`
  ];
});
</script>
<template>
  <a class="VPButton medium brand"><slot /></a>
</template>
