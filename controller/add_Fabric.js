$(document).ready(function(){
	//把数据写到页面上
	fabric='';
	fabric+='<tr>';
	fabric+='<td>面料名称</td>';
	fabric+='<td>进价元/米</td>';
	fabric+='<td>现库存量/米</td>';
	fabric+='<td>消耗/米</td>';
	fabric+='<td>采购/米</td>';
	fabric+='<td>最新库存量/米</td>';
	fabric+='<td>上架</td>';
	fabric+='<td><span class="modFab">修改</span></td>';
	fabric+='</tr>';
	$("#addFabic").append(fabric);
	/*添加商品*/
	$(".add_btn").click(function(){
	    document.getElementById("bg").style.display="block";
        document.getElementById("popbox").style.display="block" ;
	});
	$(".close").click(function(){
		document.getElementById("bg").style.display="none";
	    document.getElementById("popbox").style.display="none" ;
	});						
	/*修改商品*/
	$(".modFab").click(function(){
        document.getElementById("modFabbg").style.display="block";
        document.getElementById("modFabpopbox").style.display="block" ;
	});
	$(".modFabclose").click(function(){
		document.getElementById("modFabbg").style.display="none";
	    document.getElementById("modFabpopbox").style.display="none" ;	
	});
					
								
								
});