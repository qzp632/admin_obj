//所有通用方法
function common()
{
	this.config=new config();
	this.datas;
	//发送求方法
	this.request = function(action,args)
	{		
		
		args.token= getCookie('token');
		$.ajax({
			type:"post",
			url:this.config.ADMINURL+'/'+action,
			data:args,
			async:false,
			success: function (ret)
			{
				datas = JSON.parse(ret);
				if(datas.status==-1){
					 location.href="../index.html";
				}	
			}
		})
		return datas;
	}
	//f分页方法
	this.pagers = function()
	{	
		var pageData ={};
		var pages=data.data.pager;
		var page_count=pages.pageCount;
		var loadpage  = pages.page;
		if(loadpage>page_count){
			//alert("这个页面不存在");
			pageData['end'] = page_count;
		}
		if(loadpage<1){
			//alert("这个页面不存在");
			pageData['end'] = 1;
		}
		return page_count;
	}
	//左菜单列表
	this.leftMenu=function(){
		var res="";
		var ul=document.getElementById("ul_bj");
		res+='<a href="product_list.html"><li><img src="../images/splb.png" class="ico">商品列表</li></a>';
		res+='<a href="orders_list.html"><li><img src="../images/orders.png" class="ico">订单列表</li></a>';
		res+='<a href="member.html"><li><img src="../images/hylbs.png" class="ico">会员列表</li></a>';
		res+='<a href="add_fabric.html"><li><img src="../images/hylbs.png" class="ico">添加面料</li></a>';
		res+='<a href="factory_management.html"><li><img src="../images/qxgls.png" class="ico">工厂管理</li></a>';
		res+='<a href="staff_management.html"><li><img src="../images/admin.png" class="ico">员工管理</li></a>';
		res+='<a href="staff_kh.html"><li><img src="../images/ygkhs.png" class="ico">员工考核</li></a>';
		res+='<a href="money_hs.html"><li><img src="../images/ygkhs.png" class="ico">财务核算</li></a>';
		res+='<a href="authority.html"><li><img src="../images/ygkhs.png" class="ico">权限管理</li></a>';
		ul.innerHTML=res;
	}

}
//设置cookie
function setCookie(c_name,value,expiredays)
{
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value) +";path=/";
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

//获取cookie
function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
	return "";
}

