/*
* @Author: Administrator
* @Date:   2018-01-20 08:57:10
* @Last Modified by:   Administrator
* @Last Modified time: 2018-01-21 13:43:40
*/
//引入远程数据
//关于城市信息
var city;
var tianqi;
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		city=obj.data;
		console.log(city);
	}
})
//获取天气信息
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		tianqi=obj.data;
		console.log(tianqi);
	}
})
//页面加载函数
window.onload=function(){
	// 加载数据
	update();
	// 页面交互
	var pos=document.getElementsByClassName("pos")[0];
	var citybox=document.getElementsByClassName("city")[0];
	// 点击城市出现城市详情页
	pos.onclick=function(){
		citybox.style.display="block";
	}
	// 点击城市详情，跳转首页，出现该城市的天气情况
	var BOX=$(".city .citys .con .box");
	for(let i in BOX){
		BOX[i].onclick=function(){
			var chengshi=this.innerHTML;
			// 调用AJAX函数
			AJAX(chengshi);
		}
	}
	
	// 搜索部分
	var searchbox=document.getElementsByClassName("searchbox")[0];
	var button=document.getElementsByClassName("button")[0];
	searchbox.onfocus=function(){
		button.innerHTML="确认";
	}

		button.onclick=function(){
		var neirong=button.innerHTML;
		if(neirong=="取消"){
			var city3=document.getElementsByClassName("city")[0];
			city3.style.display="none";
		}else{
			var text=searchbox.value;

			for(var i in city){
				if(i==city){
					AJAX(city);
					return;
				}else{

				}
				for(var j in city[i]){
					if(text==j){
						AJAX(text);
						return;
					}
				}
			}
			alert("没有此城市的天气情况");
		}
	}

}
function AJAX(str){
	$.ajax({
	url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		tianqi=obj.data;
		update();
		var city2=$(".city")[0];
		city2.style.display="none";
	}
	})
}
//获取数据函数
function update(){
	//家在城市名称
	var pos=document.getElementsByClassName("pos")[0];
	console.log(pos);
	pos.innerHTML=tianqi.city;
	//加载空气质量
	var quality_level=document.getElementsByTagName("h5")[0];
	quality_level.innerHTML=tianqi.weather.quality_level;
	//加载当前温度
	var current_temperature=document.getElementsByClassName("title1")[0];
	current_temperature.innerHTML=tianqi.weather.current_temperature+"°";
	//加载当前天气状况
	var current_condition=document.getElementsByClassName("title2")[0];
	current_condition.innerHTML=tianqi.weather.current_condition;
	//加载当前风向
	var wind_direction=document.getElementsByClassName("wind_der")[0];
	wind_direction.innerHTML=tianqi.weather.wind_direction;
	//当前风等级
	var wind_level=document.getElementsByClassName("wet")[0];
	wind_level.innerHTML=tianqi.weather.wind_level+"级";
	//今天的最高温度
	var dat_high_temperature=document.getElementsByClassName("heigher")[0];
	dat_high_temperature.innerHTML=tianqi.weather.dat_high_temperature+"°";
	//今天的最低温度
	var dat_low_temperature=document.getElementsByClassName("lower")[0];
	dat_low_temperature.innerHTML=tianqi.weather.dat_low_temperature+"°";
	//明天的最高温度
	var tomorrow_high_temperature=document.getElementsByClassName("tomorrow_heigher")[0];
	tomorrow_high_temperature.innerHTML=tianqi.weather.tomorrow_high_temperature+"°";
	//明天的最低温度
	var tomorrow_low_temperature=document.getElementsByClassName("tomorrow_lower")[0];
	tomorrow_low_temperature.innerHTML=tianqi.weather.tomorrow_low_temperature+"°";
	//今天的天气情况图标
	var today_icon=document.getElementsByClassName("conpic")[0];
	console.log(today_icon);
	today_icon.style=`background-image:url("img/${tianqi.weather.dat_weather_icon_id}.png")`;
	//明天的天气情况图标
	var tomorrow_icon=document.getElementsByClassName("tomorrow_pic")[0];
	console.log(tomorrow_icon);
	tomorrow_icon.style=`background-image:url("img/${tianqi.weather.tomorrow_weather_icon_id}.png")`;


	//第三部分开始
	//获取每小时的天气情况
	//var box1=document.createElement("div");
	//box1.classname="box";
	
	
	//var wrap=document.getElementsByClassName("wrap")[0];
	//wrap.appendChild(box1);

	//var time=document.createElement("div");
	//time.className="time";
	//box1.appendChild(time);

	//var icon=document.createElement("div");
	//icon.className="icon";
	//box1.appendChild(icon);

	//var timetem=document.createElement("div");
	//timetem.className="timetem";
	//box1.appendChild("timetem");

	var hourlyarr=tianqi.weather.hourly_forecast;
	var wrap=document.getElementsByClassName("wrap")[0];
	//console.log(hourlyarr);
	for(let i in hourlyarr){
		//创建box
		var box1=document.createElement("div");
		box1.className="box";

		//创建time块
		var time=document.createElement("div");
		//添加类名
		time.className="time";
		//添加到父级元素身上
		box1.appendChild(time);
		//添加内容
		time.innerHTML=hourlyarr[i].hour+":00";
		


		//创建icon（图标）块
		var icon=document.createElement("div");
		//添加类名
		icon.className="icon";
		//添加到父级元素身上
		box1.appendChild(icon);
		//修改样式
		icon.style=`background-image:url("img/${hourlyarr[i].weather_icon_id}.png")`;
		

		//创建timetem块
		var timetem=document.createElement("div");
		//添加类名
		timetem.className="timetem";
		//添加到父级元素身上
		box1.appendChild(timetem);
		//添加内容
		timetem.innerHTML=hourlyarr[i].temperature+"°";
		


		wrap.appendChild(box1);
	}
		// 第三部分结束
		// 第四部分开始
	//  var box2=document.createElement("div");
	//  box3.className="box";


	// var wrap1=document.getElementsByClassName("wrap1")[0];
	// wrap1.appendChild(box3);

	// var day=document.createElement("div");
	// day.className="day"
	// box3.appendChild(day);

	// var con=document.createElement("div");
	// con.className="con"
	// box3.appendChild(con);

	// var conpic=document.createElement("div");
	// conpic.className="conpic"
	// box3.appendChild(conpic);

	// var heigh=document.createElement("div");
	// heigh.className="heigh"
	// box3.appendChild(heigh);

	// var low=document.createElement("div");
	// low.className="low"
	// box3.appendChild(low);

	// var wind=document.createElement("div");
	// wind.className="wind"
	// box3.appendChild(wind);

	// var grade=document.createElement("div");
	// grade.className="grade"
	// box3.appendChild(grade);

	var forecastarry=tianqi.weather.forecast_list;
	var wrap1=document.getElementsByClassName("wrap1")[0];
	for(let i in forecastarry){
		var box3=document.createElement("div");
		box3.className="box"; 

		var day=document.createElement("div");
		day.className="day"
		box3.appendChild(day);
		day.innerHTML=forecastarry[i].date;

		var con=document.createElement("div");
		con.className="con"
		box3.appendChild(con);
		con.innerHTML=forecastarry[i].condition;

		var conpic=document.createElement("div");
		conpic.className="conpic"
		box3.appendChild(conpic);
		conpic.style=`background-image:url("img/${forecastarry[i].weather_icon_id}.png")`;

		var heigh=document.createElement("div");
		heigh.className="heigh"
		box3.appendChild(heigh);
		heigh.innerHTML=forecastarry[i].high_temperature+"°";

		var low=document.createElement("div");
		low.className="low"
		box3.appendChild(low);
		low.innerHTML=forecastarry[i].low_temperature+"°";

		var wind=document.createElement("div");
		wind.className="wind"
		box3.appendChild(wind);
		wind.innerHTML=forecastarry[i].wind_direction;

		var grade=document.createElement("div");
		grade.className="grade"
		box3.appendChild(grade);
		grade.innerHTML=forecastarry[i].wind_level;

		wrap1.appendChild(box3);
	}
		//关于城市的信息
		var city1=document.getElementsByClassName("city")[0];
		for (let i in city) {
			var citys=document.createElement("div");
			citys.className="citys";


			var title=document.createElement("div");
			title.className="title";
			title.innerHTML=i;
			citys.appendChild(title);

			var con=document.createElement("div");
			con.className="con";

			for(let j in city[i]){
				var box=document.createElement("div");
				box.className="box";
				box.innerHTML=j;
				con.appendChild(box);
				
			}
				citys.appendChild(con);
				city1.appendChild(citys);
			
		}

	}