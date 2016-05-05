function fabric_list(args){
	var orders=new common();
	data = orders.request('fabric/list',args);
	this.countPage=orders.pagers();

	$("#zy").html("总页:"+this.countPage);
	$("#zy").val(this.countPage);
	$(".auth").html(getCookie("name"));

	var str="";	
	if(data.status==0){
		var index=data.data.data.length;
		var datas=data.data.data;
		str+="<tbody style='width:100%' class='tid'>";
		for(var i=0;i<index;i++){
			str+="<tr>";
				str+="<td>"+datas[i].name+"</td>";
				str+="<td>"+datas[i].code+"</td>";
				str+="<td>"+datas[i].price+"</td>";
				str+="<td>"+datas[i].detail+"</td>";
				var args={};
				args['factory_id']=datas[i].code;
				var test=JSON.stringify(args);
				str+="<td><span onclick='view("+test+")'>查看</span></td>";	
				var pay_status ='下架';
				if(datas[i].status > 0 )
				{
					pay_status ='上架';
				}
				str+="<td>"+pay_status+"</td>";	
				str+="<td><span  onclick='modify("+test+")'>修改</span></td>";	
			str+="</tr>";
		}	
			str+="<tbody>";	
			$("#content").append(str);
	}
}

$(document).ready(function(){
		//修改商品状态
	 modifyStatus ='';
	 modifyStatus +="<select class='modifyStatus'>";
	 modifyStatus +="<option value='0'>下架</option>";
	 modifyStatus +="<option value='1'>上架</option>";
	 modifyStatus +="</select>";
	$('.modifyStatusA').append(modifyStatus);
	
	//修改是否免烫
	modifyEasy_care ='';
	modifyEasy_care +="<select class='modifyEasy_care'>";
	modifyEasy_care +="<option value='0'>否</option>";
	modifyEasy_care +="<option value='1'>是</option>";
	modifyEasy_care +="</select>";
	$('.modifyEasy_careA').append(modifyEasy_care);
	
	//修改厚度
	modifyThickness ="";
	modifyThickness +="<select class='modifyThickness'>";
	modifyThickness +="<option value='0'>薄</option>";
	modifyThickness +="<option value='1'>厚</option>";
	modifyThickness +="<option value='2'>中</option>";
	modifyThickness +="</select>";
	$(".modifyThicknessA").append(modifyThickness);
	
	//修改领形
	
	modifyCollar_type ="";
	modifyCollar_type +="<select class='modifyCollar_type'>";
	modifyCollar_type +="<option value='1'>标准领</option>";
	modifyCollar_type +="<option value='2'>八字领</option>";
	modifyCollar_type +="<option value='3'>一字领</option>";
	modifyCollar_type +="<option value='4'>领尖扣领</option>";
	modifyCollar_type +="<option value='5'>小方领</option>";
	modifyCollar_type +="<option value='6'>圆领</option>";
	modifyCollar_type +="<option value='7'>礼服领</option>";
	modifyCollar_type +="<option value='8'>立领</option>";
	modifyCollar_type +="<option value='9'>暗扣领</option>";
	modifyCollar_type +="</select>";
	$(".modifyCollar_typeA").append(modifyCollar_type);
	
	//修改袖形
	
	modifySleeve_linging ="";
	modifySleeve_linging +="<select class='modifySleeve_linging'>";
	modifySleeve_linging +="<option value='1'>单扣截角</option>";
	modifySleeve_linging +="<option value='2'>单扣圆角</option>";
	modifySleeve_linging +="<option value='3'>单扣直角</option>";
	modifySleeve_linging +="<option value='4'>双扣截角</option>";
	modifySleeve_linging +="<option value='5'>双扣圆角</option>";
	modifySleeve_linging +="<option value='6'>双扣直角</option>";
	modifySleeve_linging +="<option value='7'>法式截角</option>";
	modifySleeve_linging +="<option value='8'>法式圆角</option>";
	modifySleeve_linging +="<option value='9'>法式直角</option>";
	modifySleeve_linging +="</select>";
	$(".modifySleeve_lingingA").append(modifySleeve_linging);
	
	//修改门襟
	placket ="";
	placket +="<select class='modifyPlacket'>";
	placket +="<option value='1'>明门襟</option>";
	placket +="<option value='2'>平门襟</option>";
	placket +="<option value='3'>暗门襟</option>";
	placket +="</select>";
	$(".placketA").append(placket);
	
	//修改系列
	modifyStyle ="";
	modifyStyle +="<select class='modifyStyle'>";
	modifyStyle +="<option value='1'>白色</option>";
	modifyStyle +="<option value='2'>蓝色</option>";
	modifyStyle +="<option value='3'>深色</option>";
	modifyStyle +="<option value='4'>粉色</option>";
	modifyStyle +="<option value='5'>小众</option>";
	modifyStyle +="</select>";
	$(".modifyStyleA").append(modifyStyle);
})

