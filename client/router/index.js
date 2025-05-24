import { createRouter, createWebHistory } from 'vue-router';
import login from '../components/login.vue';
import admin from '../components/admin/admin.vue';

import input from '../components/admin/MainContent/input.vue';
import query from '../components/admin/MainContent/query.vue';
import statistic from '../components/admin/MainContent/statistic.vue';

import token from '../components/admin/abort/token.vue';
import division from '../components/admin/abort/division.vue'
import rest from '../components/admin/abort/REST.vue'
import env from '../components/admin/abort/env.vue'

//信息查询
    //学生成绩查询
    //教师任课查询(任课查询)
    //班级课程开设查询
//信息输入
    //统一输入框(使用选项式)
//信息统计
    //学生成绩统计/排名
    //课程平均成绩统计
    //学生所学课程及学分统计
const routes = [
    {
        path: '/',
        redirect: '/login' // 添加重定向路由
    },
    {

        path: '/admin',
        component: admin,
        children:[
            {
                path:'',
                redirect: '/admin/query'
            },
            {
                path:'query',
                redirect: '/admin/query/classCourse' //添加重定向路由
            },
            {
                path:'query/:tabValue',
                component:query,
                props:true
            },
            {
                path:'statistic',
                redirect: '/admin/statistic/classCourse' // 添加重定向路由
            },
            {
                path:'statistic/:tabValue',
                component:statistic,
                props:true
            },
            {
                path:'input',
                component: input
            },
            {
                path:'/admin/abort/frontend-backend-division',
                component: division
            },
            {
                path:'/admin/abort/REST-ful-API',
                component: rest
            },

            {
                path:'/admin/abort/token',
                component: token
            },
            {
                path:'/admin/abort/env-var',
                component: env
            },
        ]
    },
    {
        path: '/login',
        component: login
    }
];
const router = createRouter({
    history: createWebHistory('/'),
    routes:routes
});
export {router};