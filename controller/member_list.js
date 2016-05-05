//会员列表
function member_list(args){
	var orders=new common();
	data = orders.request('member/list',args);
	this.countPage=orders.pagers();
	$("#zy").html("总"+this.countPage+"页");
	$("#zy").val(this.countPage);
	var str="";
 
	var lan = new lang();
	if(data.status==0){
		var index=data.data.data.length;
		var datas=data.data.data;

		str+="<tbody style='width:100%' class='tid'>";
		for(var i=0;i<index;i++){
			str+="<tr>";
				str+="<td>"+datas[i].id+"</td>";
				str+="<td>"+datas[i].phone_number+"</td>";
				str+="<td>"+datas[i].name+"</td>";
				str+="<td>"+datas[i].last_login_time+"</td>";
				// str+="<td>"+datas[i].dressing_counselor+"</td>";	
				var sum=datas[i].update_time;
				var newDate = new Date();
				newDate.setTime(sum * 1000);
				str+="<td>"+newDate.toLocaleString()+"</td>";

				var id=datas[i].id;
				str+="<td><span><a href='photo_super.html?id="+id+"'>上传</a></span></td>";
				str+="<td><span><a href='volume_info.html?id="+id+"'>查看</a></span></td>";
				str+="<td><span><a href='order.html?id="+id+"'>下单</a></span></td>";
			str+="</tr>";
		}	
			str+="<tbody>";	
			$("#content").append(str);

	}
}

/*会员列表 > 照片管理(客户信息{拿到单个用户信息放到页面}) photo_super.html*/
$(document).ready(function(){
	urlinfo=window.location.href; //获取当前页面的url 
	len=urlinfo.length;//获取url的长度 
	offset=urlinfo.indexOf("?");//设置参数字符串开始的位置 
	newsidinfo=urlinfo.substr(offset,len)//取出参数字符串 这里会获得类似“id=1”这样的字符串 
	newsids=newsidinfo.split("=");//对获得的参数字符串按照“=”进行分割 
	newsid=newsids[1];//得到参数值  

	member_pho=new common();
	member_datas=member_pho.request("member/getOne",{id:newsid})
	mdata=member_datas.data;
	if(mdata!=null){
		name=mdata.name;//会员姓名
		var phone_number=mdata.phone_number;//会员号码
		var create_time=mdata.create_time;//会员注册时间
		var order_detail=document.getElementById("order_detail");

	}
	/*照片管理里的客户信息*/
	str="";	
	str+="<p>用户姓名:<input style='border:1px solid #e3e3e3' type='text' name='mod_name' class='mod_name' value="+name+" /></p>";
	str+="<p>手机号码："+phone_number+"</p>";
	str+="<p>注册时间："+create_time+"</p>";
	// order_detail.innerHTML=str;
	$("#viewOrderDetail").prepend(str);


	/*量体信息里的客户信息*/
	mod="";	
	mod+="<p>用户姓名："+name+" </p>";
	mod+="<p>手机号码："+phone_number+"</p>";
	mod+="<p>注册时间："+create_time+"</p>";
	$("#order_detail").prepend(mod);

	//读取用户量体数据
	var collar_opening=$(".collar_opening").val(mdata.collar_opening);//量体领围
	var chest_width=$(".chest_width").val(mdata.chest_width);//量体胸围
	var middle_waisted=$(".middle_waisted").val(mdata.middle_waisted);//量体中腰
	var swing_around=$(".swing_around").val(mdata.swing_around);//量体摆围
	var arm_width=$(".arm_width").val(mdata.arm_width);//量体臀围
	var foream=$(".foream").val(mdata.foream);//量体小臂
	var left_wrist_width=$(".left_wrist_width").val(mdata.left_wrist_width);//量体左腕围
	var right_wrist_width=$(".right_wrist_width").val(mdata.right_wrist_width);//量体右腕围
	var should_width=$(".should_width").val(mdata.should_width);//量体肩宽
	var sleeve_length=$(".sleeve_length").val(mdata.sleeve_length);//量体袖长
	var back_length=$(".back_length").val(mdata.back_length);//量体后衣长
	var front_length=$(".front_length").val(mdata.front_length);//量体前衣长
	var cross_front=$(".cross_front").val(mdata.cross_front);//量体前胸围
	var cross_back=$(".cross_back").val(mdata.cross_back);//量体后背宽
	var processed_chest_width=$(".processed_chest_width").val(mdata.processed_chest_width);//加工胸围
	var processed_middle_waisted=$(".processed_middle_waisted").val(mdata.processed_middle_waisted);//加工中腰
	var processed_swing_around=$(".processed_swing_around").val(mdata.processed_swing_around);//加工摆围
	var processed_arm_width=$(".processed_arm_width").val(mdata.processed_arm_width);//加工臂围
	var processed_left_wrist_width=$(".processed_left_wrist_width").val(mdata.processed_left_wrist_width);//加工左腕围
	var processed_right_wrist_width=$(".processed_right_wrist_width").val(mdata.processed_right_wrist_width);//加工右腕围
	var height=$(".height").val(mdata.height);//身高
	var weight=$(".weight").val(mdata.weight);//体重
	var body_shape=$(".body_shape").val(mdata.body_shape);//加工体型
	var station_layout=$(".station_layout").val(mdata.station_layout);//加工站姿
	var shoulder=$(".shoulder").val(mdata.shoulder);//加工肩宽
	var abdomen=$(".abdomen").val(mdata.abdomen);//加工腹部
	var note=$(".note").val(mdata.note);//加工备注

	//修改用户信息
	var mod_name=$(".mod_name").val(mdata.name);



	/******************************为用户下单*********************************/
	$(".phoneNumber").val(mdata.phone_number);
	$(".name").val(mdata.name);
});





