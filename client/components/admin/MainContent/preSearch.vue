<script setup>
import {ref, watch, defineProps,defineExpose} from 'vue'
  import {backendURL} from "../../../ENV.mjs";
  import {NSelect,NInput,NButton,NCard,NDataTable} from 'naive-ui'
  const props = defineProps([
    'objectNameInactive',
    'searchInactive',
    'type',
    'buttonAction'
  ]);
  defineExpose({
    cleanPreSearch
  })
  const objectName = ref(null)
  const attributeName = ref(null)
  const attributeValue = ref(null)
  const attributeInactive = ref(props.searchInactive)

  const barData = ref([{'列':'占位'}])
  const barColumns =ref([])
  if(props.objectNameInactive === true) objectName.value = 'student'

  function cleanPreSearch(){
    barData.value=[{'列':'占位'}]
    barColumns.value= []
  }


  watch(
      //下拉选项锁定逻辑
      ()=>attributeName.value,
      (after,before)=>{
        if(after === 'all'){
          attributeValue.value=null
          attributeInactive.value=true
        }else{
          attributeInactive.value=false
        }
      }
  )

  const objectOptions = [
    {
      label:'学生(student)',
      value:'student'
    },
    {
      label:'教师(lecturer)',
      value:'lecturer'
    },
    {
      label:'班级(class)',
      value:'class'
    },
  ]
  const attributeOptions =[
    {
      label:'名称(name)',
      value:'name'
    },
    {
      label:'编号(id)',
      value:'id'
    },
    {
      label:'不设条件',
      value:'all'
    }
  ]
  let preSearch = ()=>{
    let object =objectName.value
    let attribute =attributeName.value
    let query =attributeValue.value
    let URL = backendURL+`admin/search/${object}/attribute_name/${attribute}/?value=${query}`
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
        barData.value = data
        //修改barColumns
        let newColumn = []
        for(let c of Object.keys(data[0])) {
          newColumn.push({
            title: c,
            key: c
          })
        }
        //填充按钮
        if(props.type=== 'query'){
          if(object==='class'){
            newColumn.push({
              title:'操作',
              key:'操作',
              render:props.buttonAction.ClassCourseRender
            })
          }else if(object==='lecturer') {
            newColumn.push({
              title: '操作',
              key: '操作',
              render: props.buttonAction.professorCourseScheduleRender
            })
          }else{
            newColumn.push({
              title: '操作',
              key: '操作',
              render: props.buttonAction.studentGradeRender
            })
          }
        }
        else {
          //props.type=== 'statistic'
          //按钮逻辑是填入当前的分页，如果是第一个则清空前置搜索栏
          newColumn.push({
            title: '操作',
            key: '操作',
            render: props.buttonAction.studentCourseRender
          })
        }


        barColumns.value = newColumn
      })
  }
</script>

<template>
  <!--选项-->
  <n-card id="preSearchBar"
    title="搜索"
    :header-style="{lineHeight:'6px',textAlign: 'left',fontSize:'24px'}"
  >
    <div id="tips"
      :style="{lineHeight:'16px',textAlign: 'left'}"
    >
      你可能需要这一栏来提前搜索要查询的对象<br><br>
    </div>
    <n-card>
      <div class="search-container">
      <n-select
        v-model:value="objectName"
        :options="objectOptions"
        :disabled="objectNameInactive"
        filterable
        placeholder="查询对象"
      ></n-select>
      <n-select
        v-model:value="attributeName"
        filterable
        :options="attributeOptions"
        placeholder="查询条件"
      ></n-select>
      <n-input
          v-model:value="attributeValue"
          :disabled="attributeInactive"
         type="text"
         placeholder="查询值"
      />
      <n-button @click="preSearch"
        :disabled="props.searchInactive"
      >
        模糊搜索</n-button>

      </div>
    </n-card>
    <n-card>
      <div id="preSearchTable">
        <n-data-table
          :columns="barColumns"
          :data="barData"
          :pagination="false"
          :bordered="false"
        ></n-data-table>
      </div>
    </n-card>
  </n-card>
</template>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  gap: 10px; /* 控制组件之间的间距 */
}

.search-container > * {
  width:140px;
}


</style>