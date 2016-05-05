//订单详情页
window.onload=function(){
	var lan = new lang();
	var str="";
	//将带回来的url参数中包含的id用正则解析出来
	var request = { 
	    QueryString : function(val){ 
	        var uri = window.location.search; 
	        var re = new RegExp("" +val+ "=([^&?]*)", "ig"); 
	        return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null); 
	    } 
	} 

	var rt = request.QueryString("orderId");
	var orders=new common();
	$(".auth").html(getCookie("name"));
	var data = orders.request('productOrders/getOne',{orderId:rt});//将id作为搜索条件
	console.log(data);
	var conf=new config();
	var lan = new lang();
	var dataorder=data.data.orders;
	console.log(dataorder);
	var fabric_Option=data.data.product_orders;
	var last=JSON.stringify(fabric_Option);
	setCookie("last",last,7);//直接从cookie里获取，不用发送请求
	var sd=getCookie("last");
	var sdobj = JSON.parse(sd);//cookie获取的都是字符串,所以要先转换一下

	//创建新的下拉列表
	for(var i=0;i<sdobj.length;i++){
		str="";
		str+="<option value='"+i+"'>"+sdobj[i].id+"</option>";
		$(".products").append(str);
	}

	//将获取到的数据遍历出来，然后分配到各个元素之间
	for(var i in dataorder){
		if(dataorder[i]!=null){

			// console.log(dataorder.name);
			$(".member_id").text(dataorder.sn);
			$(".name").text(dataorder.name);
			$(".address").text(dataorder.address);
			$(".express_note").text(dataorder.express_note);
			// $(".number").text(dataorder.number);
			// $(".phone_number").text(dataorder.phone_number);
			// var sum=dataorder.pay_time;
			// var newDate = new Date();
			// newDate.setTime(sum * 1000);
			// $(".pay_time").text(newDate.toLocaleString());
			// var pay_status ='未付款';
			// if(dataorder.pay_type > 0 )
			// {
			// 	pay_status ='已支付';
			// }
			// $(".pay_type").text("当前付款状态： "+pay_status);
			$(".status").text(lan.order_status(dataorder.status));		
		}
	}
	var update_status;
	$(".update_Status").change(function(){
		update_status=$(this).val();
		//htmls=$(this).html();
		var status_upadte= orders.request('orders/updateStatus',{order_id:rt,status:(update_status-0)});//将id作为搜索条件
			setTimeout(function(){
				location.reload();
			},100);	
		$(".status").text(lan.order_status(dataorder.status));	
		// console.log(status_upadte);
	});

	//将所数据渲染到所对应的位置
	var datamember=data.data.member;
	for(var i in datamember){
		if(datamember[i]!=null){
			$(".height").text(datamember.height);
			$(".weight").text(datamember.weight);
			$(".body_shape").text(lan.body_shape(datamember.body_shape));
			$(".shoulder").text(lan.shoulder(datamember.shoulder));
			$(".abdomen").text(lan.shoulder(datamember.abdomen));
			$(".station_layout").text(lan.shoulder(datamember.station_layout));
			$(".collar_opening").text(datamember.collar_opening);
			$(".should_width").text(datamember.should_width);
			$(".sleeve_length").text(datamember.sleeve_length);
			$(".chest_width").text(datamember.processed_chest_width);
			$(".front_length").text(datamember.front_length);			
			$(".left_wrist_width").text(datamember.processed_left_wrist_width);
			$(".middle_waisted").text(datamember.processed_middle_waisted);
			$(".back_length").text(datamember.back_length);
			$(".right_wrist_width").text(datamember.processed_right_wrist_width);
			$(".swing_around").text(datamember.processed_swing_around);	
			$(".arm_width").text(datamember.processed_arm_width);
			$(".cross_front").text(datamember.cross_front);
			$(".foream").text(datamember.foream);
			$(".cross_back").text(datamember.cross_back);
		}
	}

	var dataorderlist=data.data.product_orders;
	for(var i in dataorderlist){
		if(dataorderlist[i]!=""){
			$(".fabric_code").text(dataorderlist[i].fabric_code);
			$(".collar_type").text(lan.collar_stays(dataorderlist[i].collar_type));
			var swe=dataorderlist[i].sleeve_linging;
			$(".sleeve_linging").text(lan.sleeve_lingings(swe));
			$(".white_collar_white_sleeve").text(lan.whether_judge(dataorderlist[i].white_collar_white_sleeve));
			$(".placket").text(lan.collar_stays(dataorderlist[i].placket));
			$(".packet").text(lan.whetherplcket(dataorderlist[i].packet));
			$(".collar_stays").text(lan.collar_stays(dataorderlist[i].collar_stays));
			$(".style").text(lan.collar_stays(dataorderlist[i].style));
			$(".using").text(dataorderlist.using);
			$(".embroidered_text").text(dataorderlist[i].embroidered_text);
			$(".embroidered_font").text(lan.collar_stays(dataorderlist[i].embroidered_font));
			$(".note").text(dataorderlist[i].note);
		}
	}

	var timestamp4 = data.data.product_orders[0].qrinfo.add_time;
	var date = new Date(timestamp4*1000);
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
	var str4=year+""+m+""+d;
	if(timestamp4){
		$(".qr_code img").attr("src","http://www.shliangyi.net/qrimg/"+str4+"/"+data.data.product_orders[0].qrinfo.qrcode+".jpg");
	}

	$(".products").change(function(){
			products=$(this).val();
			// console.log(products)
			var dataorderlist=data.data.product_orders[products];
			for(var i in dataorderlist){
				if(dataorderlist[i]!=""){
					$(".fabric_code").text(dataorderlist.fabric_code);
					$(".collar_type").text(lan.collar_stays(dataorderlist.collar_type));
					$(".sleeve_linging").text(lan.sleeve_linging(dataorderlist.sleeve_linging));
					$(".white_collar_white_sleeve").text(lan.whether_judge(dataorderlist.white_collar_white_sleeve));
					$(".placket").text(lan.collar_stays(dataorderlist.placket));
					$(".packet").text(lan.whetherplcket(dataorderlist.packet));
					$(".collar_stays").text(lan.collar_stays(dataorderlist.collar_stays));
					$(".style").text(lan.collar_stays(dataorderlist.style));
					$(".using").text(dataorderlist.using);
					$(".embroidered_text").text(dataorderlist.embroidered_text);
					if($(".embroidered_text").text(dataorderlist.embroidered_text)==""){
						$(".embroidered_font").text(lan.collar_stays(dataorderlist.embroidered_font)).hide();
					}else{
						$(".embroidered_font").text(lan.collar_stays(dataorderlist.embroidered_font)).show();
					}
					
					$(".note").text(dataorderlist.note);
					var timestamp3 = dataorderlist.qrinfo.add_time;
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
					if(dataorderlist){
						$(".qr_code img").attr("src","http://www.shliangyi.net/qrimg/"+str3+"/"+dataorderlist.qrinfo.qrcode+".jpg");
					}
					
					if(dataorderlist.qrinfo.status){
						var status=	dataorderlist.qrinfo.status-0;
						$(".im1").attr("src","../images/"+status+"f.png");						
					}else{
						$(".im1").attr("src","../images/1.png");	
					}
				}
			}					
		});


	$(".sun_count").text($(".products option").size());
	var order_Img=data.data.images;
	console.log(order_Img)
	$(".customer_type img").each(function(n){
		$(this).attr("src",conf.IMAGEURL+"/memberUpload/"+order_Img[n].m_id+"/"+order_Img[n].name);
		$(this).attr("value",order_Img[n].type);
	});
}