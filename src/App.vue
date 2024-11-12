<template>
  <div class="container">
    <GlobalHeader :user="currentUser"></GlobalHeader>
    <Loader text="拼命加载中"></Loader>
    <Messager v-if="messager.status"></Messager>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2024 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>
<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from '@/components/GlobalHeader.vue'
import { Rules } from '@/components/ValidateInput.vue'
import { computed, ComputedRef, onMounted } from 'vue'
import { Computed, useStore } from 'vuex'
import Loader from '@/components/Loader.vue'
import { MessagerProps } from '@/store/store'
import Messager from '@/components/Messager.vue'

const store = useStore()
const currentUser = computed(() => {
  return store.state.user
})
const messager:ComputedRef<MessagerProps> = computed(() => store.state.messager)

</script>
<style>

</style>
