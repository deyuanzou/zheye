<template>
  <li :class="{'is-disabled':props.disabled}" class="dropdown-option">
    <slot></slot>
  </li>
</template>

<script setup lang="ts">
// eslint-disable-next-line no-undef
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

</script>

<style scoped>
.is-disabled.dropdown-option * {
  color: #6c757d !important;
  pointer-events: none;
  background-color: transparent;
}
</style>
