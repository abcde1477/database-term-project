import mysql from 'mysql2/promise'
import fs from "fs"



const DB_config = {
    host: process.env.DB_HOST,   // 数据库主机
    user: process.env.DB_RW_UN,        // 数据库用户
    password: process.env.DB_RW_PW,// 数据库密码
    database: process.env.DB_NAME // 数据库名称
}

class MySql{
    constructor(DB_config) {
        this.initPromise = this.init(DB_config);
    }
    async init(DB_config) {
        try {
            this.connection = await mysql.createConnection(DB_config);

        }catch(err){
            console.error('数据库连接失败: ' + err.stack);
            return;
        }
        try {
            const createTableSQL = fs.readFileSync("server/sql/createTable.sql", 'utf8');
        }catch(err){
            console.error('数据库创表失败: ' + err.stack);
            return;
        }
        await CreateTable()
        process.on('exit',()=>this.connection.end())
    }

    async CreateTable(sqlFileContent){
        try {
            await this.initPromise
            const [rows, fields] = await this.connection.query(sqlFileContent)
            return [rows, fields];
        }catch (err){
            console.log(err)
        }
    }
    async query_student_grade(student_no) {
        await this.initPromise;
        try {
            const [rows, fields] = await  this.connection.execute(`
            SELECT
                co.c_name AS '课程名',
                co.c_offer_term AS '学期',
                r.r_grade AS '成绩'
            FROM Report r
            JOIN Course co ON r.course_no = co.course_no
            WHERE r.student_no = ?`, [student_no]);
            return [rows, fields];
        }catch (err){
            console.log(err)
        }
    }

    async query_lecturer_course(lecturer_no) {
        await this.initPromise;
        try {
            const [rows, fields] = await  this.connection.execute(`
            SELECT
                co.c_name '课程名',
                co.c_offer_term '学期'
             FROM Report r
             JOIN Course co ON r.course_no=co.course_no
             WHERE r.lecturer_no= ?`, [lecturer_no])

            return [rows, fields];
        }catch (err){
            console.log(err)
        }
    }
    async query_class_course(class_no){
        await this.initPromise;
        try {
            const [rows, fields] = await  this.connection.execute(`SELECT 
                co.c_name '课程名',
                co.c_offer_term '学期',
                co.c_credits '学分',
                co.c_credit_hours '学时'
                FROM Course co
                WHERE  co.class_no=?`, [class_no])

            return [rows, fields];
        }catch (err){
            console.log(err)
        }
    }

    async statistic_student_in_term(term){
        await this.initPromise;
        try {
            const [rows, fields] = await this.connection.execute(`
            SELECT r.student_no '学号',
            s.s_name '姓名',
            co.c_name '课程名',
            co.c_offer_term '学期',
            r.lecturer_no '教师编号',
            l.l_name '教师名称',
            r.r_grade '成绩'
            FROM Report r
            JOIN Course co ON r.course_no = co.course_no
            JOIN Student s ON r.student_no = s.student_no
            JOIN Lecturer l ON r.lecturer_no = l.lecturer_no
            WHERE co.c_offer_term=?`,[term])
            return [rows, fields]
        }catch(err){
            console.log(err)
        }
    }
    async statistic_student_credit(student_no){
        await this.initPromise;
        try {
            const [rows, fields] = await  this.connection.execute(`
            SELECT
                co.c_name '已修课程',
                co.c_offer_term '学期',
                co.c_credits '学分'
                FROM Report r
                JOIN Course co ON r.course_no = co.course_no
                WHERE r.student_no = ?
                    UNION ALL
                SELECT
                '全体课程' AS '已修课程',
                    '/' AS '学期',
                    SUM(co.c_credits) AS '学分'
                FROM Report r
                JOIN Course co ON r.course_no = co.course_no
                WHERE r.student_no = ?
                ORDER BY '学期'`,
            [student_no,student_no])

            return [rows, fields];
        }catch (err){
            console.log(err)
        }
    }
    async statistic_all_student_grade_ranking(){
        await this.initPromise;
        try {
            const [rows, fields] = await this.connection.query(`
            SELECT * FROM Weighted_Grades_View
            `)
            return [rows, fields]
        }catch(err){
            console.log(err)
        }
    }
    async statistic_all_course_grade_passRate(){
        await this.initPromise;
        try {
            const [rows, fields] = await this.connection.query(`
            SELECT * FROM all_course_avg_pass
            `)
            return [rows, fields]
        }catch(err){
            console.log(err)
        }
    }