/*会员列表【修改用户的姓名】 >*/

$(document).ready(function(){
	$(".modify_name").click(function(){
		urlinfo=window.location.href; //获取当前页面的url 
		len=urlinfo.length;//获取url的长度 
		offset=urlinfo.indexOf("?");//设置参数字符串开始的位置 
		newsidinfo=urlinfo.substr(offset,len)//取出参数字符串 这里会获得类似“id=1”这样的字符串 
		newsids=newsidinfo.split("=");//对获得的参数字符串按照“=”进行分割 
		newsid=newsids[1];//得到参数值  
		// console.log(newsid);
		//获取提交过来的值
		modName=$(".mod_name").val();

		// $(".cfile").each(function(a){
		// 	var cfile=$(".cfile").eq(a).val();
		// 	console.log(cfile);
		// });	

		// var cfile=$(".cfile").val();
		// //console.log(cfile);

		
		// var cfile=new common();
		// var cfile_data=cfile.request("upload/add",{member_id:newsid,type:1});
		// console.log(cfile_data);

		var upload_form=$("#cus_pic").serialize();
		// console.log(upload_form);
		var cfile=$(".cfile").val();

		//console.log(cfile);
	});
});

/*列表页添加会员*/
		function pupopen(){
	        document.getElementById("add_mem_bg").style.display="block";
            document.getElementById("add_mem_popbox").style.display="block" ;	


            $(".member_input").click(function(){
            	memberName=$(".memberName").val();   
            	memberPhone=$(".memberPhone").val();
            	memberAdd=new common();
            	memberAdd_data=memberAdd.request("member/add",{name:memberName,phone:memberPhone});
            	if(memberAdd_data.status==0){
            		window.location.href="./member.html";
            	}else{
            		alert(memberAdd_data.message);
            	}
            });        

		};
		function add_mem_close(){
			document.getElementById("add_mem_bg").style.display="none";
		    document.getElementById("add_mem_popbox").style.display="none" ;	
		};


 /*照片管理(客户正面，背面，侧面三张图片) photo_super.html*/
