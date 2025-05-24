<script setup>
  import { NButton } from 'naive-ui';
  import {ref} from "vue";

  let token = ref('NULL')
  token.value = localStorage.getItem('token')
  setInterval(()=>token.value = localStorage.getItem('token'),1000)
  if(!token.value) token.value="NULL"

  const removeLocal = function(){
    localStorage.removeItem('token')
  }
  const sendToken = function(){
    let authorization = 'Bearer '+ localStorage.getItem('token')
    fetch('http://duttwalker.ddns.net:60051/admin/test-token',{
      method:'GET',
      headers:{
        'authorization': authorization
      }
    }).then((res)=>{
      return res.json()
    }).then((data)=>{
      alert(data['message'])
    })
  }
</script>
<template>
  <div id="test-token">
    <h4>token测试组件</h4>
    <a>token:</a><a>{{token}}</a><br>
    <n-button @click="sendToken">发送含token的信息</n-button>
    <n-button @click="removeLocal">删除本地token</n-button>

  </div>
</template>

<style scoped>
#test-token {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>