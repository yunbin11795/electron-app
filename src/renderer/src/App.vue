<!--
 * @Description: 
 * @Author: Chen YunBin
 * @Date: 2022-11-21 09:40:30
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2022-11-25 17:15:51
 * @FilePath: \electron-app\src\renderer\src\App.vue
-->
<template>
  <Versions></Versions>
  <router-view></router-view>
</template>

<script setup lang="ts">
import Versions from './components/Versions.vue'
</script>

<style lang="scss">
@use './styles/reboot.scss';
.my-webview{
  height: 500px;
  width: 100%;
}
</style>
