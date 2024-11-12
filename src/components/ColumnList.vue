<template>
  <div class="row">
    <div v-for="item in pList" :key="item._id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="item.avatar && item.avatar.url" :alt="item.title" class="rounded-circle border border-light w-25 my-3">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text" style="text-align: left">{{ item.description }}</p>
          <router-link :to="`/column/${item._id}`" clss="btn btn-outline-primary">
            进入专栏
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, defineProps, computed } from 'vue'
import { ColumnProps } from '@/store/store'

const props = defineProps({
  list: {
    type: Array as PropType<ColumnProps[]>,
    required: true
  }
})

const pList = computed(() => {
  return props.list.map(item => {
    if (!item.avatar) {
      item.avatar = {
        url: require('@/assets/avatar.jpg'),
        _id: ''
      }
    }
    return item
  })
})

</script>

<style scoped>

</style>
