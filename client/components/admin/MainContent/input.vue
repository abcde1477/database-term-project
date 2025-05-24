<script setup>
import {NCard, NSelect, NForm, NButton, NIcon, NUpload, NUploadDragger, NText, NP, NInput, NFormItem} from "naive-ui"
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
import {ref, shallowRef, watch} from "vue";
const ObjectNameByManual = ref(null)
const objectNameByAuto = ref(null)

import majorVue from './InputBarManual/major.vue'
import classVue from './InputBarManual/class.vue'
import courseVue from './InputBarManual/course.vue'
import studentVue from './InputBarManual/student.vue'
import lecturerVue from './InputBarManual/lecturer.vue'
import reportVue from './InputBarManual/report.vue'
const ObjectToInsert = shallowRef(majorVue)
const objectOptions = [
  {
    label:'专业(major)',
    value:'major'
  },
  {
    label:'班级(class)',
    value:'class'
  },
  {
    label:'学生(student)',
    value:'student'
  },
  {
    label:'课程(course)',
    value:'course'
  },
  {
    label:'教师(lecturer)',
    value:'lecturer'
  },
  {
    label:'报告(report)',
    value:'report'
  }
]

watch(
    ()=>ObjectNameByManual.value,
    (after,before)=>{
      //不得已，v-select有个bug,value是对象就会显示{object Object}
      switch(after){
        case 'major':
          ObjectToInsert.value = majorVue
          break
        case 'class':
          ObjectToInsert.value = classVue
          break
        case 'student':
          ObjectToInsert.value = studentVue
          break
        case 'course':
          ObjectToInsert.value = courseVue
          break
        case 'lecturer':
          ObjectToInsert.value = lecturerVue
          break
        case 'report':
          ObjectToInsert.value = reportVue
          break
      }
    }
)
</script>

<template>
  <n-card
    title="信息输入"
    :header-style="{lineHeight:'6px',textAlign: 'left',fontSize:'24px'}"
    :style="{width:'800px'}"
  >
    <div id="tips" :style="{lineHeight:'16px',textAlign: 'left'}">
    这里可以手动或自动的为数据库输入信息<br>
      <br><br>
    </div>
    <n-card id="preSearchBar"
              title="手动插入"
              :header-style="{lineHeight:'6px',textAlign: 'left',fontSize:'24px'}">
          <n-select
              v-model:value="ObjectNameByManual"
              :options="objectOptions"
              :style="{width:'150px' }"
              placeholder="请选择"
          ></n-select>

        <keep-alive>
          <component :is="ObjectToInsert">
          </component>
        </keep-alive>
    </n-card>
    <n-card
        title="文本自动输入"
        :header-style="{lineHeight:'6px',textAlign: 'left',fontSize:'24px'}"
    >
      <n-card>
        <n-form
            inline
            label-placement="left"
            label-width="auto"
            :label-width="80"
            :size="'small'"
        >
          <n-form-item label="插入项">
            <n-select
                v-model:value="objectNameByAuto"
                :options="objectOptions"
                :style="{width:'150px' }"
                placeholder="请选择"
            ></n-select>
          </n-form-item>
          <n-form-item>
            <n-button attr-type="button" @click="insertMessageSend">

            </n-button>
          </n-form-item>
        </n-form>
      </n-card>
      <n-upload
          multiple
          directory-dnd
          action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
          :max="5"
      >
        <n-upload-dragger>
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
              <archive-icon />
            </n-icon>
          </div>
          <n-text style="font-size: 16px">
            点击或者拖动文件到该区域来上传
          </n-text>
          <n-p depth="3" style="margin: 8px 0 0 0">
            支持txt,csv格式表格
          </n-p>
        </n-upload-dragger>
      </n-upload>
    </n-card>
  </n-card>

</template>

<style scoped>

</style>