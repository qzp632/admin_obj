//订单列表
function orders_list(args){
	var orders=new common();
	data = orders.request('orders/list',args);
	this.countPage=orders.pagers();
	// console.log(this.countPage);
	$("#zy").html("共"+this.countPage+"页");
    $("#zy").val(this.countPage);
	var str="";
	var lan = new lang();
	var index=data.data.data.length;
	var datas=data.data.data;
$(".auth").html(getCookie("name"));
	if(data.status==0){
		str+="<tbody style='width:100%' class='tid'>";
		for(var i=0;i<index;i++){
			str+="<tr>";
				str+="<td>"+datas[i].id+"</td>";
				var sum=datas[i].create_time;
				var newDate = new Date();
				newDate.setTime(sum * 1000);
				str+="<td>"+newDate.toLocaleString()+"</td>";
				str+="<td>"+datas[i].member_id+"</td>";
				var pay_status ='未付款';
				if(datas[i].pay_time > 0 )
				{
					pay_status ='已支付';
				}
				str+="<td>"+pay_status+"</td>";
				str+="<td class='order_Name'>"+datas[i].name+"</td>";
				str+="<td>"+datas[i].phone_number+"</td>";	
				str+="<td>"+datas[i].address+"</td>";	
				str+="<td>"+ lan.order_status(datas[i].status)+"</td>";	
				str+="<td class='btn' style='cursor:pointer' onclick='orderdetail("+datas[i].id+")'><span>查看</span></td>";		
			str+="</tr>";
		}	
			str+="<tbody>";	
			$("#content").append(str);
	}

}

// $(document).ready(function(){
// 	$(".btn").each(function(){
// 		$(this).click(function(){
// 			var id=$(this).attr("value");
// 			// console.log(id);
// 			window.open("order_detail.html?orderId=" + id);
// 		});
// 	});
// })
//获取当前点击的id跳转到其他页面
function orderdetail(id){
	console.log(id);
	window.open("order_detail.html?orderId=" + id);
}