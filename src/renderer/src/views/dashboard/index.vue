<!--
 * @Description: 
 * @Author: Chen YunBin
 * @Date: 2022-11-25 16:56:40
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-01-30 11:20:29
 * @FilePath: \electron-app\src\renderer\src\views\dashboard\index.vue
-->
<template>
  <div class="dashboard-container">
      <MessageList 
        @handleAdd="handleAdd"
      />
      <div class="tab-container">
        <div class="tab-list" v-for="item in list" @click="handClickTab(item)">
           <img src="@renderer/assets/1.jpg" />
           <span>{{ item.name}}</span>
           <el-icon class="tab-close" @click.stop="handleClose(item)">
              <Close />
           </el-icon>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
 import MessageList from "./components/MessageList.vue"
 import { ref } from 'vue'
 import { Close } from '@element-plus/icons-vue'
 
 let list:any = ref([])
 const handleAdd = (item)=>{
    list.value.push(item)
 }
 const handClickTab = (item)=>{
   window.ipcRenderer.clickBrowserView(item.id)
 }

 const handleClose = (item)=>{
  window.ipcRenderer.delBrowserView(item.id)
  list.value = list.value.filter( o => o.id !== item.id)
 }

</script>

<style lang="scss">
.dashboard-container{
  display: flex;
  padding-left: 10px;
}
img{
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.tab-container{
  display: flex;
  overflow: auto;
  height: 70px;
  flex: 1;
}
.tab-list{
  display: flex;
  height: 50px;
  width: 100px;
  align-items: center;
  background: #eee;
  margin-left: 10px;
}
.tab-close{
  cursor: pointer;
}
</style>