/*查看商品*/
	function view(code_num){
		var lan=new lang();
        document.getElementById("viewbg").style.display="block";
        document.getElementById("viewpopbox").style.display="block" ;	



		var modify_pro=new common();
		var datas=modify_pro.request("fabric/getByCode",{code:code_num.factory_id});
		var data_val=datas.message;
		var name=$(".viewName").val(data_val.name);

		var code=$(".viewCode").val(data_val.code);
		var price=$(".viewPrice").val(data_val.price);
		var recommdnd=$(".viewRecommend").val(data_val.recommend);
		var status=$(".viewStatus").val(lan.product_status(data_val.status));
		var count=$(".viewCount").val(data_val.count);
		var elements=$(".viewElements").val(data_val.elements);
		var easy_care=$(".viewEasy_care").val(lan.easy_care(data_val.easy_care));
		var thickness=$(".viewThickness").val(lan.thickness(data_val.thickness));
		var detail=$(".viewDetail").val(data_val.detail);
		var collar_type=$(".viewCollar_type").val(lan.collar_type(data_val.collar_type));
		var sleeve_linging=$(".viewSleeve_linging").val(lan.sleeve_linging(data_val.sleeve_linging));
		var placket=$(".viewPlacket").val(lan.placket(data_val.placket));
		var style=$(".viewStyle").val(lan.style(data_val.style));

		

		
	}
	function viewclose(){
		document.getElementById("viewbg").style.display="none";
	    document.getElementById("viewpopbox").style.display="none" ;	
	}
		
/*修改商品*/
	function modify(modifyCode){
		console.log(modifyCode);
		var lan=new lang();
		var str="";
		document.getElementById("modifybg").style.display="block";
        document.getElementById("modifypopbox").style.display="block" ;
		var modify_pro=new common();
		var datas=modify_pro.request("fabric/getByCode",{code:modifyCode.factory_id});
		var data_val=datas.message;


/**********************************************************************************************/

			
			// //点击触发事件
			// $(".modify_sub_input").click(function(){
			// 	modifyName=$(".modifyName").val();//面料名称
			// 	modifyCode=$(".modifyCode").val();//面料编号
			// 	modifyPrice=$(".modifyPrice").val();//面料价格
			// 	modifyRecommend=$(".modifyRecommend").val();//推荐场合
			// 	modifyStatus=$(".modifyStatus").val();//商品状态
			// 	modifyCount=$(".modifyCount").val();//支数
			// 	modifyElements=$(".modifyElements").val();//成份
			// 	modifyEasy_care=$(".modifyEasy_care").val();//免烫
			// 	modifyThicknessA=$(".modifyThicknessA").val();//厚度
			// 	modifyCollar_type=$(".modifyCollar_type").val();//领形
			// 	modifySleeve_linging=$(".modifySleeve_linging").val();//袖形
			// 	placket=$(".placket").val();//门襟
			// 	modifyStyle=$(".modifyStyle").val();//系列
			// 	modifyDetail=$(".modifyDetail").val();//商品描述
				
			// });

/************************************修改商品的时候先把数据展示到页面上***********************************************************************************/

			// var id=datas.message.id;
			$(".modifyName").val(data_val.name);//面料名称
			$(".modifyCode").val(data_val.code);//面料编号
			$(".modifyPrice").val(data_val.price);//面料价格
			$(".modifyRecommend").val(data_val.recommend);//推荐场合
			$(".modifyStatus").val(data_val.status);//上下架状态
			$(".modifyCount").val(data_val.count);//支数
			$(".modifyElements").val(data_val.elements);//成分
			$(".modifyEasy_care").val(data_val.easy_care);//是否免烫
			$(".modifyThickness").val(data_val.thickness);//厚度
			$(".modifyDetail").val(data_val.detail);//衣服描述
			$(".modifyCollar_type").val(data_val.collar_type);//领形
			$(".modifySleeve_linging").val(data_val.sleeve_linging);//袖形
			$(".modifyPlacket").val(data_val.placket);//门襟
			$(".modifyStyle").val(data_val.style);//系列
			str+="<input class='inps' style='position:absolute;left:-999999px' value='"+modifyCode.factory_id+"'/>";
			$("#content").append(str);
			//return modifyCode;
			

			
		}
$(document).ready(function(){
		$(".modify_sub_input").click(function(){
			var modify_pro=new common();
			var codes=$(".inps").val();
			var data = modify_pro.request('fabric/getByCode',{status:0,code:codes});
			var id=data.message.id;
			//console.log(id);
			var name=$(".modifyName").val();
			var code=$(".modifyCode").val();
			var price=$(".modifyPrice").val();
			var recommdnd=$(".modifyRecommend").val();
			var status=$(".modifyStatus").val();
			var count=$(".modifyCount").val();
			var elements=$(".modifyElements").val();
			var easy_care=$(".modifyEasy_care").val();
			var thickness=$(".modifyThickness").val();
			var detail=$(".modifyDetail").val();
			var collar_type=$(".modifyCollar_type").val();
			var sleeve_linging=$(".modifySleeve_linging").val();
			var placket=$(".modifyPlacket").val();
			var style=$(".modifyStyle").val();
				var datas=modify_pro.request("fabric/updateDataById",{id:id,name:name,code:code,price:price,recommdnd:recommdnd,status:status,count:count,elements:elements,easy_care:easy_care,thickness:thickness,detail:detail,collar_type:collar_type,sleeve_linging:sleeve_linging,placket:placket,style:style});
				//alert(datas);
			if(datas.status==0){
				alert("修改成功");
				window.location.href="product_list.html";
			}else{
				alert("修改失败");

			}
			});


		});

		
		function modifyclose(){
			document.getElementById("modifybg").style.display="none";
		    document.getElementById("modifypopbox").style.display="none" ;	
		}		







