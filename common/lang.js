//通用语言包
function lang()
{
	this.order_status=function(key){
		var order={"0":"等待接单","1":"已接单","2":"生产中","3":"完成"};
		return order[key];
	}
	this.whether_judge=function(key){
		var whether={"1":"是","0":"否"};
		return whether[key];
	}
	this.whetherplcket=function(key){
		var plackets={
			"1":"有","0":"无"
		}
		return plackets[key];
	}
	this.collar_stays= function(key)
	{
		var collar={
			"normal":"正体","swash":"花体","italic":"斜体",
			"slin":"修身","fit":"合身","loosen":"宽松",
			"frant_strap":"明门襟","flat_strap":"平门襟","hidden_strap":"暗门襟",
			"detachable_collar":"活领撑","fixed_collar":"固定领撑",
			"standed_collar":"标准领","cutaway_collar":"八字领","honzcntal_collar":"一字领","button_dawn_collar":"领尖扣领","square_collar":"小方领",
			"square_colla":"小方领","round_collar":"圆领","wing_collar":"礼服领","stand_collar":"立领","hidden_button_collar":"暗扣领"
		};
		return collar[key];
	}
	this.body_shape=function(key){
		var shape={"normal":"一般","thin":"纤细","rich":"富贵","little_fat":"微胖","strong":"强壮"};
		return shape[key];
	}
	this.shoulder=function(key){
		var shou={
			"normal":"普通","xiaoping_shoulder":"小平肩","daping_shoulder":"大平肩",
			"small_shoulder":"小溜肩","big_shoulder":"大溜肩",
			"flat_belly":"平腹","micro_abdominal":"微腹","upper_abdomen":"大腹"
		};
		return shou[key];
	}
	this.sleeve_linging=function(key){
		var sleeve={
			"single_button_cut_angle":"单扣截角",
			"single_button_rand_angle":"单扣圆角",
			"single_button_straight_angle":"单扣直角",
			"dou_cut_angle":"双扣截角",
			"dou_straight_angle":"双扣圆角",
			"dou_straight_straight_angle":"双扣直角",
			"french_cut_angle":"法式截角",
			"french_round_angle":"法式圆角",
			"french_straight_angle":"法式直角"
		};
		return sleeve[key];
	}
	this.sleeve_lingings=function(key){
		var sleeve={
			"single_button_cut_angle":"单扣截角",
			"single_button_rand_angle":"单扣圆角",
			"single_button_straight_angle":"单扣直角",
			"dou_cut_angle":"双扣截角",
			"dou_straight_angle":"双扣圆角",
			"dou_straight_straight_angle":"双扣直角",
			"french_cut_angle":"法式截角",
			"french_round_angle":"法式圆角",
			"french_straight_angle":"法式直角"
		};
		return sleeve[key];
	}
	this.procedure=function(key){
		var proce={
			"1":"变版","2":"陪衬","3":"裁剪","4":"袖叉","5":"领袖","6":"拼接"
		};
		return proce[key];
	}
	this.product_status=function(key){
		var order={"0":"下架","1":"上架"};
		return order[key];
	}
	this.easy_care=function(key){
		var order={"0":"否","1":"是"};
		return order[key];
	}
	this.thickness=function(key){
		var order={"0":"薄","1":"厚","2":"中"};
		return order[key];
	}
	/*领形*/
	this.collar_type=function(key){
		var order={"1":"标准领","2":"八字领","3":"一字领","4":"领尖扣领","5":"小方领","6":"圆领","7":"礼服领","8":"立领","9":"暗扣领"};
		return order[key];
	}
	/*袖形*/
	
	this.sleeve_linging=function(key){
		var order={"1":"单扣截角","2":"单扣圆角","3":"单扣直角","4":"双扣截角","5":"双扣圆角","6":"双扣直角","7":"法式截角","8":"法式圆角","9":"法式直角"};
		return order[key];
	}
	/*门襟*/
	
	this.placket=function(key){
		var order={"1":"明门襟","2":"平门襟","3":"暗门襟"};
		return order[key];
	}
	/*系列*/
	 
	this.style=function(key){
		var order={"1":"白色","2":"蓝色","3":"深色","4":"粉色","5":"小众"};
		return order[key];
	}

	//职位
	this.procedures=function(key){
		var procedure={"1":"陪衬","2":"裁剪","3":"开包","4":"绣字","5":"钉扣","6":"检验","7":"出货"};
		return procedure[key];
	}
	this.paytypetinyint=function(key){
		pays={"1":"线下","2":"微信","3":"支付宝","4":"系统更改","5":"银行对公"};
		return pays[key];
	}

}
