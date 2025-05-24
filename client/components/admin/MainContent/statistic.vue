<script setup>
import statisticContainer from './statisticContainer.vue'
import preSearch from './preSearch.vue'

import {ref, defineProps, watch, onMounted, h} from "vue";
import {NButton} from "naive-ui";

const props = defineProps({
  tabValue: String
})
const containerExpose = ref({tabValue:null})
const preSearchExpose = ref()
const searchInactive =ref(props.tabValue ==='allCourseGrade')
//摆烂了这个逻辑
watch(() => props.tabValue,(after,before)=>{
  searchInactive.value = props.tabValue ==='allCourseGrade'
  containerExpose.value.tabValue =  after
})

watch(
    ()=>containerExpose.value.tabValue,
    (after,before)=>{
      searchInactive.value =
          containerExpose.value.tabValue !=='studentCourse'
      preSearchExpose.value.cleanPreSearch()
    }
)
onMounted( () => {
  console.log(containerExpose)
  containerExpose.value.tabValue = props.tabValue
});
const buttonAction ={
  //只有一种按钮:填充至当前搜索栏
  studentCourseRender(row){
    return h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: 'small',
          onClick: () => {
            //不跳转分页栏,
            //router.push('/admin/query/studentGrade')
            //containerExpose.value.tabValue = 'studentGrade'
            containerExpose.value.studentId = row['学生编号']//数据填充
            containerExpose.value.studentCourseStatistic()//直接调用
          }
        },
        { default: () => "查询" }

    )
  }
}
</script>

<template>
  <preSearch ref="preSearchExpose" :objectNameInactive="true" :type="'statistic'" :buttonAction="buttonAction" :searchInactive="searchInactive"></preSearch>
  <statistic-container ref="containerExpose"></statistic-container>
</template>

<style scoped>

</style>