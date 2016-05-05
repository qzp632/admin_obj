//员工列表显示
function staff(){
	var option="";
	var str="";
	var orders=new common();
	var lan=new lang();
	//获取cookie中的值
// var lo=new logo();
// console.log(lo.pwd);
	var pho=getCookie("pho");
	var pwd=getCookie("pwd");
	//var adminid=getCookie("adminid");
	
	//将cookie中的值转成对象
	//var adminobjs = JSON.parse(adminid)
	//console.log(adminobjs)
	var data_Json=con.request("user/login",{phone:pho,password:pwd});
	//console.log(data_Json);
	//var adminobj=data_Json.data;


	// console.log(adminobj);
	$(".auth").html(getCookie("name"));

	//console.log(adminobj)
	//判断是否是管理员，如果是管理员的话就执行赋值
	var factory_user=data_Json.data.factorys;

	//console.log(factory_user)
	if(data_Json.data.admin=="1"){	
		for(var i=0;i<factory_user.length;i++){
			option="";
			option+="<option value='"+factory_user[i].id+"'>"+factory_user[i].name+"</option>";
			$(".factorys").append(option);	
		}

	}
	else{
	// 	// var factory_user=adminobj.factorys;
		//$(".factorys").hide();
		//var factoryboos=orders.request("factory/getFactoryOpenIds",{id:factory_user.id});
		var factoryboos=orders.request("factoryUser/list",{id:factory_user.id});
		var userlist=factoryboos.data;
		for(var i=0;i<userlist.length;i++){
			str="";
			str+="<tr>";
			str+="<td>"+userlist[i].name+"</td>";
			str+="<td>"+userlist[i].phone+"</td>";
			str+="<td>"+lan.procedures(userlist[i].procedure)+"</td>";
			str+="<td>"+userlist[i].open_id+"</td>";

			var args={};
			args['id']=userlist[i].id;
			args['name']=userlist[i].name;
			args['phone']=userlist[i].phone;
			args['procedure']=userlist[i].procedure;
			args['open_id']=userlist[i].open_id;
			args['factory_id']=userlist[i].factory_id;
			var test=JSON.stringify(args);

			str+="<td class='btns' onclick='orderdetai("+test+")' style='cursor:pointer'>修改</td>";
			str+="</tr>";
			$(".partner").append(str);
		}
	}	
 }




	//执行厂长修改操作
	function orderdetai(args){
		// console.log(args);
		$("#bg").show();
		$("#popbox").show();
		var orders=new common();
		var factoryId=orders.request("factory/getFactoryOpenIds",{id:args.factory_id});
		// console.log(factoryId);

		//给员工信息赋值
		$(".user_Name").val(args.name);
		$(".user_Phone").val(args.phone);
		$(".option_value").attr("value",args.procedure);

		//获取open_id列表
		var str="";
		var factory_users=factoryId.data.open_ids;

		for(var i=0;i<factory_users.length;i++){
			str="<option value='"+factory_users[i]+"'>"+factory_users[i]+"</option>";
			$(".open_Id").append(str);
		}

		//选择open_id
		$(".open_Id").change(function(){
			open_Id=$(this).val();
		});

		//定义职位列表
		$(".option_value").change(function(){
			option_value=$(this).val();
			// console.log(option_value);
		});

		//执行更新操作
		$(".hidden_sub").click(function(){
			data = JSON.parse(getCookie("adminid"));
			var user_Name=$(".user_Name").val();
			var user_Phone=$(".user_Phone").val();
			var update_User=orders.request("factoryUser/update",{id:args.id,factory_id:args.factory_id,name:user_Name,phone:user_Phone,procedure:option_value,open_id:open_Id});
			// factory_show();
			if(datas.admin !="1"){
				location.href="staff_management.html";
			}else{
				factory_show();
			}
			// console.log(update_User);
			$("#bg").hide();
			$("#popbox").hide();
		});	
	}


	//执行修改操作
	function orderdetail(args){
		// console.log(args.id);
		$("#bg").show();
		$("#popbox").show();
		var orders=new common();
		var factoryId=orders.request("factory/getFactoryOpenIds",{id:args.factory_id});
		// console.log(factoryId);
		// console.log
		// //给员工信息赋值
		$(".user_Name").val(args.name);
		$(".user_Phone").val(args.phone);
		$(".option_value").attr("value",args.procedure);

		// //获取open_id列表
		var str="";
		var factory_users=factoryId.data.open_ids;
		// console.log(factory_users.length)

		for(var i=0;i<factory_users.length;i++){
			str="";
			str="<option value='"+factory_users[i]+"'>"+factory_users[i]+"</option>";
			$(".open_Id").append(str);
		}


		//选择open_id
		$(".open_Id").change(function(){
			open_Id=$(this).val();
		});

		//定义职位列表
		$(".option_value").change(function(){
			option_value=$(this).val();
			// console.log(option_value);
		});

		//执行更新操作
		$(".hidden_sub").click(function(){
			datas = JSON.parse(getCookie("adminid"));
			var user_Name=$(".user_Name").val();
			var user_Phone=$(".user_Phone").val();
			var update_User=orders.request("factoryUser/update",{id:args.id,factory_id:args.factory_id,name:user_Name,phone:user_Phone,procedure:option_value,open_id:open_Id});
			location.href="staff_management.html";
			// setTimeout(function(){
			// 	location.reload();
			// },100);
			// console.log($("#"+args.name).html());
			
			$("#bg").hide();
			$("#popbox").hide();

		});	
	}



