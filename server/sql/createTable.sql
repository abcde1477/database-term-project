create database if not exists Mis_DB;
USE Mis_DB;
#专业
create table if not exists Major(
	major_name char(24) primary key
);
#班级
create table if not exists Class(
	class_no char(6) primary key, 
    c_name char(32)not null,
    major_name char(24)not null,
    constraint FK_major_name Foreign key(major_name) References Major(major_name)
);
CREATE INDEX id_c_name ON Class(c_name);

#学生
create table if not exists Student(
	student_no char(12) primary key,
    class_no char(6) not null,
	s_name char(12) not null,
    s_age int,
    s_sex char(2),
    s_credit int default 0,#不用填，有触发器更新
    s_source char(20), #生源地(省份)
    s_entryYear int, #入学年份
    constraint FK_class_no_From_Student Foreign key(class_no) References Class(class_no)
);
CREATE INDEX idx_s_name ON Student(s_name);

#课程
create table if not exists Course(
	course_no char(12) primary key,
    class_no char(6) not null,
	c_name char(12) not null,
    c_offer_term char(12), # 如'2022/2023(2)','2021/2022(1)'这样以两年加学期的格式
    c_credit_hours int, #学时
    c_credits int, #学分
    c_evaluation_method char(16), #考察方式，如'考试'或者'设计'
    constraint FK_class_no_From_Course Foreign key(class_no) References Class(class_no)
);
CREATE INDEX idx_class_no ON Course(class_no);
CREATE INDEX idx_c_offer_term ON Course(c_offer_term);

#教师
create table if not exists Lecturer(
	lecturer_no char(12) primary key,
    l_name char(32) not null,
    l_age int,
    l_sex char(2),
    l_title char(12) #职称
);
CREATE INDEX idx_l_name ON Lecturer(l_name);


#授课记录
create table if not exists Report(
	student_no char(12) not null,
	lecturer_no char(12) not null,
    course_no char(12) not null,
	r_grade int not null,
	primary key(student_no,lecturer_no,course_no),
    constraint FK_student_no Foreign key(student_no) References Student(student_no),
    constraint FK_lecturer_no Foreign key(lecturer_no) References Lecturer(lecturer_no),
    constraint FK_course_no Foreign key(course_no) References Course(course_no)
);
