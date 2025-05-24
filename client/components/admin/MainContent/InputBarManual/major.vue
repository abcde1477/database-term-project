<script setup>
import {NButton, NCard, NForm, NFormItem, NInput} from 'naive-ui'
import {ref} from "vue";

const majorName = ref('')

</script>

<template>
    <n-card>
      <n-form
          inline
          label-placement="left"
          label-width="auto"
          :label-width="80"
          :size="'small'"
      >
        <n-form-item label="专业名称">
          <n-input v-model:value="majorName" placeholder="专业名称" />
        </n-form-item>
        <n-form-item>
          <n-button attr-type="button" @click="insertMessageSend">
            插入
          </n-button>
        </n-form-item>
      </n-form>
    </n-card>
</template>

<style scoped>

</style>