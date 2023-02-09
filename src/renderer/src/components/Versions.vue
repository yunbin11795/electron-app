<!--
 * @Description: 
 * @Author: Chen YunBin
 * @Date: 2022-11-21 09:40:30
 * @LastEditors: Chen YunBin
 * @LastEditTime: 2023-02-09 14:44:25
 * @FilePath: \electron-app\src\renderer\src\components\Versions.vue
-->

<template>
  <div>
    <ul class="versions">
      <li class="electron-version">Electron v{{ versions.electron }}</li>
      <li class="chrome-version">Chromium v{{ versions.chrome }}</li>
      <li class="node-version">Node v{{ versions.node }}</li>
      <li class="v8-version">V8 v{{ versions.v8 }}</li>
    </ul>
    <span ref="counter" class="number">1</span>
    <button @click="func">
      测试
    </button>
    <button @click="toggle">切换主题</button>
    <button @click="system">系统主题</button>
    <button @click="start">开始闪烁</button>
    <button @click="stop">停止闪烁</button>
    <button  @click="test">发送通知</button>
    <a download href="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-06-27%2F5b3345789ca2c.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671935616&t=3f6b0733a1a4bc73b30b013265eae4fc">
      下载
    </a>
    <i class="iconfont icon-tuichu" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import Push from 'push.js'
const versions = reactive({ ...window.electron.process.versions })
const func = async():Promise<void> => {
  const response = await window.ipcRenderer.openFile()
  console.log(response) // 打印
}

const counter = ref<null | HTMLElement>(null)

const toggle = async():Promise<void> => {
  await window.ipcRenderer.toggle()
}

const system = async():Promise<void> => {
  await window.ipcRenderer.system()
}

const start = ():void => {
  window.ipcRenderer.startFlash()
}

const stop = ():void => {
  window.ipcRenderer.stopFlash()
}

const test = ():void => {
  console.log(Push.Permission.has())
  Push.create('Hello world!', {
    body: "How's it hangin'?",
    timeout: 4000,
    tag: 'foo',
    onClick: function() {
      window.focus()
      Push.close('foo')
    }
  })
}
</script>
