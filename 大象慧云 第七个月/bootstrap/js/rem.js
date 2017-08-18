//<meta name="amin" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
window.onload=function(){
	var kuan=375;
	var rem=100;
	remm();
	function remm(){
		var dang=document.documentElement.clientWidth;
		var radio=dang/kuan;
		var size=radio<1?rem*radio:100;
		document.getElementsByTagName("html")[0].style.fontSize=size+"px";
		}
		window.addEventListener("resize",function(){
			setTimeout(rem,200)
		},false)
}