$(document).ready(function(){


	staff();//文档加载时执行页面展示

	var staff_value;
	var partner;
	var factory_Id;
	var str="";
	// var open_Id;
	var orders=new common();

	var lan=new lang();
	//选择职位
	$(".staff_value").change(function(){
		staff_value=$(this).val();
	});


	$(".factorys").change(function(){
		factory_Id=$(this).val();
		// console.log(factory_Id)
		factory_show();
	});



	function factory_show(){
		var factory_User=orders.request("factoryUser/list",{id:factory_Id});
			for(var i=0;i<factory_User.data.length;i++){
				str="";
				str+="<tr id='"+factory_User.data[i].name+"'>";
				str+="<td>"+factory_User.data[i].name+"</td>";
				str+="<td>"+factory_User.data[i].phone+"</td>";
				str+="<td>"+lan.procedures(factory_User.data[i].procedure)+"</td>";
				str+="<td>"+factory_User.data[i].open_id+"</td>";
				var args={};
				args['id']=factory_User.data[i].id;
				args['name']=factory_User.data[i].name;
				args['phone']=factory_User.data[i].phone;
				args['procedure']=factory_User.data[i].procedure;
				args['open_id']=factory_User.data[i].open_id;
				args['factory_id']=factory_User.data[i].factory_id;
				var test=JSON.stringify(args);

				str+="<td class='btns' onclick='orderdetail("+test+")' style='cursor:pointer'>修改</td>";
				str+="</tr>";
				$(".partner").append(str);
			}
		}


	$("#addbtn").click(function(){

		var datas = JSON.parse(getCookie("adminid"));
		// console.log(datas.factorys.id)
		$(".partner tr:gt(0)").html("");
		var staff_name=$(".staff_name").val();
		var staff_phone=$(".staff_phone").val();

		if(datas.admin !="1"){
			var statu=orders.request("factoryUser/add",{id:datas.factorys.id,name:staff_name,phone:staff_phone,procedure:staff_value});
			if(statu.status==0){
				setCookie("adminid","",-1);
				alert("添加成功!");
				location.href="staff_management.html";
			}else if(statu.message=="没有工厂参数:id"){
			alert("请选择工厂!");
		}
			
		}else{
			var sta=orders.request("factoryUser/add",{id:factory_Id,name:staff_name,phone:staff_phone,procedure:staff_value});
			if(sta.status==0){
				alert("添加成功!");
				factory_show();
			}else if(sta.message=="没有工厂参数:id"){
			alert("请选择工厂!");
		}
				
		}
	});



	//获取open_id列表
	// var str="";
	// var datauser=orders.request("factory/getFactoryOpenIds",{});
	// console.log(datauser);
	// var factory_user=datauser.data.open_ids;
	// for(var i=0;i<factory_user.length;i++){
	// 	str="<option value='"+factory_user[i]+"'>"+factory_user[i]+"</option>";
	// 	$(".open_Id").append(str);
	// }


	//选择open_id
	// $(".open_Id").change(function(){
	// 	open_Id=$(this).val();
	// });

	//添加员工信息列表


	//选择员工职位
	// var option_value;
	// $(".open_Id").change(function(){
	// 	option_value=$(this).val();
	// });

	//更新员工信息
	// $(".hidden_sub").click(function(){
	// 	var user_Name=$(".user_Name").val();
	// 	var user_Phone=$(".user_Phone").val();
	// 	var user_Procedure=$(".user_Procedure").val();	
	// 	var data=orders.request("factoryUser/updateOne",{name:user_Name,phone:user_Phone,procedure:option_value});
	// 	console.log(data);
	// });
});
