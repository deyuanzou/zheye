<template>
  <div class="validate-input-container pb-3">
    <input v-if="tag!='textarea'"
           class="form-control"
           @blur="validateInput"
           :class="{'is-invalid':inputModel.wrong}"
           :value="inputModel.value"
           @input="updateValue"
           v-bind="$attrs"/>
    <textarea v-else
              class="form-control"
              @blur="validateInput"
              :class="{'is-invalid':inputModel.wrong}"
              :value="inputModel.value"
              @input="updateValue"
              v-bind="$attrs"/>
    <div class="invalid-feedback" v-if="inputModel.wrong">{{ inputModel.message }}</div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted, PropType, reactive } from 'vue'
import mitt, { Emitter } from 'mitt'
// eslint-disable-next-line no-undef
defineOptions({
  inheritAttrs: false
})
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/

interface Rule {
  type: 'required' | 'email' | 'custom';
  message: string;
  validator?: () => boolean;
}

export type TagType = 'input' | 'textarea'
export type Rules = Rule[]

// eslint-disable-next-line no-undef
const props = defineProps({
  rules: Array as PropType<Rules>,
  modelValue: String,
  tag: {
    type: String as PropType<TagType>,
    default: 'input'
  }
})
const inputModel = reactive({
  value: props.modelValue || '',
  wrong: false,
  message: ''
})

let allPassed: boolean

// eslint-disable-next-line @typescript-eslint/no-empty-function
const validateInput = () => {
  if (props.rules) {
    allPassed = props.rules.every(rule => {
      let passed = true
      inputModel.message = rule.message
      switch (rule.type) {
        case 'required':
          passed = (inputModel.value.trim() !== '')
          break
        case 'email':
          passed = emailRegex.test(inputModel.value)
          break
        case 'custom':
          passed = rule.validator ? rule.validator() : true
          break
        default:
          break
      }
      return passed
    })
    inputModel.wrong = !allPassed
  }
  return allPassed
}

// eslint-disable-next-line no-undef
const emiter = defineEmits(['update:modelValue'])

// eslint-disable-next-line @typescript-eslint/no-empty-function
const updateValue = (e: KeyboardEvent) => {
  const targetValue = (e.target as HTMLInputElement).value
  inputModel.value = targetValue
  emiter('update:modelValue', targetValue)
}

const mitter: any = inject('mitter')

onMounted(() => {
  mitter.emit('form-item-created', validateInput)
})

const callback = () => {
  inputModel.value = ''
}
mitter.on('input-clear', callback)

onUnmounted(() => {
  mitter.off('input-clear', callback)
})
</script>

<style scoped>

</style>
