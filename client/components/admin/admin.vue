<script setup>
import {h,ref} from "vue";
import {NMenu,NLayout,NLayoutSider} from 'naive-ui'
import { NIcon } from "naive-ui";
import {backendURL} from '../../ENV.mjs'
import {
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
  Search as SearchIcon,
  Calculator as CalculatorIcon,
  DocumentText as DocumentTextIcon,
  People as PeopleIcon,
  AlbumsSharp as AlbumsSharpIcon,
  Man as ManIcon,
  School as SchoolIcon,
  StatsChartSharp as StatsChartSharpIcon,
  SparklesSharp as SparklesSharpIcon
} from "@vicons/ionicons5";

import {router} from '../../router/index.js'


if(!localStorage.getItem('token')){
  alert('没有登陆,先登陆')
  router.push('/login')
}
setInterval(()=>{
    let authorization = 'Bearer '+ localStorage.getItem('token')
    fetch(backendURL+'admin/test-token',{
      method:'GET',
      headers:{
        'authorization': authorization
      }
    }).then((res)=>{
      return res.json()
    }).then((data)=>{
      if(data?.message === undefined)
        alert('服务器连接异常')
      else if (data?.message !== 'token有效,可以访问') {
        alert('登陆失效,重新登入')
        router.push('/login')
      }
    })
},100_000)
const collapsed = ref(false)//没有使用
const menuValue= ref(null)
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const handleMenu = (key,item)=>{
  menuValue.value = key
  router.push(key)
}
const menuOptions = [
  {
    type: "group",
    label:"功能栏",
    key:"function",
    children:[
      {
        label:"查询",
        key:"/query",
        icon: renderIcon(SearchIcon),
        children:[
          {
            label:'班级课程查询',
            icon:renderIcon(PeopleIcon),
            key:'/admin/query/classCourse'
          },
          {
            label:'学生成绩查询',
            icon:renderIcon(ManIcon),
            key:'/admin/query/studentGrade'
          },
          {
            label:'教师任课查询',
            icon:renderIcon(SchoolIcon),

            key:'/admin/query/professorCourseSchedule'
          },
        ]
      },
      {
        label:"统计",
        key:"statistic",
        icon: renderIcon(CalculatorIcon),
        children:[
          {
            label:'所有课程成绩统计',
            icon:renderIcon(AlbumsSharpIcon),
            key:'/admin/statistic/allCourseGrade'
          },
          {
            label:'按学年学生成绩统计',
            icon:renderIcon(PeopleIcon),
            key:'/admin/statistic/gradeInTerm'
          },
          {
            label:'学生所学课程及学分统计',
            icon:renderIcon(ManIcon),
            key:'/admin/statistic/studentCourse'
          },
          {
            label:'全体学生成绩及排名统计',
            icon:renderIcon(StatsChartSharpIcon),
            key:'/admin/statistic/studentGradeRanking'
          },
        ]
      },
      {
        label:"数据输入",
        key:"/admin/input",
        icon: renderIcon(DocumentTextIcon)
      }
    ]
  },
  {
    type: "group",
    label: "关于",
    key: "abort",
    children: [
      {
        label: "项目特点",
        key: "special",
        icon: renderIcon(SparklesSharpIcon),
        children: [
          {
            label: "前后端分离设计",
            key: "/admin/abort/frontend-backend-division",
            icon: renderIcon(SparklesSharpIcon)
          },
          {
            label: "使用REST-ful思想设计API",
            key: "/admin/abort/REST-ful-API",
            icon: renderIcon(SparklesSharpIcon)
          },
          {
            label: "使用token进行身份验证",
            key: "/admin/abort/token",
            icon: renderIcon(SparklesSharpIcon)
          },
          {
            label: "使用环境变量存储配置",
            key: "/admin/abort/env-var",
            icon: renderIcon(SparklesSharpIcon)
          }
        ]
      }]
  }
]

</script>
<template>
  <div class="app-container">
    <n-layout has-sider>
      <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="290"
          :collapsed="collapsed"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
      >
        <n-menu
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
            :on-update:value="handleMenu"
        />
      </n-layout-sider>
      <n-layout>
        <router-view/>
      </n-layout>
    </n-layout>
    <div class="content-container">
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  height: 100vh; /* 让容器占满视口高度 */
}

.navigation {
  flex: 0 0 200px; /* 固定导航栏宽度，可以根据需要调整 */
}

.content-container {
  flex: 1;
  overflow-y: auto; /* 如果内容超出容器高度，可以滚动 */
}
</style>
