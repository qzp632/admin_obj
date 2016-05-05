$(document).ready(function(){
	//页面上默认显示修改密码栏目
	admin_top ="";
	admin_top +="<ul>";
	admin_top +="<li class='hello'>";
	admin_top +="您好,<a class='auth'></a>";
	admin_top +="</li>";
	admin_top +="<li class='modify'>";
	admin_top +="<a class='modifyPassword' >修改密码</a>";
	admin_top +="</li>";
	admin_top +="<li class='exit'>";
	admin_top +="<span id='exit'>退&nbsp;出</span>";
	admin_top +="</li>";
	admin_top +="</ul>";

	$("#admin_top").append(admin_top);	
	$(".auth").html(getCookie("name"));

	/*********HTML隐藏修改密码输入框************/

	htm="";
	htm +="<div id='passwordbg'></div>";
	htm +="<div id='passwordpopbox'>";
	htm +="<span  class='cross' style='font-family: 微软雅黑;'>X</span>";
	htm +="<p>修改密码</p>";
	htm +="<div class='add_product_tab' id='add_product_tab'>";
	htm +="<div class='div_span'>";
	htm +="<a>重置密码</a>";
	htm +="<input type='password' class='cPassword'/>";
	htm +="</div>";
	htm +="<div class='div_span'>";
	htm +="<a>确认密码</a>";
	htm +="<input type='password' class='conPassword'/>";
	htm +="</div>";
	htm +="</div>";
	htm +="<input type='submit' name='sub' value='保存修改' class='modPassword' />";
	htm +="</div>";
	$("body").append(htm);

	$(".modifyPassword").click(function(){
		document.getElementById("passwordbg").style.display="block";
		document.getElementById("passwordpopbox").style.display="block" ;
	});


	//判断输入框是否输入
	$(".conPassword").click(function(){
			//获取修改框提交过来的数据
			cPassword=$(".cPassword").val();
			conPassword=$(".conPassword").val();
			if(cPassword.length<1){
				alert("请输入密码！");
			};
		
	});
	
	//点击修改
	$(".modPassword").click(function(){
		
		if(conPassword==""){
			alert("请输入确认密码！");
		};
		if(cPassword==conPassword){
			con=new common();
			con_data=con.request("user/updatepassword",{password:conPassword});
			if(con_data.status==0){
				window.location.href="../index.html";
			};
		}else{
			alert("两次密码不一样，请重新输入");
			return;
		};

	});

	//修改密码后关闭按钮
	$(".cross").click(function(){
		document.getElementById("passwordbg").style.display="none";
		document.getElementById("passwordpopbox").style.display="none";
	});
	
							
	//页面退出
		
	$("#exit").click(function(){
		loginout=new common();
		loginout_data=loginout.request("user/loginout",{})
		//console.log(loginout_data.status);
		if(loginout_data.status==0){
				
			setCookie("name","",-1)
			setCookie("token","",-1);
			setCookie("adminid","",-1);
			setCookie("pho","",-1);
			setCookie("pwd","",-1);
			window.location.href="../index.html";
		 };
				
	});

});