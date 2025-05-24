<script setup>
import {NButton, NCard, NForm, NFormItem, NInput} from 'naive-ui'
</script>

<template>
  <n-card>
    <n-form
        label-width="auto"
        :label-width="40"
        :size="'small'"
        label-placement="left"
        :style="{ maxWidth: '350px' }"

    >
      <n-form-item label="课程编号">
        <n-input  v-model:value="majorID" placeholder="课程编号" />
      </n-form-item>
      <n-form-item label="所属班级编号">
        <n-input v-model:value="majorName" placeholder="所属班级编号" />
      </n-form-item>
      <n-form-item label="课程名称">
        <n-input v-model:value="majorName" placeholder="课程名称" />
      </n-form-item>
      <n-form-item label="开设学期">
        <n-input v-model:value="majorName" placeholder="开设学期" />
      </n-form-item>
      <n-form-item label="学时">
        <n-input v-model:value="majorName" placeholder="学时" />
      </n-form-item>
      <n-form-item label="学分">
        <n-input v-model:value="majorName" placeholder="学分" />
      </n-form-item>
      <n-form-item label="考核方式">
        <n-input v-model:value="majorName" placeholder="考核方式" />
      </n-form-item>
      <n-form-item>
        <n-button attr-type="button" @click="professorCourseSchedule">
          插入数据
        </n-button>
      </n-form-item>
      <n-form-item></n-form-item>
      <n-form-item></n-form-item>
    </n-form>
  </n-card>
</template>

<style scoped>

</style>