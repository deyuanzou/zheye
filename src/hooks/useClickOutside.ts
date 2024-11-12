import { onMounted, onUnmounted, Ref } from 'vue'

const useClickOutside = (elementRef: Ref<null | HTMLElement>, isOpen:Ref) => {
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      // eslint-disable-next-line eqeqeq
      if (!(elementRef.value.contains(e.target as HTMLElement)) && isOpen.value === true) {
        isOpen.value = false
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
}

export default useClickOutside
