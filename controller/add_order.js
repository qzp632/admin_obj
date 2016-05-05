//添加订单
function add_order(){
	var con=new common();
	var str="";
	var fabric_details=con.request("factory/list",{});
	console.log(fabric_details);
	var fabric_list=fabric_details.data;
	//创建新的下拉列表
	for(var i=0;i<fabric_list.length;i++){
		str="";
		str+="<option value='"+fabric_list[i].id+"'>"+fabric_list[i].name+"</option>";
		$(".factory_detail").append(str);
	}
}

$(document).ready(function(){
	add_order();//文档加载后立即调用添加订单
	var collar;//标准尺寸
	var standard_code_size;//合身度
	var collar_type;//领形
	var sleeve_linging;//袖型
	var placket;//门襟
	var fabric;//面料
	var str="";//定义一个变量来创建面料列表
	var order_count;//数量
	var embroidered_font;//字体
	var pocketvalue;//口袋
	var white_collar;//白领白袖
	var mode_volume;//销售员
	var courier_number;//
	var delivery_time;
	var collar_values;
	var pay_typetinyin;
	//获取商品列表所数据
	var con=new common();
	var datas = con.request('fabric/getCodeList',{});
	console.log(datas)
	// console.log(datas);
	$(".auth").html(getCookie("name"));

	//选中标准尺寸显示下拉选项，取消选中隐藏下拉选项
	$(".btn").click(function(){
		if($(".standard").attr("checked")=="checked"){
			$(".standard_option").show();

		}else{
			$(".standard_option").hide();
		}
		collar_values=$(this).val();
	});

	//选择标准尺寸大小
	$(".collar").change(function(){
		collar=$(this).val();
	});

	$(".pay_typetinyin").change(function(){
		pay_typetinyin=$(this).val();
	});

	//选择合身度
	$(".standard_code_size").change(function(){
		standard_code_size=$(this).val();
	});

	// //选择领型
	$(".collar_type").change(function(){
		collar_type=$(this).val();
	});

	//选择袖型
	$(".sleeve_linging").change(function(){
		sleeve_linging=$(this).val();
	});

	var phone_Value;
	//手机号码输入框失去焦点时获取对应的用户名和地址信息
	$(".phoneNumber").blur(function(){
		$("#addbtn").removeAttr("disabled");
		var data = con.request('member/getByPhone',{phone:$(this).val()});

		phone_Value=data.data;
		if(phone_Value!=" " && phone_Value.phone_number==$(this).val()){
			$(".name").val(phone_Value.name);
			$(".consignee_address").val(phone_Value.consignee_address);
		}else{
			$(".name").val("");
			$(".consignee_address").val("");
		}
	});

	//选择门襟
	$(".placket").change(function(){
		placket=$(this).val();
	});

	//获取商品列表中指定的数据并且遍历插入面料列表中
	var factory_code=datas.data;
	for(var i=0;i<factory_code.length;i++){
		str="";
		str+="<option value='"+factory_code[i]+"'>"+factory_code[i]+"</option>";
		$(".fabric_code").append(str);
	}
	//选择面料
	$(".fabric").change(function(){
		fabric=$(this).val();
	});

	//选择字体
	$(".embroidered_font").change(function(){
		embroidered_font=$(this).val();
	});

	//选中绣字显示输入框，取消选中隐藏输入框
	$("#embroidered").click(function(){
		if($(this).attr("checked")=="checked"){
			$(".show_hide").css("visibility","visible");
		}else{
			$(".show_hide").css("visibility","hidden");
		}
	});

	//选择是否要口袋
	$(".pocket_Btn").click(function(){
		if($(this).attr("checked")=="checked"){
			pocketvalue="1";
		}else{
			pocketvalue="0";
		}
	});

	$(".radioclass").click(function(){
		if(phone_Value==" " || phone_Value.collar_opening=="0"){
			$(".pullclass").attr("disabled","false");
			alert("你好！您无法选择此项!")
		}else{
			$(".pullclass").removeAttr("disabled");
		}
	})

	$(".standard").click(function(){
		$(".pullclass").removeAttr("disabled");
	});
	//选择是否要白领白袖
	$(".white_collar").click(function(){
		if($(this).attr("checked")=="checked"){
			white_collar="1";
		}else{
			white_collar="0";
		}
	});

	//量体方式
	$(".mode_volume").change(function(){
		mode_volume=$(this).val();
	});
	//提交页面时将用户名、手机号码、收件地址获取到然后存在输入框中
	//必填字方法
	$(".clear_Btn").click(function(){
		$(".name").val("");
		$(".phoneNumber").val("");
		$(".consignee_address").val("");
	});

	$(".name").val(getCookie("names"));
	$(".phoneNumber").val(getCookie("phoneNumber"));
	$(".consignee_address").val(getCookie("consignee_address"));

	//转换时间戳的方法
	function get_unix_time(dateStr)
	{
	    var newstr = dateStr.replace(/-/g,'/'); 
	    var date =  new Date(newstr); 
	    var time_str = date.getTime().toString();
	    return time_str.substr(0, 10);
	}

	var factory_Id;
	$(".factory_detail").change(function(){
		factory_Id=$(this).val();
	});

	var lock=true;
	//添加订单提交事件
	$("#addbtn").click(function(){ 
		if(lock){
		$("#addbtn").attr("disabled","false");//点击后防止多次发送请求，将状态设为禁止
		// required();
		//如果日期不为空的情况下，将日期转换成时间戳
		if($(".delivery_time").val()!=""){
			delivery_time=get_unix_time($(".delivery_time").val());
		}

		var phoneNumber=$(".phoneNumber").val();//手机号码
		if(phoneNumber==""){
			alert("收件号码不能为空!");
			$("#addbtn").removeAttr("disabled");
			return;
		}
		var name=$(".name").val();//用户姓名
		if(name==""){
			alert("收件人不能为空!");
			$("#addbtn").removeAttr("disabled");
			return;
		}
		var consignee_address=$(".consignee_address").val();//收件地址
		if(consignee_address==""){
			alert("收件地址不能为空!");
			$("#addbtn").removeAttr("disabled");
			return;
		}
		var dress_Consultants=$(".dress_Consultants").val();//着装顾问
		if(dress_Consultants==""){
			alert("着装顾问不能为空!");
			$("#addbtn").removeAttr("disabled");
			return;
		}
		var salesman=$(".salesman").val();//销售员
		if(salesman==""){
			alert("销售员不能为空!");
			$("#addbtn").removeAttr("disabled");
			return;
		}
		var courier_number=$(".courier_number").val();//快递单号
		if(courier_number==""){
			alert("快递单号不能为空!");
			$("#addbtn").removeAttr("disabled");
			return;
		}
		var user_Count=$(".user_Count").val();//快递备注
		var embroidered_text=$(".embroidered_text").val();//绣字内容
		var other_Count=$(".other_Count").val();//衣服备注
		var discount_amount=$(".discount_amount").val();//打折金额
		var discount_reasons=$(".discount_reasons").val();//打折原因
		var order_count=$(".order_count").val();
		var item_qr=$(".item_qr").val();//二维码
		if(item_qr==""){
			alert("二维码不能为空!");
			$("#addbtn").removeAttr("disabled");
		}

		//提交页面时将用户名、手机号码、收件地址存储在输入框中
		new setCookie("names",name);
		new setCookie("phoneNumber",phoneNumber);
		new setCookie("consignee_address",consignee_address);
		
		//发送添加请求\
		 data=con.request("orders/add",{phoneNumber:phoneNumber,name:name,address:consignee_address,sale_name:salesman,
			dressing_name:dress_Consultants,express_no:courier_number,express_time:delivery_time,number:order_count,code:fabric,measure_type :mode_volume,express_note:user_Count,discount:discount_amount,discount_remark:discount_reasons,
			embroidered_font:embroidered_font,item_qr:item_qr,productOrders_note:other_Count,collar:collar,slin:standard_code_size,
			collar_type:collar_type,sleeve_linging:sleeve_linging,placket:placket,embroidered_text:embroidered_text,packet:pocketvalue,
			white_collar_white_sleeve:white_collar,pay_type:pay_typetinyin,factory_id:factory_Id});
		 // console.log(data);
		 	if(data.status==0){
		 		alert("添加成功!");	
		 		location .href="order.html";
		 	}else{
		 		//成功之后在将禁止取消
		 		alert("添加失败,用户不存在或者信息有误!");
		 		$("#addbtn").removeAttr("disabled");
		 	}
		 	lock=false;

		}else{
			
			lock=true;
		}
	});
});


