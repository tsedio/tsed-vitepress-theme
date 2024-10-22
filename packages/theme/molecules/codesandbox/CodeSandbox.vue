<script setup lang="ts">
import {computed, ref} from "vue";
import Button from "../button/Button.vue";

export interface CodeSandboxProps {
  sandboxId: string;
  fontSize?: number;
  hideNavigation?: number;
  theme?: string;
  title?: string;
  allow?: string;
  sandbox?: string;
  height?: string;
}

const props = withDefaults(defineProps<CodeSandboxProps>(), {
  fontSize: 14,
  hideNavigation: 1,
  theme: "dark",
  allow:
    "accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking",
  sandbox: "allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts",
  height: "500px",
  title: ""
});
const show = ref(false);

const href = computed(() => {
  const {sandboxId, fontSize, hideNavigation, theme} = props;
  return `https://codesandbox.io/embed/${sandboxId}?fontsize=${fontSize}&hidenavigation=${hideNavigation}&theme=${theme}`;
});

const toggle = () => {
  show.value = true;
};
</script>
<template>
  <div v-if="!show" :style="{height}" class="relative">
    <div class="sandbox-logo-bg absolute top-0 left-0 h-full w-full overflow-hidden rounded-md z-0">
      <svg
        class="w-full fill-blue-400 opacity-10"
        viewBox="0 0 256 256"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        preserveAspectRatio="xMidYMid"
      >
        <g>
          <path
            d="M115.497674,261.08837 L115.497674,154.478845 L23.8139535,101.729261 L23.8139535,162.501763 L65.8104558,186.8486 L65.8104558,232.549219 L115.497674,261.08837 Z M139.311628,261.714907 L189.916577,232.563707 L189.916577,185.779949 L232.186047,161.285235 L232.186047,101.27387 L139.311628,154.895035 L139.311628,261.714907 Z M219.971965,80.8276886 L171.155386,52.5391067 L128.292316,77.4106841 L85.1040206,52.5141067 L35.8521355,81.1812296 L127.765737,134.063073 L219.971965,80.8276886 Z M0,222.211907 L0,74.4948807 L127.986799,0 L256,74.1820085 L256,221.978632 L127.983954,295.72283 L0,222.211907 Z"
          ></path>
        </g>
      </svg>
    </div>
    <div class="absolute top-0 left-0 h-full w-full flex items-center justify-center z-1">
      <Button component="button" @click="toggle">Start sandbox</Button>
    </div>
  </div>
  <iframe
    v-else
    class="iframe-sandbox w-full border-0"
    data-testid="iframe-sandbox"
    :src="href"
    :sandboxId="sandboxId"
    :title="title"
    :sandbox="sandbox"
    :allow="allow"
    :style="{height}"
  />
</template>

<style>
.sandbox-logo-bg {
  svg {
    fill: theme("colors.gray.400");
  }
}
</style>
