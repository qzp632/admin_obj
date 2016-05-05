//员工考核
function assessment(){
	var con=new common();
	var str="";
	var user_assessment=getCookie("adminid");//从cookie获取原有的数据
	var Staff_assessmen = JSON.parse(user_assessment)//将数据的字符串格式转车对象模式
	$(".auth").html(getCookie("name"));
	var Staff_user=Staff_assessmen.factorys;
	// console.log(Staff_user);
	//判断是不是管理员来创建新的下拉列表
	if(Staff_assessmen.admin==1){	//是管理员的就创建新的下拉列表	
		for(var i=0;i<Staff_user.length;i++){
			option="";
			option+="<option value='"+Staff_user[i].id+"'>"+Staff_user[i].name+"</option>";
			$(".factorys").append(option);	
		}
	}else{//佛则将下拉列表隐藏
		$(".factorys").hide();
		var Staff=con.request("production/list",{factory_id:Staff_user.id});
		for(var i in Staff.data){
			str="";
			str+="<tr>";
			str+="<td>"+Staff.data[i].factory_name+"</td>";
			str+="<td>"+Staff.data[i].name+"</td>";
			str+="<td>"+Staff.data[i].count+"</td>";
			str+="</tr>";
			$(".staff_assessment").append(str);
		}
	}
}

$(document).ready(function(){
	var str="";
	var con=new common();
	assessment();//文档加载后显示员工考核列表
	var factoryid;
	$(".factorys").change(function(){
		$(".staff_assessment tr:gt(0)").html("")
		 factoryid=$(this).val();
		// console.log(factoryid);
		var Staffkh=con.request("production/list",{factory_id:factoryid});
		// console.log(Staffkh)
		for(var i in Staffkh.data){
			str="";
			str+="<tr>";
			str+="<td>"+Staffkh.data[i].factory_name+"</td>";
			str+="<td>"+Staffkh.data[i].name+"</td>";
			str+="<td>"+Staffkh.data[i].count+"</td>";
			str+="</tr>";
			$(".staff_assessment").append(str);
		}
	});
});