<script setup>
  import {NCard,NTabs,NTabPane,NDataTable,NInput,NButton,NForm,NFormItem} from 'naive-ui'
  import {ref,defineExpose} from "vue";
  import {backendURL} from '../../../ENV.mjs'
  const tabValue = ref(null)
  const classId = ref()
  const studentId = ref()
  const lecturerId= ref()
  const resultColumns =ref()
  const resultData =ref()

  defineExpose({
    tabValue,
    classId,
    studentId,
    lecturerId,
    classCourseQuery,
    studentGradeQuery,
    professorCourseSchedule
  })
  //结果栏请求fetch
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
  function classCourseQuery(){
      let URL = backendURL+`admin/query/class_course/id/${classId.value}`
      _fetchData(URL)
  }
  function studentGradeQuery(){
    let URL = backendURL+`admin/query/student_grade/id/${studentId.value}`
    _fetchData(URL)
  }
  function professorCourseSchedule(){
    let URL = backendURL+`admin/query/lecturer_course/id/${lecturerId.value}`
    console.log(URL)
    _fetchData(URL)
  }
  function handleTabChange(){
    router.push
  }
</script>

<template>
  <n-card>
    <n-tabs
        class="card-tabs"
        default-value="classCourse"
        size="large"
        v-model:value="tabValue"
        on-update:value="handleTabChange"
        animated
        pane-wrapper-style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
    >
      <n-tab-pane id ="classCourse" name="classCourse" tab="班级课程查询" >
        <n-form
            inline
            label-placement="left"
            label-width="auto"
            :label-width="80"
            :size="'small'"
        >
          <n-form-item label="班级编号">
            <n-input v-model:value="classId" placeholder="班级编号" />
          </n-form-item>
          <n-form-item>
            <n-button attr-type="button" @click="classCourseQuery">
              查询
            </n-button>
          </n-form-item>
        </n-form>
      </n-tab-pane>

      <n-tab-pane name="studentGrade" tab="学生成绩查询">
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
            <n-button attr-type="button" @click="studentGradeQuery">
              查询
            </n-button>
          </n-form-item>
        </n-form>
      </n-tab-pane>

      <n-tab-pane name="professorCourseSchedule" tab="教师任课查询">
        <n-form
            inline
            label-placement="left"
            label-width="auto"
            :label-width="80"
            :size="'small'"
        >
          <n-form-item label="教师编号">
            <n-input v-model:value="lecturerId" placeholder="教师编号" />
          </n-form-item>
          <n-form-item>
            <n-button attr-type="button" @click="professorCourseSchedule">
              查询
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