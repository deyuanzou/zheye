<template>
  <validate-form @form-submit="onFormSubmit">
    <label for="email">邮箱地址</label>
    <validate-input id="email" type="email" :rules="emailRules" v-model="emailValue" placeholder="请输入邮箱"></validate-input>
    <label for="password">密码</label>
    <validate-input id="password" type="password" :rules="passwordRules" v-model="passwordValue"
                    placeholder="请输入密码"></validate-input>
  </validate-form>
</template>

<script setup lang="ts">
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { Rules } from '@/components/ValidateInput.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()

const emailValue = ref('111@test.com')
const passwordValue = ref('111111')

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

const store = useStore()

const onFormSubmit = (isAllValid: boolean) => {
  if (isAllValid) {
    const payload = {
      email: emailValue.value,
      password: passwordValue.value
    }
    store.dispatch('loginAndFetch', payload)
      .then(data => {
        router.push('/')
      }).catch(e => {
        console.log(e)
      })
  }
}

</script>

<style scoped>

</style>
