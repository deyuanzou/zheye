<template>
  <div>
    <p v-html="post.content"></p>
  </div>
</template>

<script setup lang="ts">

import { useRoute } from 'vue-router'
import { computed, ComputedRef, onMounted } from 'vue'
import { PostProps, store } from '@/store/store'

const route = useRoute()
const id = route.params.id

onMounted(() => {
  store.dispatch('fetchPost', id)
})

const post: ComputedRef<PostProps> = computed(() => store.state.post)
</script>

<style>

</style>
