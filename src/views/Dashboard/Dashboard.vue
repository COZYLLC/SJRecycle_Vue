<template>
  <div style="padding: 0; width: 100vw">
    <navBar style="margin-left: 50px" />
    <router-view style="padding: 20px; margin-left: 50px"></router-view>
  </div>
</template>

<style>
</style>
<script>
import navBar from "@/components/navBar.vue";
export default {
  components: {
    navBar,
  },
};
</script>