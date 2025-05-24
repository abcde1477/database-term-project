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
      <n-form-item label="学生编号">
        <n-input v-model:value="majorName" placeholder="班级名称" />
      </n-form-item>
      <n-form-item label="教师编号">
        <n-input v-model:value="majorID" placeholder="教师编号" />
      </n-form-item>
      <n-form-item label="课程名">
        <n-input v-model:value="majorName" placeholder="课程名" />
      </n-form-item>
      <n-form-item label="成绩">
        <n-input v-model:value="majorName" placeholder="成绩(可留空)" />
      </n-form-item>
      <n-form-item>
        <n-button attr-type="button" @click="professorCourseSchedule">
          插入数据
        </n-button>
      </n-form-item>
      <n-form-item>

      </n-form-item>
    </n-form>
  </n-card>
</template>

<style scoped>

</style>