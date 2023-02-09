<!--
 * @Description: 选择语言
 * @Author: Chen YunBin
 * @Date: 2023-02-02 12:17:25
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-02-03 17:00:19
 * @FilePath: \electron-app\src\renderer\src\components\LangSelect\index.vue
-->
<template>
  <el-dropdown trigger="click" @command="handleSetLanguage">
    <span class="el-dropdown-link">
      <el-icon class="setting">
        <Setting />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language==='zh-CN'" command="zh-CN">
          {{ $t('chinese') }}
        </el-dropdown-item>
        <el-dropdown-item :disabled="language==='en'" command="en">
          {{ $t('english') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { Setting } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { userStore } from '@renderer/store/user'

const store = userStore()
const { language } = storeToRefs(store)
const { locale } = useI18n()

const handleSetLanguage = (lang) => {
  store.setLanguage(lang)
  locale.value = lang
}

</script>

<style lang="scss">
.setting{
  font-size: 26px;
  cursor: pointer;
}
</style>
