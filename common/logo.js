function logo(){
		var coon=new common();
		$("#btn").click(function(){
		var username=$("#username").val();
		var password=$("#password").val();

		var con=new common();
		data_Json=con.request("user/login",{phone:username,password:password});
		this.pwd=password;
		//console.log(password);
		console.log(data.data.name)
	
		//alert(data.data.id)
		var dataValue=data_Json.data;
		var last=JSON.stringify(dataValue);
		// console.log(last);
		//new setCookie("dataValue",dataValue.id,7);

		new setCookie("name",data_Json.data.name)
		new setCookie("token",data_Json.token,7);
		new setCookie("adminid",last,7);
		//document.cookie="userinfo="+dataValue;
			if(data_Json.status==0){
				location.href="view/orders_list.html";
			}else{
				alert("登录失败,请重新输入！");
			}
		});	
}