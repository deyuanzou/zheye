<template>
  <div class="dropdown" ref="dropdownRef">
    <a to="/signup" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">{{ title }}</a>
    <ul class="dropdown-menu" style="display: block" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line no-undef
import { ref } from 'vue'
import useClickOutside from '@/hooks/useClickOutside'

// eslint-disable-next-line no-undef
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
const isOpen = ref(false)
const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const dropdownRef = ref<null | HTMLElement>(null)

useClickOutside(dropdownRef, isOpen)
</script>

<style scoped>
.dropdown {
  right: 10px;
}
</style>
