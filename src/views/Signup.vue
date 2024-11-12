<template>
  <div class="signup-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">注册者也账户</h5>
    <validate-form @form-submit="onFormSubmit">
      <label for="email">邮箱地址</label>
      <validate-input id="email" type="email" :rules="emailRules" v-model="formData.email"
                      placeholder="请输入邮箱"></validate-input>
      <label for="">昵称</label>
      <validate-input type="text" :rules="nameRules" v-model="formData.nickName"
                      placeholder="请输入昵称"
      ></validate-input>
      <label for="password">密码</label>
      <validate-input id="password" type="password" :rules="passwordRules" v-model="formData.password"
                      placeholder="请输入密码"></validate-input>
      <label for="confirm">确认密码</label>
      <validate-input id="confirm" type="password" :rules="confirmRules" v-model="formData.repeatPassword"
                      placeholder="请确认密码"></validate-input>
    </validate-form>
  </div>
</template>

<script setup lang="ts">

import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { Rules } from '@/components/ValidateInput.vue'
import { reactive, ref } from 'vue'
import axios from '@/axios/axios'
import router from '@/router/router'
import { store } from '@/store/store'

const formData = reactive({
  email: '@test.com',
  nickName: '',
  password: '123456789',
  repeatPassword: '123456789'
})

const emailRules: Rules = [
  {
    type: 'required',
    message: '邮箱地址不能为空'
  },
  {
    type: 'email',
    message: '无效的邮箱地址'
  }
]
const passwordRules: Rules = [
  {
    type: 'required',
    message: '请输入密码'
  }
]
const nameRules: Rules = [
  {
    type: 'required',
    message: '昵称不能为空'
  }
]
const confirmRules: Rules = [
  {
    type: 'required',
    message: '请重新输入密码以确认'
  },
  {
    type: 'custom',
    validator: () => formData.password === formData.repeatPassword,
    message: '密码不相同'
  }
]

const onFormSubmit = (isAllValid: boolean) => {
  if (isAllValid) {
    const payload = {
      email: formData.email,
      password: formData.password,
      nickName: formData.nickName
    }
    axios.post('/users/', payload).then(data => {
      // createMessage('注册成功 正在跳转登录页面', 'success')
      store.commit('callMessager', {
        status: true,
        type: 'success',
        message: '注册成功 正在跳转登录页面'
      })
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }).catch(e => {
      console.log(e)
    })
  }
}
</script>

<style scoped>

</style>