$(document).ready(function(){
		 $(".upload_pho").click(function(){
		 	//
        	upload_pho=$(this).val();   
         $("#file-"+upload_pho+"").fadeOut(3000); 	
        })



    //响应文件添加成功事件
    $(".inputfile").change(function(){
    	urlinfo=window.location.href; //获取当前页面的url 
		len=urlinfo.length;//获取url的长度 
		offset=urlinfo.indexOf("?");//设置参数字符串开始的位置 
		newsidinfo=urlinfo.substr(offset,len)//取出参数字符串 这里会获得类似“id=1”这样的字符串 
		newsids=newsidinfo.split("=");//对获得的参数字符串按照“=”进行分割 
		newsid=newsids[1];//得到参数值  
        //创建FormData对象
        var data = new FormData();
        var data_token= getCookie('token');
       	var con_commom=new config(); //实例化配置文件
       	var urli=con_commom.ADMINURL;
        //为FormData对象添加数据
        var i =1;
        $.each($('.inputfile'),function(i, file) {
        	i++;
        	if(i == upload_pho )
        	{	
        		data.append('upload', file.files[0]);
        	}   
        });
        //$(".loading").show();    //显示加载图片

        //发送数据
        var pic;
        $.ajax({
            url:urli+"/upload/add?type="+upload_pho+"&member_id="+newsid+"&token="+data_token+"",
            type:'POST',
            data:data,
            cache: false,
            contentType: false,        //不可缺参数
            processData: false,        //不可缺参数
            success:function(data){
            	pic_data=JSON.parse(data); 
            	pic=pic_data.data.file;
            	type=pic_data.data.type;

					
					$("[name=img-"+type+"]").attr("src",""+iUrl+"/memberUpload/"+newsid+"/"+pic+"");
					//
					$("#file-"+type+"").fadeOut(3000);

			    //divo= ["positive","back","side"];
			    //$("."+divo[type-1]).innerHTML="";
				// positive ="";
				// key = i+1;
				$(".img-"+type).attr("src",""+iUrl+"/memberUpload/"+newsid+"/"+pic+"");
				// positive +='<img name="img-'+type+'" src='+iUrl+'/memberUpload/'+newsid+'/'+pic+'>';
				// $("."+divo[type-1]).append=(positive);	

				sta=pic_data.status;
				if(sta==0){
					//alert("上传成功！");
					//window.location.href="./member.html";
					//console.log(type);
					//$("upload_pho+"+type+"").hide();
				}else{
					alert("上传出错，请重新上传！");
				}
            },
            error:function(){
                alert('上传出错');
            }
        });
    });
});
/************---------读出照片数据展示----------************/
$(document).ready(function(){

		urlinfo=window.location.href; //获取当前页面的url 
		len=urlinfo.length;//获取url的长度 
		offset=urlinfo.indexOf("?");//设置参数字符串开始的位置 
		newsidinfo=urlinfo.substr(offset,len)//取出参数字符串 这里会获得类似“id=1”这样的字符串 
		newsids=newsidinfo.split("=");//对获得的参数字符串按照“=”进行分割 
		newsid=newsids[1];//得到参数值  


		pho_index=member_datas.data.imgs.length;
		for(j=0;j<pho_index;j++){
			type=member_datas.data.imgs[j].type;
		};
		imgs=member_datas.data.imgs;
		var imageUrl=new config();
		 iUrl=imageUrl.IMAGEURL;
		// console.log(iUrl);
		divob= ["positive","back","side"];
		//循环把id为newsid的所有图片取出
		for(var i=0;i<pho_index;i++){
   			//拿到数据库里的图片类似于(ef7fbaf0d49c3ba15a0009c816cf9.jpg)
   			photo_img=imgs[i].name;





   			//正面
			positive ="";
			key = i+1;
			$("[name=img-"+key+"]").attr("src",""+iUrl+"/memberUpload/"+newsid+"/"+imgs[i].name+"");
			//positive +='<img name="img-'+key+'" src='+iUrl+'/memberUpload/'+newsid+'/'+imgs[i].name+'>';
			//$("."+divob[imgs[i].type-1]).prepend(positive);	
		};

	urlinfo=window.location.href; //获取当前页面的url 
	len=urlinfo.length;//获取url的长度 
	offset=urlinfo.indexOf("?");//设置参数字符串开始的位置 
	newsidinfo=urlinfo.substr(offset,len)//取出参数字符串 这里会获得类似“id=1”这样的字符串 
	newsids=newsidinfo.split("=");//对获得的参数字符串按照“=”进行分割 
	newsid=newsids[1];//得到参数值  
	pho_index=member_datas.data.imgs.length;
	for(j=0;j<pho_index;j++){
		type=member_datas.data.imgs[j].type;
		// console.log(type);
	};
	imgs=member_datas.data.imgs;
	// console.log(pho_index);
	var imageUrl=new config();
	 iUrl=imageUrl.IMAGEURL;
	// console.log(iUrl);
	divob= ["positive","back","side"];
	//循环把id为newsid的所有图片取出
	for(var i=0;i<pho_index;i++){
		//拿到数据库里的图片类似于(ef7fbaf0d49c3ba15a0009c816cf9.jpg)
		photo_img=imgs[i].name;
		//正面
		positive ="";
		key = i+1;
		$("[name=img-"+key+"]").attr("src",""+iUrl+"/memberUpload/"+newsid+"/"+imgs[i].name+"");
		//positive +='<img name="img-'+key+'" src='+iUrl+'/memberUpload/'+newsid+'/'+imgs[i].name+'>';
		//$("."+divob[imgs[i].type-1]).prepend(positive);	
	};
});




