//添加商品
$(document).ready(function(){
			//添加状态
			status ='';
			status +="<select class='status'>";
			status +="<option value='0'>下架</option>";
			status +="<option value='1'>上架</option>";
			status +="</select>";
			$('.addstatus').append(status);
			
			//修改是否免烫
			easy_care ='';
			easy_care +="<select class='easy_care'>";
			easy_care +="<option value='0'>否</option>";
			easy_care +="<option value='1'>是</option>";
			easy_care +="</select>";
			$('.addeasy_care').append(easy_care);
			
			//修改厚度
			thickness ="";
			thickness +="<select class='thickness'>";
			thickness +="<option value='0'>薄</option>";
			thickness +="<option value='1'>厚</option>";
			thickness +="<option value='2'>中</option>";
			thickness +="</select>";
			$(".addthickness").append(thickness);
			
			//修改领形
			
			collar_type ="";
			collar_type +="<select class='collar_type'>";
			collar_type +="<option value='1'>标准领</option>";
			collar_type +="<option value='2'>八字领</option>";
			collar_type +="<option value='3'>一字领</option>";
			collar_type +="<option value='4'>领尖扣领</option>";
			collar_type +="<option value='5'>小方领</option>";
			collar_type +="<option value='6'>圆领</option>";
			collar_type +="<option value='7'>礼服领</option>";
			collar_type +="<option value='8'>立领</option>";
			collar_type +="<option value='9'>暗扣领</option>";
			collar_type +="</select>";
			$(".addcollar_type").append(collar_type);
			
			//修改袖形
			
			sleeve_linging ="";
			sleeve_linging +="<select class='sleeve_linging'>";
			sleeve_linging +="<option value='1'>单扣截角</option>";
			sleeve_linging +="<option value='2'>单扣圆角</option>";
			sleeve_linging +="<option value='3'>单扣直角</option>";
			sleeve_linging +="<option value='4'>双扣截角</option>";
			sleeve_linging +="<option value='5'>双扣圆角</option>";
			sleeve_linging +="<option value='6'>双扣直角</option>";
			sleeve_linging +="<option value='7'>法式截角</option>";
			sleeve_linging +="<option value='8'>法式圆角</option>";
			sleeve_linging +="<option value='9'>法式直角</option>";
			sleeve_linging +="</select>";
			$(".addsleeve_linging").append(sleeve_linging);
			
			//修改门襟
			placket ="";
			placket +="<select class='placket'>";
			placket +="<option value='1'>明门襟</option>";
			placket +="<option value='2'>平门襟</option>";
			placket +="<option value='3'>暗门襟</option>";
			placket +="</select>";
			$(".addplacket").append(placket);
			
			//修改系列
			style ="";
			style +="<select class='style'>";
			style +="<option value='1'>白色</option>";
			style +="<option value='2'>蓝色</option>";
			style +="<option value='3'>深色</option>";
			style +="<option value='4'>粉色</option>";
			style +="<option value='5'>小众</option>";
			style +="</select>";
			$(".addstyle").append(style);

			

			
	$('.sub_input').click(function(){
					
		name=$(".name").val();

		code=$(".code").val();
		price=$(".price").val();
		recommend=$(".recommend").val();
		status=$(".status").val();
		count=$(".count").val();
		elements=$(".elements").val();
		easy_care=$(".easy_care").val();
		thickness=$(".thickness").val();
		detail=$(".detail").val();
		collar_type=$(".collar_type").val();
		console.log(detail);
		sleeve_linging=$(".sleeve_linging").val();
		placket=$(".placket").val();
		style=$(".style").val();

		if(name==""){
			alert("请输入面料名称！");
			return;
		}


		if(code==""){
			alert("请输入面料编号！");
			return;
		}

		if(price==""){
			alert("请输入面料价格！");
			return;
		}


		if(recommend==""){
			alert("请输入推荐场合！");
			return;
		}


		if(count==""){
			alert("请输入支数！");
			return;
		}


		if(elements==""){
			alert("请输入成份！");
			return;
		}


		if(detail==""){
			alert("请输入商品描述！");
			return;
		}else{
			var add_product=new common();
			datas=add_product.request("fabric/add",{name:name,code:code,price:price,recommend:recommend,status:status,count:count,elements:elements,easy_care:easy_care,thickness:thickness,detail:detail,collar_type:collar_type,sleeve_linging:sleeve_linging,placket:placket,style:style});

			//判断添加商品是否成功  成功跳转到商品列表页面 否则留在当前页面
			if(datas.status==0){
				alert("添加成功");
				window.location.href="product_list.html";
			}else{
				alert("添加失败");
			};
		};




		

			});
	});

	
			 
