<script setup>
import {NCard, NTabs, NTabPane, NInput, NFormItem, NButton, NForm, NDataTable} from 'naive-ui'
import {ref,defineExpose} from "vue";
import {backendURL} from '../../../ENV.mjs'
import {router} from "../../../router/index.js";


const tabValue = ref(null)
const studentId = ref()
const term =ref()

const resultColumns =ref()
const resultData =ref()

defineExpose({
  tabValue,
  studentId,
  studentCourseStatistic
})
function _fetchData(URL,procedure=()=>{}){
  let authorization = 'Bearer '+ localStorage.getItem('token')
  fetch(URL,{
    method:'GET',
    headers:{
      'authorization': authorization
    }
  })
      .then(response => {
        //...时间紧任务重，不暂时不实现为中间件
        if (response.status === 401) {
          alert('没有登陆,先登陆')
          window.location.replace('/login')
          return
        }
        if (!response.ok) {
          //参数错误
          //...
          return
        }
        return response.json();
      })
      .then(data=>{
        console.log(data)
        if(data === undefined) return
        resultData.value = data
        //修改resultColumns
        let newColumns = []
        if(data.length !== 0){
          for(let c of Object.keys(data[0])) {
            newColumns.push({
              title: c,
              key: c
            })
          }
        }
        resultColumns.value = newColumns
        //完成后的过程
        procedure()
      })
}
function allCourseGradeStatistic(){
  let URL = backendURL+'admin/statistic/all_course_grade'
  _fetchData(URL)
}
function gradeInTermStatistic(){
//2022/2023(2)
  let URLComponentTerm = encodeURIComponent(term.value);
  let URL = backendURL+`admin/statistic/grade_in_term/term/${URLComponentTerm}`
  _fetchData(URL)
}

function studentCourseStatistic(){
  let URL = backendURL+`admin/statistic/student_course/student_id/${studentId.value}`
  _fetchData(URL)
}
function studentGradeRankingStatistic(){
  let URL = backendURL+'admin/statistic/student_grade_ranking'
  _fetchData(URL)
}

</script>

<template>
  <n-card>
    <n-tabs
        class="card-tabs"
        default-value="classCourse"
        size="large"
        v-model:value="tabValue"
        animated
        pane-wrapper-style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
    >
      <n-tab-pane name="allCourseGrade" tab="所有课程成绩统计" >
        <n-form
            inline
            label-placement="left"
            label-width="auto"
            :label-width="80"
            :size="'small'"
        >
          <n-form-item>
            <n-button attr-type="button" @click="allCourseGradeStatistic">
              点击统计
            </n-button>
          </n-form-item>
        </n-form>
      </n-tab-pane>
      <n-tab-pane name="gradeInTerm" tab="按学年学生成绩统计" >
        <n-form
            inline
            label-placement="left"
            label-width="auto"
            :label-width="80"
            :size="'small'"
        >
          <n-form-item label="学年">
            <n-input v-model:value="term" placeholder="如2023/2024(2))" />
          </n-form-item>
          <n-form-item>
            <n-button attr-type="button" @click="gradeInTermStatistic">
              统计
            </n-button>
          </n-form-item>
        </n-form>
      </n-tab-pane>
      <n-tab-pane name="studentCourse" tab="学生所学课程及学分统计">
        <n-form
            inline
            label-placement="left"
            label-width="auto"
            :label-width="80"
            :size="'small'"
        >
          <n-form-item label="学生编号">
            <n-input v-model:value="studentId" placeholder="学生编号" />
          </n-form-item>
          <n-form-item>
            <n-button attr-type="button" @click="studentCourseStatistic">
              统计
            </n-button>
          </n-form-item>
        </n-form>
      </n-tab-pane>
      <n-tab-pane name="studentGradeRanking" tab="全体学生成绩及排名统计">
        <n-form
            inline
            label-placement="left"
            label-width="auto"
            :label-width="80"
            :size="'small'"
        >
          <n-form-item>
            <n-button attr-type="button" @click="studentGradeRankingStatistic">
              点击统计
            </n-button>
          </n-form-item>
        </n-form>
      </n-tab-pane>

    </n-tabs>
    <n-card>
      <div id="resultTable">
        <n-card
            title=""></n-card>
        <n-data-table
            :columns="resultColumns"
            :data="resultData"
            :pagination="false"
            :bordered="false"
        ></n-data-table>
      </div>
    </n-card>
  </n-card>
</template>

<style scoped>

</style>