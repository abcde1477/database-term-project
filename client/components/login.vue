
<script setup>
import { ref } from 'vue';
import { NInput, NButton } from 'naive-ui';
import { useRouter } from 'vue-router';

import {backendURL} from '../ENV.mjs'

const router = useRouter();
const username = ref('');
const password = ref('');
const login = async function(){
  let account = {
    u:username.value,
    p:password.value
  }
  console.log(JSON.stringify(account))
  const response = await fetch(backendURL+'login/',{
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "omit", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:JSON.stringify(account)
      })
  if(response.status === 200){
    let token = (await response.json()).token
    alert('登陆成功,token是'+token)
    localStorage.setItem('token',token)
    await router.push('/admin')
  }
  if(response.status === 401){
    alert('账号或密码错误')
  }
}

</script>
<template>
  <div class="login-container">
    <h2>🗂️高校成绩管理系统</h2>
    <hr>
    <h3>👨‍🔧用户登录</h3>
    <n-input v-model:value="username" placeholder="账号" clearable />
    <n-input v-model:value="password" type="password" placeholder="密码" clearable />
    <label>不知道账号密码,请联系管理员</label><br>
    <n-button type="primary" @click="login">登录</n-button>

  </div>
</template>

<style scoped>
.login-container {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
