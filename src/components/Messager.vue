<template>
  <teleport to="#message">
    <div v-if="messager.isVisible" class="alert d-flex align-items-center container alert-dismissible show"
         role="alert"
         :class="alertClass">
      <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
           viewBox="0 0 16 16" role="img" aria-label="Warning:">
        <path
          d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </svg>
      <strong>{{ messager.message }}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
              @click.prevent="handleClick"></button>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { store } from '@/store/store'

const messager = computed(() => store.state.messager)
console.log(messager)

const handleClick = () => {
  store.commit('switchVisible', false)
}

const alertClass = computed(() => {
  let baseClass = ''
  if (messager.value && messager.value.type) {
    switch (messager.value.type) {
      case 'success':
        baseClass += 'alert-success'
        break
      case 'error':
        baseClass += 'alert-danger'
        break
      case 'default':
        baseClass += 'alert-info'
        break
    }
  }
  return baseClass
})

</script>

<style scoped>
.container svg {
  width: 16px;
  height: 16px;
}

</style>
