<template lang='pug'>
.hello-world
  h1 {{ msg }}
  button(@click='inc') count is: {{ state.count }}
  p
    | Edit 
    code components/HelloWorld.vue
    |  to test hot module replacement.
</template>

<script lang='ts'>
import { reactive } from 'vue'
export default {
  name: 'HelloWorld',
  props: { msg: String },
  setup () {
    const state = reactive({ count: 0 })
    function inc () { window.$store.set('count', ++state.count) }
    return { state, inc }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
