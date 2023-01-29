<!--
 * @Description: 登录
 * @Author: Chen YunBin
 * @Date: 2023-01-29 09:44:41
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-01-29 10:19:13
 * @FilePath: \electron-app\src\renderer\src\views\user\index.vue
-->
<template>
  <div class="login">
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"

    >
      <el-form-item label="账号：">
        <el-input v-model="formLabelAlign.account" />
      </el-form-item>
      <el-form-item label="密码：">
        <el-input v-model="formLabelAlign.password"  type="password" />
      </el-form-item>

      <el-button type="primary" class="login-button" @click="login">登录</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';

const labelPosition = ref('right')
const router = useRouter();
const formLabelAlign = reactive({
  account: 'test',
  password: '123456',
})

const login = ()=>{
  router.push({ name: 'Dashboard' })
}
</script>

<style lang="scss" scoped>
.login{
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
}
.login-button{
  width: 100%;
}
</style>