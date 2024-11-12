<template>
  <div class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line no-undef
import mitt from 'mitt'
import { onUnmounted, provide } from 'vue'

type ValidateFunction = () => boolean

let fnArr: ValidateFunction[] = []

// eslint-disable-next-line no-undef
const emiter = defineEmits(['form-submit'])
const submitForm = () => {
  const isAllValidate = fnArr.map(fn => fn()).every(isValidate => isValidate)
  emiter('form-submit', isAllValidate)
  mitter.emit('input-clear')
}
// eslint-disable-next-line vue/no-export-in-script-setup
const mitter = mitt()
// eslint-disable-next-line no-undef
provide('mitter', mitter)
const callback:any = (fn: ValidateFunction) => {
  fnArr.push(fn)
}

mitter.on('form-item-created', callback)

onUnmounted(() => {
  mitter.off('form-item-created', callback)
  mitter.off('input-clear')
  fnArr = []
})
</script>

<style scoped>

</style>
