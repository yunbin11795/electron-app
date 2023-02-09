<!--
 * @Description: 登录
 * @Author: Chen YunBin
 * @Date: 2023-01-29 09:44:41
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-02-09 12:26:09
 * @FilePath: \electron-app\src\renderer\src\views\user\index.vue
-->
<template>
  <div class="login">
    <LangSelect />
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item :label="$t('login.account')">
        <el-input v-model="formLabelAlign.email" />
      </el-form-item>
      <el-form-item :label="$t('login.password')">
        <el-input v-model="formLabelAlign.password" type="password" />
      </el-form-item>
      <el-button type="primary" class="login-button" @click="login">登录</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import LangSelect from '@renderer/components/LangSelect/index.vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Login } from '@renderer/api/user'
import { userStore } from '@renderer/store/user'

const labelPosition = ref('right')
const router = useRouter()
const store = userStore()
const formLabelAlign = reactive({
  email: 'J@163.com',
  password: '123456789'
})

const login = () => {
  Login(formLabelAlign).then((res:any) => {
    if (!res.errorCode) {
      store.setUser(res.data)
      router.push({ name: 'Dashboard' })
    }
  })
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
