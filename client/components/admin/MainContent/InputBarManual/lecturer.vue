<script setup>
import {NButton, NCard, NForm, NFormItem, NInput} from 'naive-ui'
</script>

<template>
  <n-card>
    <n-form
        inline
        label-width="auto"
        :label-width="20"
        :size="'small'"
    >
      <n-form-item label="教师编号">
        <n-input v-model:value="majorID" placeholder="教师编号" />
      </n-form-item>
      <n-form-item label="学生编号">
        <n-input v-model:value="majorName" placeholder="教师名" />
      </n-form-item>
      <n-form-item label="年龄">
        <n-input v-model:value="majorName" placeholder="年龄" />
      </n-form-item>
      <n-form-item label="性别">
        <n-input v-model:value="majorName" placeholder="性别" />
      </n-form-item>
      <n-form-item label="职称">
        <n-input v-model:value="majorName" placeholder="职称" />
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