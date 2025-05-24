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
      <n-form-item label="班级编号">
        <n-input v-model:value="majorID" placeholder="班级编号" />
      </n-form-item>
      <n-form-item label="学生编号">
        <n-input v-model:value="majorName" placeholder="班级名称" />
      </n-form-item>
      <n-form-item label="专业">
        <n-input v-model:value="majorName" placeholder="专业" />
      </n-form-item>
      <n-form-item>
        <n-button attr-type="button" @click="professorCourseSchedule">
          插入数据
        </n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>

<style scoped>

</style>