//工厂管理
function factorys(){
	var str="";
	var orders=new common();
	var datalist=orders.request("factory/list",{});
	// console.log(datalist);
	var factory_list=datalist.data;
	$(".auth").html(getCookie("name"));
	//console.log(factory_list[7].name);
	for(var i=0;i<factory_list.length;i++){
		str="";
		str+="<tr>";
		str+="<td>"+factory_list[i].name+"</td>";
		str+="<td>"+factory_list[i].phone+"</td>";
		str+="<td>"+factory_list[i].address+"</td>";

		//将日期转成时间戳
		var timestamp3 = factory_list[i].create_time;
		var date = new Date(timestamp3*1000);
		//date.setTime(timestamp3 * 1000);
		var year=date.getFullYear();
		var m=date.getUTCMonth()+1;
		if(m<10){
			m="0"+m;
		}
		var d=date.getDate();
		if(d<10){
			d="0"+d;
		}
		var str3=year+""+m+""+d;
		// console.log(str3);

		str+="<td><img src='http://www.shliangyi.net/qrimg/"+str3+"/"+factory_list[i].qr_code+".jpg'";
		str+="/></td>";
		str+="</tr>";
		$(".partner").append(str);				
	}
}

$(document).ready(function(){
	factorys();
	var orders=new common();
	//添加新的工厂
	$("#addbtn").click(function(){
		var str="";
		var factory_name=$(".factory_name").val();
		var factory_phone=$(".factory_phone").val();
		var factory_address=$(".factory_address").val();
		var data=orders.request("factory/add",{name:factory_name,phone:factory_phone,address:factory_address});
		// console.log(data);
		if(data.status==0){
			alert("添加成功!");
			// var cok=getCookie("name");
			// setCookie("name",cok,new Date()-1000);
			//setCookie("adminid","",-1);
			location .href="factory_management.html";
		}
	});
});
// function orderdetail(id){
// 	window.open("staff_management.html?orderId=" + id);
// }