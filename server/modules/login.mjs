import express from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({ path: '.env' });

//注意，node运行的目录是哪里
//node server/app.js和cd server && node app.js的结果是不一样的

let accounts
try{
    accounts =JSON.parse(process.env.LOGIN_ACCOUNT)
    Object.freeze(accounts); // 冻结 message 防止修改
}catch (parse_err){
    console.log('环境变量解析错误:LOGIN_ACCOUNT解析错误')
    console.log('详细错误信息:'+parse_err)
    process.exit()
}
const secretKey= process.env.SECRET_KEY

let login = express()

login.get('/',(req,res)=>{
    //405 :method not allowed
    res.status(405).send('Wrong Method').end()
})
login.post('/',express.json(),(req,res,next)=>{
    console.log(req.body)
    let hit = false
    for (const account of accounts) {
        if(req.body.u === account[0] && req.body.p === account[1]){
            hit = true
            break
        }
    }
    if(hit){
        const token = jwt.sign({username:req.body.u},secretKey,{expiresIn:'1h'})

        res.status(200)
        res.setHeader("Content-Type","application/json")
        res.send({token})
        res.end()
    }else{
        res.status(401)
        res.setHeader("Content-Type","application/json")
        res.send({})
        res.end()
    }
})
export default login