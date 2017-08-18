//自写插件，有效提高写代码的效率，by史如川
;(function($){
	$.extend({
		//随机数
		suijishu:function(min,max){
			return parseInt(Math.random()*(max-min+1)+min);
		}
	})
	$.fn.extend({
		//随机颜色
		suijiyanse:function(){
			var r=parseInt(Math.random()*256);
			var g=parseInt(Math.random()*256);
			var b=parseInt(Math.random()*256);
			$(this).css("background","rgb("+r+","+g+","+b+")");
		},
		//拖拽
		tuozhuai:function(){
			$(this).css("position","absolute");
			$(this).on("mousedown",function(e){
				var LEET = e.offsetX;
				var TOP = e.offsetY;
				var _this=$(this);
				$(window).on("mousemove",function(e){
					_this.css({left:e.pageX - LEET + "px",top:e.pageY - TOP + "px"})
				});
				$(window).on("mouseup",function(){
					$(window).off("mousemove");
				});
			});
		},
		//全选
		quanxuan:function(){
			$(this).on("click",function(){
				//将第一个复选框的状态赋值给其他复选框
				$(":checkbox").prop("checked",$(this).prop("checked"));
			});
		},
		//二级联动，需要定义一个dierji的二级数组
		erjiliandong:function(){
      		var a=$("select option:checked").index()-1;
     		 $("select:eq(1)")[0].length=1;
      		var xb=dierji[a];
     		 $("select:eq(1)").empty();
      		for(var i=0;i<xb.length;i++){
        	var opt=new Option(xb[i],xb[i]);
         	 $("select:eq(1)").append(opt);
     		 }
		},
		//魔改版二级联动，需要定义一个dierji的二级数组
		ulerjiliandong:function(){
      		var a=Number($(this).index());
     		 $("ul:eq(1)").empty();
      		var xb=dierji[a];
      		 $("ul:eq(1)").nextAll().remove();
      		for(var i=0;i<xb.length;i++){
        	var opt=$("<li>"+xb[i]+"</li>");
         	 $("ul:eq(1)").append(opt);
     		 }
		},
		//反全选,给全部checkbox绑定一个点击事件
		fanquanxuan:function(){
			$("input:checkbox:eq(0)").prop("checked",true);
			$("input:checkbox").each(function(){
				if($(this).prop("checked") == false){
					$("input:checkbox:eq(0)").prop("checked",false);
					return;
				}
			})
		},
		//购物车总价格计算，设置总价格class为zjg，单个总价为class：xiaoji
		zongjiage:function(){
			//计算总价格
			function zjg(){
				var i=0;
				$(":checked").parent().nextAll().find(".xiaoji").each(function(){
					i+=Number($(this).text());
				})
				$(".zjg").text(i);
			}
		},
		//记录编号,需要设置一个Class名为bianhao
		bianhao:function(){
			$(".bianhao").each(function(p){
				$(this).text(p+1)
			})
		},
		//轮播图插件，较为复杂请按说明来写，请看完全部注释
		lunbotu:function(){
			//利用ul无序列表来做id：lunbo
			var i=0;
			$(".lb>li").fadeOut(0);
			$(".lb>li").eq(i).fadeIn(0);
			var timer = setInterval(change,2000);
			function change(){
				i++;
				if(i>=$(".lb>li").length){
					i=0;
				}
				$(".lb>li").stop(true,true).fadeOut(400);
				$(".lb>li").stop(true,true).eq(i).fadeIn(400);
				BallBg();
			}
			$(".lb").hover(function(){
				clearInterval(timer); 
			},function(){
				timer = setInterval(change,2000);
			});
			//控制轮播的圆点，利用ol有序列表来做圆点
			function BallBg(){
				$("ol>li").css("background","none");
				$("ol>li").eq(i).css("background","red");
			}
			BallBg();
			$("ol>li").on("click",function(){
				i = $(this).index()-1; 
				change();
			});
			//下一张，利用任意东西做，class=xyz
			$(".xyz").on("click",function(){
				change();
			});
			//上一张，利用任意东西做，class=syz
			$(".syz").on("click",function(){
				i-=2;
				if(i<-2){
					i=parseInt($("ul>li").length-1);
					i-=2;
				}
				change();
			});
		},
		//侧边选项卡插件，请看说明来写
		cebianxuanxiangka:function(){
			//设置最外层的div的id为cb,里面需要隐藏的div的id为cb1
			$("#cb1").css({height:innerHeight+"px"});
			$(this).hover(function(){
				$("#cb1").stop(true).animate({width:"20%"},300);
				$(document.body).css({background:"#999999"})
			},function(){
				$("#cb1").stop(true).animate({width:"0%"},300);
				$(document.body).css({background:"#FFFFFF"})
			})
		},
		//购物车专用加减计算插件,设定加为class=jia,减为class=jian,设单价信息为class=jg
								//设个数为class=gs,写作格式为：价格——减——文本框——加——小计
		gouwuchejiajian:function(){
			//数量加
			$(".jia").on("click",function(){
				$(this).prev().val(Number($(this).prev().val())+1);
				 xj() //这是计算总值
			});
			//数量减
			$(".jian").on("click",function(){
				if($(this).next().val()>0){	
					$(this).next().val(Number($(this).next().val())-1);
				}
				panduan()
				 xj() //这是计算总值
			});
			//小计
			function xj(){
				$(".xiaoji").each(function(){
					//小计 = 数量*单价
					$(this).text($(this).parent().find(".gs").val()*$(this).prevAll(".jg").text());
				});
			}
			function panduan(){
				if($(".gs").val()==0){
					alert("商品数量有错");
				}
			}
		}
	})
})(jQuery)
