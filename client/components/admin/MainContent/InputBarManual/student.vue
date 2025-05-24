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
        :style="{ maxWidth: '300px' }"

    >
      <n-form-item label="学生编号">
        <n-input  v-model:value="majorID" placeholder="学生编号" />
      </n-form-item>
      <n-form-item label="所属班级编号">
        <n-input v-model:value="majorName" placeholder="所属班级编号" />
      </n-form-item>
      <n-form-item label="名称">
        <n-input v-model:value="majorName" placeholder="名称" />
      </n-form-item>
      <n-form-item label="年龄">
        <n-input v-model:value="majorName" placeholder="年龄" />
      </n-form-item>
      <n-form-item label="性别">
        <n-input v-model:value="majorName" placeholder="性别" />
      </n-form-item>
      <n-form-item label="生源地">
        <n-input v-model:value="majorName" placeholder="生源地" />
      </n-form-item>
      <n-form-item label="入学年份">
        <n-input v-model:value="majorName" placeholder="入学年份" />
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