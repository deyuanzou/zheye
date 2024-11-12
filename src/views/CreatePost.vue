<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <uploader
      action="/upload"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4 file-upload-container"
      :beforeUpload="beforeUpload"
      @file-uploaded="onFileUploaded"
    >
      <h2>点击上传头像</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url">
      </template>
    </uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          placeholder="请输入文章标题"
          type="text"
          :rules="titleRules"
          v-model="titleValue"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          type="text"
          rows="10"
          tag="textarea"
          placeholder="请输入文章详情"
          v-model="contentValue"
          :rules="contentRules"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">
          新建文章
        </button>
      </template>
    </validate-form>
  </div>
</template>

<script setup lang="ts">

import ValidateInput, { Rules } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import router from '@/router/router'
import { ImageProps, PostProps, ResponseType } from '@/store/store'
import axios from '@/axios/axios'
import Uploader from '@/components/Uploader.vue'

const store = useStore()
const titleRules: Rules = [
  {
    type: 'required',
    message: '文章标题不能为空'
  }
]
const contentValue = ref('')
const titleValue = ref('')
const contentRules: Rules = [
  {
    type: 'required',
    message: '文章详情不能为空'
  }
]

const onFormSubmit = (isAllValid: boolean) => {
  if (isAllValid) {
    const { column } = store.state.user
    const { _id } = store.state.user
    const newPost: PostProps = {
      title: titleValue.value,
      content: contentValue.value,
      column,
      author: _id
    }
    if (imageId.value) {
      newPost.image = imageId.value
    }
    store.dispatch('createPost', newPost).then(() => {
      store.commit('callMessager', {
        message: '发表成功，2秒后跳转到文章',
        type: 'success',
        isVisible: true,
        status: true
      })
    })
    router.push({
      name: 'column',
      params: { id: column }
    })
  }
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files) {
    const uploadedFile = files[0]
    const formData = new FormData()
    formData.append(uploadedFile.name, uploadedFile)
    axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(resp => {
      console.log(resp)
    })
  }
}

const beforeUpload = (file: File) => {
  const isJPG = file.type === 'image/jpeg'
  const isSizeValid = file.size <= 1048576 // 1MB = 1024 * 1024 = 1048576 字节

  if (!isJPG) {
    store.commit('callMessager', {
      type: 'error',
      message: '文件格式必须是.jpg或.jpeg',
      status: true,
      isVisible: true
    })
    return false
  }

  if (!isSizeValid) {
    store.commit('callMessager', {
      type: 'error',
      message: '文件大小不能超过1MB',
      status: true,
      isVisible: true
    })
    return false
  }

  return true
}

const imageId = ref()

const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
  imageId.value = rawData.data._id
  store.commit('callMessager', {
    message: `上传图片id ${rawData.data._id}`,
    type: 'success',
    isVisible: true,
    status: true
  })
}

</script>

<style>
.create-post-page .file-upload-container {
  height: 300px;
  cursor: pointer;
  overflow: hidden;
}

.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