    async _listStudent(attributeName,attributeValue){
        await this.initPromise;
        let attributeSQL
        switch (attributeName){
            case 'id':
                attributeSQL = 'student_no'
                break
            case 'name':
                attributeSQL = 's_name'
                break
            case 'all':
                attributeSQL = null
                break
        }
        let whereSQL = (attributeSQL === null) ? '' : `WHERE s.${attributeSQL} LIKE ?`;
        let queryParams = (attributeSQL === null) ? [] : [`%${attributeValue}%`];
        try{
            const [rows, fields] = await  this.connection.execute(`
                    SELECT
                        student_no '学生编号',
                        class_no '班级编号',
                        s_name '名称'
                    FROM Student s
                    ${whereSQL}`, queryParams);
            return [rows, fields];
        }catch(err){
            console.log(err)
        }
    }
    async _listLecturer(attributeName,attributeValue){
        await this.initPromise;
        let attributeSQL
        switch (attributeName){
            case 'id':
                attributeSQL = 'lecturer_no'
                break
            case 'name':
                attributeSQL = 'l_name'
                break
            case 'all':
                attributeSQL = null
                break
        }
        let whereSQL = (attributeSQL === null) ? '' : `WHERE l.${attributeSQL} LIKE ?`;
        let queryParams = (attributeSQL === null) ? [] : [`%${attributeValue}%`];
        console.log(`
                    SELECT
                        lecturer_no '教授编号',
                        l_name '教授名称'
                    FROM Lecturer l
                    ${whereSQL} ${queryParams}`)
        try{
            const [rows, fields] = await  this.connection.execute(`
                    SELECT
                        lecturer_no '教授编号',
                        l_name '教授名称'
                    FROM Lecturer l
                    ${whereSQL}`, queryParams);
            return [rows, fields];
        }catch(err){
            console.log(err)
        }
    }
    async _listClass(attributeName,attributeValue){
        await this.initPromise;
        let attributeSQL
        switch (attributeName){
            case 'id':
                attributeSQL = 'class_no'
                break
            case 'name':
                attributeSQL = 'c_name'
                break
            case 'all':
                attributeSQL = null
                break
        }
        let whereSQL = (attributeSQL === null) ? '' : `WHERE c.${attributeSQL} LIKE ?`;
        let queryParams = (attributeSQL === null) ? [] : [`%${attributeValue}%`];

        try{
            const [rows, fields] = await  this.connection.execute(`
                    SELECT
                        class_no '班级编号',
                        c_name '班级名称'
                    FROM Class c
                    ${whereSQL}`, queryParams);
            return [rows, fields];
        }catch(err){
            console.log(err)
        }
    }

    async getObject(objectName,attributeName,attributeValue){
        if(attributeValue === null ||attributeValue === undefined)
            attributeValue = ''
        if(
            attributeName !== 'id' &&
            attributeName !== 'name' &&
            attributeName !== 'all')
        {
            return [undefined,undefined]
            //一个是[undefined,undefined] 即参数不合规定
            //一个是[null,field] 无
        }
        if(objectName === 'student')
            return await this._listStudent(attributeName,attributeValue)
        else if(objectName === 'lecturer')
            return await this._listLecturer(attributeName,attributeValue)
        else if (objectName === 'class')
            return await this._listClass(attributeName,attributeValue)
        else
            return [undefined,undefined]
    }
}


const mySql =function(config = defaultConfig){
    return new MySql(config)
}

export default mySql;
