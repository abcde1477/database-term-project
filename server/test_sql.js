import dotenv from 'dotenv'
dotenv.config({ path: '.env' });
import mySql from './modules/sql.mjs'

const DB_config = {
    host: process.env.DB_HOST,   // 数据库主机
    user: process.env.DB_RW_UN,        // 数据库用户
    password: process.env.DB_RW_PW,// 数据库密码
    database: process.env.DB_NAME // 数据库名称
}

let sql = mySql()

try{
    //let [r,f] = await sql.statistic_student_credit('S2024009');
    let [r,f] = await sql.statistic_student_credit('S2024011')
    console.log(r)
    console.log(f)
    //let [a,b] = [undefined,undefined]定义一个错误;
    let [a,b] = await sql.getObject('lecturer','all',)
    console.log(a)
    console.log(b)
}catch (err){
    console.log(err)
}finally {
    process.exit(0); // 确保进程退出
}
