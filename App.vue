<template lang='pug'>
.bg-white.min-h-full
  p.text-blue-500 Hello World
  HelloWorld(msg='Hello Electron + Vue 3.0 + Vite')
</template>
<script lang='ts'>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: { HelloWorld }
}
</script>