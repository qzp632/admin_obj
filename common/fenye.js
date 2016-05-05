// $(document).ready(function(){
function branchpage(callblck,args,values){
	var page=1;//定义一个变量接收当前页
	var status="0";//定义一个变量来控制接单状态
	var orders=new common();//实例化请求函数

	var len=1;//定义一个变量来改变状态的当前页
	var res;
	$("#dq").val(page);//默认当前页

	//下拉框选择状态
	$("select").change(function(){
		var table=$(".tid");//获取到table表
		status=$(this).val();//获取到当前操作的状态
		table.html("");//将之前表中的内容删除
		page=len;//在将当前页返回到默认值
	 	args.status = status;//添加一个需要改变的参数属性
		callblck(args);
		var pagecount=$("#zy").val();//获取到总页数
		if(page>pagecount){//如果当前页大于总页数
			page=pagecount;//就让当前页等于总页数
			$("#dq").hide();
		}else{
			$("#dq").show();
		}
		$("#dq").val(page);
	});

	//文本框输入需要的页码
	$("#dq").change(function(){
		var pagecount=$("#zy").val();
		var table=$(".tid");
		page=Math.floor($("#dq").val());
		if((page-0) > pagecount){
			page=pagecount;
			alert("没有此选项！！")
		}else if((page-0) < 1){
			page=1;
			alert("没有此选项！！")
		}	
			args.page = page;
			callblck(args);
			table.html("");
			$("#dq").val(page);		
	});
	
	//下一页点击操作事件
	$("#next").click(function(){
	 	var table=$(".tid");
	 	var pagecount=$("#zy").val();
	 	if( pagecount > (page-0) ){
	 		page++;
	 		args.page = page;
			callblck(args);
	 		table.html("");
	 		$("#dq").val(page);
	 	}
	 	else{
	 		res="当前是最后一页！";
	 		alert(res);
	 	}
	 });
	
	//上一页点击操作事件
	 $("#prev").click(function(){
	 	var table=$(".tid");
	 	page--;
	 	if(page<1){
	 		page=1;
	 		res="当前是第一页！";
	 		alert(res);
	 	}
	 	args.page = page;
		callblck(args);
	 	table.html("");
	 	$("#dq").val(page);
	 });
	 var lock=true;
	 //根据某个条件搜索
	 $("#imgBtn").click(function(){
	 	
			var tid=$(".tid");
			var tel=$("#search").val();
			page=len;
			tid.html("");
			args[values] = tel;
			if(lock){
				callblck(args);
				$("#imgBtn").attr("disabled","false");
				lock=false;	
			}else{
	 		$("#addbtn").removeAttr("disabled");
			lock=true;
	 	}
			
			var pagecount=$("#zy").val();
			if(page>pagecount){
				page=pagecount;
				$("#dq").hide();
			}else{
				$("#dq").show();
			}
	 });

	//
	$("#trs th").css("border","1px solid #ccc");
	$("#prev").css({"cursor":"pointer","margin-left":"500px"});
	$("#next").css("cursor","pointer");	




						
						
						

	//page分页HTML

	// page="";
	// page +='<span id="prev">上一页</span>';
	// page +='<span id="next">下一页</span>';
	// page +='<span id="current">当前页&nbsp;<input style="width:40px;height:23px; border:1px solid #cfcbc8;	" type="text" id="dq" value="" /></span>';
	// page +='<span id="zy"></span>';
	// $(".page").append(page);
}
	

// });