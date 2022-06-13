<template>
  <div id="app">
    <nav>
      <NavBar></NavBar>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './layouts/NavBar.vue'

export default {
  components: {
    NavBar
  }
}
</script>