<!--
 * @Description: 消息列表
 * @Author: Chen YunBin
 * @Date: 2023-01-29 10:27:19
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-01-29 17:00:39
 * @FilePath: \electron-app\src\renderer\src\views\dashboard\components\MessageList.vue
-->
<template>
  <div class="message-container">
     <div v-for="item in list" class="list-box" @click="handAdd(item)">
        <div>{{ item.name }}</div>
        <div>{{ item.number }}</div>
        <div>{{ item.time }}</div>
     </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const emits = defineEmits(['handleAdd'])
const list = reactive([
  {
    id: 1,
    name: "test1",
    number: 70,
    time: "2023-01-29",
    url: 'https://www.baidu.com'
  },
  {
    id:2,
    name: "test2",
    number: 80,
    time: "2023-01-29",
    url: 'https://www.bilibili.com'
  },
  {
    id: 3,
    name: "test3",
    number: 90,
    time: "2023-01-30",
    url: 'https://www.taobao.com'
  }
])

const handAdd = (item)=>{
  window.ipcRenderer.addBrowserView({id: item.id, url: item.url})
  emits('handleAdd',item)
}
</script>

<style lang="scss">
  .message-container{
     width: 250px;
  }
  .list-box{
    border: 1px solid #ccc;
    margin-bottom: 20px;
    cursor: pointer;
  }
</style>
