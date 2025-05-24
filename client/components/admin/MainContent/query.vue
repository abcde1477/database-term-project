<script setup>
  import preSearch from './preSearch.vue'
  import queryContainer from './queryContainer.vue'
  import {ref, defineProps,defineEmits, watch, onMounted, h} from "vue";
  import {NButton} from "naive-ui";
  import {router} from '../../../router/index.js'

  //const tabAdd =()=>{containerExpose.value.tabValue='-'+containerExpose.value.tabValue}
  const props = defineProps({
    tabValue: String
  })
  const containerExpose = ref({tabValue:null})

  watch(() => props.tabValue,(after,before)=>{
    containerExpose.value.tabValue =  after
  })

  onMounted( () => {
    containerExpose.value.tabValue = props.tabValue
  });
  function handleFillIn(message){
    //message对象
    // {tabValue:,id:}

  }
  const buttonAction={
    ClassCourseRender(row){
      return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => {
              //填入信息
              router.push('/admin/query/classCourse')
              containerExpose.value.tabValue = 'classCourse'
              containerExpose.value.classId = row['班级编号']
              containerExpose.value.classCourseQuery()//直接调用

            }
          },
          { default: () => "查询课表" }
      )
    },
    studentGradeRender(row){
      return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => {
              //填入信息
              router.push('/admin/query/studentGrade')
              containerExpose.value.tabValue = 'studentGrade'
              containerExpose.value.studentId = row['学生编号']
              containerExpose.value.studentGradeQuery()//直接调用
            }
          },
          { default: () => "查询成绩" }

      )
    },
    professorCourseScheduleRender(row){
      return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => {
              //填入信息
              router.push('/admin/query/professorCourseSchedule')
              containerExpose.value.tabValue = 'professorCourseSchedule'
              containerExpose.value.lecturerId = row['教授编号']
              containerExpose.value.professorCourseSchedule()//直接调用

            }
          },
          { default: () => "查询课表" }

      )
    }


  }
</script>
  <!--试图统一三个查询项目-->


<template>
  <preSearch :objectNameInactive="false" :type="'query'" :buttonAction="buttonAction"></preSearch>
  <query-container ref="containerExpose"></query-container>
  <!--通过defineExpose加ref的方法来暴露属性,不知道安不安全-->
</template>
<style scoped>

</style>