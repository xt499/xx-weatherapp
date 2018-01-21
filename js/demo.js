/*
* @Author: Administrator
* @Date:   2018-01-19 16:05:41
* @Last Modified by:   Administrator
* @Last Modified time: 2018-01-20 15:58:38
*/
//var aa="123";
//console.log(aa);
var button=document.getElementsByClassName("button");
console.log(button);
//当页面加载的时候
window.onload=function(){
	//当点击按钮时消失
	var botton=document.getElementsByClassName("button");
	console.log("button");
	button[0].onclick=function(){
		//alert(这是一个按钮)；
		var city=document.getElementsByClassName("city");
		console.log(city);
		city[0].style.display="none";
	}
	var pos=document.getElementsByClassName("pos");
	pos[0].onclick=function(){
		var city=document.getElementsByClassName("city");
		console.log(city);
		city[0].style.display="block";
	}
}
//引入远程数据
//关于城市的信息s
// $.ajax({
// 	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
// 	dataType:"jsonp",
// 	method:"get",
// 	success:function(obj){
// 		var city=obj.data;
// 		console.log(city);
// 	}

// })
// //关于天气的数据
// $.ajax({
// 	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
// 	dataType:"jsonp",
// 	method:"get",
// 	success:function(obj){
// 		var weather=obj.data;
// 		console.log(weather);
// 	}
// })












//js
//当整个页面加载完成时，才可以对元素进行操作
//获取元素 document.getElementsByClassName("")[0]
//添加事件函数
//进行样式的操作
//