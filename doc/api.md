jQuery接口

返回的需要什么数据请前端指出吧...

1.用户登陆
$.ajax({
	url :  "/user/login",
	type : "POST",
	data : 	{email:.. ,password:.. },
	dataType : "json",
	success : function(data){
		data=[ "result_code":... ,  user_id":... ]	 ;//result_code表示操作是否成功
	}
})

2. 发送邮件(到指定邮箱获取验证码)
$.ajax({
	url :  "/user/sendEmail",
	type : "POST",
	data : 	{email},
	async: false,
	dataType : "json",
	success : function(data){
		// data=["result_code":... ,  "code":... ]
	}
})

3. 用户提交注册
$.ajax({
	url :  "/user/register",
	type : "POST",
	data : 	{email:.. ,password:.. ,code:.. } ,
	dataType : "json",
	success : function(data){
		data=[ "result_code":... , "user_id":... ]
	}
})


4.用户登出
$.ajax({
	url :  "/user/logout",
	type : "GET",
	data : 	''
	
})

5.用户建表 （通过表格填写列属性）
url: "/data/createTableByColumn"
data: {
	userid : ,
	tableName : ,
	columnList  : [] , //List<ColumnVO>
	description : ...
}

vo.ColumnVO: String columnName ; ColumnType columnType ; String description ;

6.用户建表 （通过MySql脚本）
url: "/data/createTableByScript"
data: {
	userid : ,
	tableName : ,
	sqlScript : ...
}


7.用户导入数据到自建表中
url: "/data/importData"
data: {
	userid : ,
	tableName : ,
	file : ..//暂时没想好是什么格式，后端直接用的String[] lines解析每一行的数据
}

8.查看用户自建表列表
url: "/data/allTable"
data: {
	userid : ..
}

9.查看某张表的属性（有哪些列）
url: "/data/tableDetail"
data: {
	tableName : ..
}

10.创建实验
url: "/experiment/create"
data: {
	userid : ,
	experimentName : ,
	description : ..
}

11.查看实验
url: "/experiment/allExperiment"
data: {
	userid : ..
}


