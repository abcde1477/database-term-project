import express from 'express'
import jwt from 'jsonwebtoken'
import mySql from './sql.mjs'

const DB_config = {
    host: process.env.DB_HOST,   // 数据库主机
    user: process.env.DB_RW_UN,        // 数据库用户
    password: process.env.DB_RW_PW,// 数据库密码
    database: process.env.DB_NAME // 数据库名称
}

let sql = mySql(DB_config)
const verifyToken = function(req,res,next) {
    //token从请求头Authorization读取。
    const _status401 =function(message){
        console.log({ message: message })
        res.status(401).json({ message: message });
    }

    let auth = req.headers['authorization'];
    let token

    //切割token
    try{
        token = auth.split(' ')[1]
    }catch(err){
        return _status401('token解析错误')
    }

    if(!token|| token ==='null'){
        return _status401('未提供token')
    }
    //验证token
    try {
        let payload = jwt.verify(token,process.env.SECRET_KEY)
        req.username = payload['username'];
        next();
    } catch (err) {
        return _status401('无效的token')
    }
}

let admin = express()
admin.use(verifyToken)
admin.get('/test-token',(req,res)=>{res.json({message:'token有效,可以访问'})})

admin.get('/search/:objectName/attribute_name/:attributeName',async (req,res)=>{
    try{
        let [r,f] = await sql.getObject(
            req.params['objectName'],
            req.params['attributeName'],
            req.query['value']
            )
        console.log(r)
        console.log(f)
        if(r === undefined){
            res.status(404)
        }else{
            res.status(200)
            res.send(r)
        }
        res.end()
    }catch (err){
        console.log(err)
    }
})
admin.get('/query/:message/id/:id',async (req,res)=>{
        if(req.params['id'] === undefined){
            console.log('id'+req.params['id'])
            //id解析错误
            res.status(400)
            res.end()
        }else{
            let r,f
            try {
                if (req.params['message'] === 'class_course') {
                    [r, f] = await sql.query_class_course(req.params['id'])
                } else if (req.params['message'] === 'lecturer_course') {
                    [r, f] = await sql.query_lecturer_course(req.params['id'])
                } else if (req.params['message'] === 'student_grade') {
                    [r, f] = await sql.query_student_grade(req.params['id'])
                } else {
                    console.log('message'+req.params['message'])
                    //message解析错误
                    res.status(400)
                    res.end()
                }
                //查询后结果
                res.status(200)
                res.send(r)
                res.end()
            }catch (err){
                console.log(err)
            }
        }
})
admin.get('/statistic/all_course_grade',async (req,res)=>{
        let r,f
        try {
            [r, f] = await sql.statistic_all_course_grade_passRate()
            res.status(200)
            res.send(r)
            res.end()
        }catch(err){
            console.log(err)
        }
    })
admin.get('/statistic/grade_in_term/term/:term',async (req,res)=>{
    if(req.params['term'] === undefined) {
        //term解析错误
        res.status(400)
        res.end()
    }
    try {
        let [r, f] = await sql.statistic_student_in_term(req.params['term'])
        res.status(200)
        res.send(r)
        res.end()
    }catch(err) {
        console.log(err)
    }
})
admin.get('/statistic/student_course/student_id/:id',async (req,res)=>{
    if(req.params['id'] === undefined) {
        //term解析错误
        res.status(400)
        res.end()
    }
    try {
        let [r, f] = await sql.statistic_student_credit(req.params['id'])
        res.status(200)
        res.send(r)
        res.end()
    }catch(err) {
        console.log(err)
    }
})
admin.get('/statistic/student_grade_ranking',async (req,res)=>{
    let r,f
    try {
        [r, f] = await sql.statistic_all_student_grade_ranking()
        res.status(200)
        res.send(r)
        res.end()
    }catch(err){
        console.log(err)
    }
})
admin.post('/insert/:object',async (req,res)=>{

})
export default admin
