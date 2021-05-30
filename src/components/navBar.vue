<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          :src="logo"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
      </b-navbar-item>
    </template>
    <template #start>
      <router-link :to="'/dashboard'">
      <b-navbar-item > 관리도구 </b-navbar-item></router-link>
    </template>
  </b-navbar>
</template>

<script>
import logo from '@/assets/logo.png'
export default {
  data() {
    return {
      logo:logo
    }
  }
}
</script>