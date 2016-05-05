$(document).ready(function(){
	//console.log(2);
	urlinfo=window.location.href; //获取当前页面的url 
	len=urlinfo.length;//获取url的长度 
	offset=urlinfo.indexOf("?");//设置参数字符串开始的位置 
	newsidinfo=urlinfo.substr(offset,len)//取出参数字符串 这里会获得类似“id=1”这样的字符串 
	newsids=newsidinfo.split("=");//对获得的参数字符串按照“=”进行分割 
	newsid=newsids[1];//得到参数值  
	// console.log(newsid);
	$(".volume_sub").click(function(){

		var collar_opening=$(".collar_opening").val();//量体领围
		var chest_width=$(".chest_width").val();//量体胸围
		var middle_waisted=$(".middle_waisted").val();//量体中腰
		var swing_around=$(".swing_around").val();//量体摆围
		var arm_width=$(".arm_width").val();//量体臀围
		var foream=$(".foream").val();//量体小臂
		var left_wrist_width=$(".left_wrist_width").val();//量体左腕围
		var right_wrist_width=$(".right_wrist_width").val();//量体右腕围
		var should_width=$(".should_width").val();//量体肩宽
		var sleeve_length=$(".sleeve_length").val();//量体袖长
		var back_length=$(".back_length").val();//量体后衣长
		var front_length=$(".front_length").val();//量体前衣长
		var cross_front=$(".cross_front").val();//量体前胸围
		var cross_back=$(".cross_back").val();//量体后背宽
		var processed_chest_width=$(".processed_chest_width").val();//加工胸围
		var processed_middle_waisted=$(".processed_middle_waisted").val();//加工中腰
		var processed_swing_around=$(".processed_swing_around").val();//加工摆围
		var processed_arm_width=$(".processed_arm_width").val();//加工臂围
		var processed_left_wrist_width=$(".processed_left_wrist_width").val();//加工左腕围
		var processed_right_wrist_width=$(".processed_right_wrist_width").val();//加工右腕围
		var height=$(".height").val();//身高
		var weight=$(".weight").val();//体重
		var body_shape=$(".body_shape").val();//加工体型
		var station_layout=$(".station_layout").val();//加工站姿
		var shoulder=$(".shoulder").val();//加工肩宽
		var abdomen=$(".abdomen").val();//加工腹部
		var note=$(".note").val();//加工备注

		//修改用户信息
		var mod_name=$(".mod_name").val();
		if(mod_name==""){
			alert("请输入用户名！");
		}else{
			var volume_info=new common();
			var volume_data=volume_info.request("member/update",{name:mod_name,member_id:newsid,collar_opening:collar_opening,chest_width:chest_width,middle_waisted:middle_waisted,swing_around:swing_around,arm_width:arm_width,foream:foream,left_wrist_width:left_wrist_width,right_wrist_width:right_wrist_width,should_width:should_width,sleeve_length:sleeve_length,back_length:back_length,front_length:front_length,cross_front:cross_front,cross_back:cross_back,processed_chest_width:processed_chest_width,processed_middle_waisted:processed_middle_waisted,processed_swing_around:processed_swing_around,processed_arm_width:processed_arm_width,processed_left_wrist_width:processed_left_wrist_width,processed_right_wrist_width:processed_right_wrist_width,height:height,weight:weight,body_shape:body_shape,station_layout:station_layout,shoulder:shoulder,abdomen:abdomen,note:note});
			
			//判断是否提交成功 提交成功之后跳转到会员列表页面
			
			if(volume_data.status==0){
				alert("修改成功");
				window.location.href='member.html';
			}else{
				alert("修改失败");
			}
			   
		}






		

	})
	

	//读取数据

	var viewInfo=new common();
	var viewInfo_data=viewInfo.request("member/getOne",{id:newsid})
	var view_data=viewInfo_data.length;
	// console.log(view_data);

	var collar_opening=$(".collar_opening").val();//量体领围
	var chest_width=$(".chest_width").val();//量体胸围
	var middle_waisted=$(".middle_waisted").val();//量体中腰
	var swing_around=$(".swing_around").val();//量体摆围
	var arm_width=$(".arm_width").val();//量体臀围
	var foream=$(".foream").val();//量体小臂
	var left_wrist_width=$(".left_wrist_width").val();//量体左腕围
	var right_wrist_width=$(".right_wrist_width").val();//量体右腕围
	var should_width=$(".should_width").val();//量体肩宽
	var sleeve_length=$(".sleeve_length").val();//量体袖长
	var back_length=$(".back_length").val();//量体后衣长
	var front_length=$(".front_length").val();//量体前衣长
	var cross_front=$(".cross_front").val();//量体前胸围
	var cross_back=$(".cross_back").val();//量体后背宽
	var processed_chest_width=$(".processed_chest_width").val();//加工胸围
	var processed_middle_waisted=$(".processed_middle_waisted").val();//加工中腰
	var processed_swing_around=$(".processed_swing_around").val();//加工摆围
	var processed_arm_width=$(".processed_arm_width").val();//加工臂围
	var processed_left_wrist_width=$(".processed_left_wrist_width").val();//加工左腕围
	var processed_right_wrist_width=$(".processed_right_wrist_width").val();//加工右腕围
	var height=$(".height").val();//身高
	var weight=$(".weight").val();//体重
	var body_shape=$(".body_shape").val();//加工体型
	var station_layout=$(".station_layout").val();//加工站姿
	var shoulder=$(".shoulder").val();//加工肩宽
	var abdomen=$(".abdomen").val();//加工腹部
	var note=$(".note").val();//加工备注

		//修改用户信息
		var mod_name=$(".mod_name").val();


})








