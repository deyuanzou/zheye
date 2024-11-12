<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4">
    <router-link class="navbar-brand" to="/">者也专栏</router-link>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link>
      </li>
      <li class="list-inline-item">
        <router-link to="/signup" class="btn btn-outline-light my-2">注册</router-link>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`你好 ${user.nickName}`">
          <dropdown-item>
            <router-link class="dropdown-item" to="/create">新建文章</router-link>
          </dropdown-item>
          <dropdown-item disabled>
            <a class="dropdown-item" href="#">编辑资料</a>
          </dropdown-item>
          <dropdown-item>
            <a class="dropdown-item" @click.prevent="handleLogout">退出登录</a>
          </dropdown-item>
        </dropdown>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import Dropdown from '@/components/Dropdown.vue'
import DropdownItem from '@/components/DropdownItem.vue'
import { store, UserProps } from '@/store/store'
import router from '@/router/router'

// eslint-disable-next-line no-undef
const props = defineProps({
  user: {
    type: Object as PropType<UserProps>,
    required: true
  }
})

const handleLogout = () => {
  console.log(88)
  store.commit('logout')
  router.push('/')
}

</script>

<style scoped>
ul:first-of-type {
  margin-right: 10px;
}

.navbar-brand {
  margin-left: 10px;
}
</style>
