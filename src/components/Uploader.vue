<template>
  <div class="file-upload">
    <div @click.prevent="triggerUpload" v-bind="$attrs">
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData">
        <button class="btn btn-primary" disabled>上传成功!</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input type="file"
           class="file-input d-none" ref="fileInput" @change="handleFileChange">
  </div>
</template>

<script setup lang="ts">

import { PropType, ref } from 'vue'
import axios from '@/axios/axios'

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean;

// eslint-disable-next-line no-undef
defineOptions({
  inheritAttrs: false
})

const fileInput = ref<null | HTMLInputElement>(null)
const fileStatus = ref<UploadStatus>('ready')
const triggerUpload = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

// eslint-disable-next-line no-undef
const props = defineProps({
  action: {
    type: String,
    required: true
  },
  beforeUpload: {
    type: Function as PropType<CheckFunction>
  }
})

// eslint-disable-next-line no-undef
const emit = defineEmits(['file-uploaded', 'file-upload-error'])
const uploadedData = ref(null)

const handleFileChange = (e: Event) => {
  const currentTarget = e.target as HTMLInputElement
  if (currentTarget.files) {
    const files = Array.from(currentTarget.files)
    if (props.beforeUpload) {
      const isValid = props.beforeUpload(files[0])
      if (!isValid) {
        return
      }
    }
    fileStatus.value = 'loading'
    const formData = new FormData()
    formData.append('file', files[0])
    axios.post(props.action, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(resp => {
        fileStatus.value = 'success'
        uploadedData.value = resp.data
        emit('file-uploaded', resp.data)
      })
      .catch(error => {
        fileStatus.value = 'error'
        emit('file-upload-error', { error })
      })
      .finally(() => {
        if (fileInput.value) {
          fileInput.value.value = ''
        }
      })
  }
}

</script>

<style scoped>

</style>
