$(function(){
	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 0,
        centeredSlides: true,
        autoplay: 6000,
        speed:1500,
        loop:true,
        loopedSlides:10,
        autoplayDisableOnInteraction: false
    });
});
//瀑布流初始与封装
;(function ($, window, document, undefined) {
    var pluginName = 'pinterest_grid',
        defaults = {
            padding_x: 10,
            padding_y: 10,
            no_columns: 3,
            margin_bottom: 50,
            single_column_breakpoint: 700
        },
        columns,
        $article,
        article_width;

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype.init = function () {
        var self = this,
            resize_finish;

        $(window).resize(function() {
            clearTimeout(resize_finish);
            resize_finish = setTimeout( function () {
                self.make_layout_change(self);
            }, 11);
        });

        self.make_layout_change(self);

        setTimeout(function() {
            $(window).resize();
        }, 500);
    };

    Plugin.prototype.calculate = function (single_column_mode) {
        var self = this,
            tallest = 0,
            row = 0,
            $container = $(this.element),
            container_width = $container.width();
            $article = $(this.element).children();

        if(single_column_mode === true) {
            article_width = $container.width() - self.options.padding_x;
        } else {
            article_width = ($container.width() - self.options.padding_x * self.options.no_columns) / self.options.no_columns;
        }

        $article.each(function() {
            $(this).css('width', article_width);
        });

        columns = self.options.no_columns;

        $article.each(function(index) {
            var current_column,
                left_out = 0,
                top = 0,
                $this = $(this),
                prevAll = $this.prevAll(),
                tallest = 0;

            if(single_column_mode === false) {
                current_column = (index % columns);
            } else {
                current_column = 0;
            }

            for(var t = 0; t < columns; t++) {
                $this.removeClass('c'+t);
            }

            if(index % columns === 0) {
                row++;
            }

            $this.addClass('c' + current_column);
            $this.addClass('r' + row);

            prevAll.each(function(index) {
                if($(this).hasClass('c' + current_column)) {
                    top += $(this).outerHeight() + self.options.padding_y;
                }
            });

            if(single_column_mode === true) {
                left_out = 0;
            } else {
                left_out = (index % columns) * (article_width + self.options.padding_x);
            }

            $this.css({
                'left': left_out,
                'top' : top
            });
        });

        this.tallest($container);
        $(window).resize();
    };

    Plugin.prototype.tallest = function (_container) {
        var column_heights = [],
            largest = 0;

        for(var z = 0; z < columns; z++) {
            var temp_height = 0;
            _container.find('.c'+z).each(function() {
                temp_height += $(this).outerHeight();
            });
            column_heights[z] = temp_height;
        }

        largest = Math.max.apply(Math, column_heights);
        _container.css('height', largest + (this.options.padding_y + this.options.margin_bottom));
    };

    Plugin.prototype.make_layout_change = function (_self) {
        if($(window).width() < _self.options.single_column_breakpoint) {
            _self.calculate(true);
        } else {
            _self.calculate(false);
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin(this, options));
            }
        });
    }

})(jQuery, window, document);
//瀑布流方法调用
$(function(){
			$("#gallery-wrapper").pinterest_grid({
				no_columns: 4,
                padding_x: 10,
                padding_y: 10,
                margin_bottom: 50,
                single_column_breakpoint: 700
			});
			
		});
//弹出窗口
$(function(){
	$(".black-close").click(function(){
		$(".alertwindows").fadeOut(500);
		})
	$(".viewmore span").click(function(){
		$(".alertwindows").fadeIn(500);
		})
	//视屏弹出窗口
	$(".icon-center3").click(function(){
		$(".alertwindowsvideo").fadeIn(500);
		});
		
	$(".videoName span").click(function(){
		$(".alertwindowsvideo").fadeOut(500);
		});
		
	$(".learnwhat h3").click(function(){
		$(".alertwindowsvideo").fadeIn(500);
		});
		
	$(".videoName span").click(function(){
		$(".alertwindowsvideo").fadeOut(500);
		});
	
	learnwhat
	})
//
$(function(){
	$(".info-icon").css("cursor","pointer");
	if($(window).width()>768){
	$(".info-icon").mouseenter(function(){
		$(this).stop().animate({marginTop:5},"200");
		})
	$(".info-icon").mouseleave(function(){
		$(this).stop().animate({marginTop:30},"200");
			})
		}
	})
//Shover
$(function(){
		function sHover(itemClass,introClass){
		var _this=this;
		//获得所有hoverItem
		var sItemArr=_this.getByClass(document,itemClass);

		for (var i = 0; i < sItemArr.length; i++) {
			//获得当前Item下的Intro
			var thisItem=sItemArr[i];
			var sIntro=_this.getByClass(thisItem,introClass)[0];
			//获取宽度高度
 			thisItem.size={
 				width:_this.getStyle(thisItem,'width'),
 				height:_this.getStyle(thisItem,'height')
 			};
			// 设置默认的样式
			thisItem.style.position='relative';
			thisItem.style.overflow='hidden';
			sIntro.style.position='absolute';
			sIntro.style.width=thisItem.size.width+"px";
			sIntro.style.height=thisItem.size.height-80+"px";
			sIntro.style.top=thisItem.size.height+"px";
			sIntro.style.left="0px";
			sIntro.style.zIndex="99";
			sIntro.style.opacity="1";

			//默认参数设置
			this.slideSpeed=5;
			this.opacityChange=false;
			this.opacity=100;
 			
			//绑定事件
			function eventRegister(item,intro){
				_this.myAddEvent(item,'mouseover',function(ev){
					_this.hoverIn(ev,item,intro);
				});
				_this.myAddEvent(sItemArr[i],'mouseout',function(ev){
					_this.hoverOut(ev,item,intro);
				});
			}
			eventRegister(thisItem,sIntro);
		}
	}

	sHover.prototype.set=function(json){
		for( i in json){
			this[i]=json[i];
		}
	}
	sHover.prototype.trigger=function(item,dir,ev){
		try{
			if(item.contains(ev.relatedTarget)){
				return false;
			}else if(!ev.relatedTarget){
				throw new error();
			}
		}catch(exception){
			if(dir=='in'){
				if(item.contains(ev.fromElement)){
					return false;
				}
			}else if(dir=='out'){
				if(item.contains(ev.toElement)){
					return false;
				}
			}
		}
		return true;
	}
	sHover.prototype.hoverIn=function(ev,item,intro){
		var e=ev||event;
		if(this.trigger(item,'in',e)){
			var dir=this.getDir(e,item);
			if(dir==0||dir==2){
				if(dir==0){
					intro.style.top=-item.size.height+'px';
				}else{
					intro.style.top=item.size.height+'px';
				}
				intro.style.left='0px';
				this.startMove(intro,{'top':0,'left':0,'opacity':this.opacity});
			}else{
				if(dir==1){
					intro.style.left=item.size.width+'px';
				}else{
					intro.style.left=-item.size.width+'px';
				}
				intro.style.top='0px';
				this.startMove(intro,{'left':0,'opacity':this.opacity});
			}
		}	
	}

	sHover.prototype.hoverOut=function(ev,item,intro){
		var e=ev||event;
		var opacity=100;
		if(this.trigger(item,'out',e)){
			var dir=this.getDir(e,item);
			if(this.opacityChange){opacity=0;}
			switch(dir){
				case 0:
					this.startMove(intro,{'top':-item.size.height,'left':0,'opacity':opacity});
					break;
				case 2:
					this.startMove(intro,{'top':item.size.height,'left':0,'opacity':opacity});
					break;
				case 1:
					this.startMove(intro,{'left':item.size.width,'top':0,'opacity':opacity});
					break;
				case 3:
					this.startMove(intro,{'left':-item.size.width,'top':0,'opacity':opacity});
					break;
			}
		}	
	}

	 sHover.prototype.startMove=function(obj,json,fn){
		var nowAttr;
		var speed;
		var k=(11-this.slideSpeed)>0?(11-this.slideSpeed):1;
		var delay=30;
		var _this=this;
		clearInterval(obj.moveTimer);
		obj.moveTimer=setInterval(function(){
			var stop=true;
			for(var attr in json){
				var gotStyle=_this.getStyle(obj,attr);
				var target=json[attr];
				if(attr=="opacity"){
					nowAttr=parseInt(parseFloat(gotStyle)*100, 10);
				}else{
					nowAttr=parseInt(gotStyle, 10);
				}

				if(nowAttr!=target){
					stop=false;
				}

				if(stop){
					clearInterval(obj.moveTimer);
					fn&&fn(); 
				}else{
					speed=(target-nowAttr)/k;
					speed=target>nowAttr?Math.ceil(speed):Math.floor(speed);

					if(attr=="opacity"){
						obj.style[attr]=(nowAttr+speed)/100;
						obj.style.filter='alpha(opacity='+(nowAttr+speed)+')';
					}else{
						obj.style[attr]=(nowAttr+speed)+"px";
					}
				}
			}	
		}, delay);
	}

	 sHover.prototype.myAddEvent=function(obj,evName,fn){
		if (obj.attachEvent){//IE
			obj.attachEvent('on'+evName,function(){
				fn.call(this);//避免this被修改
			});
		}else{
			obj.addEventListener(evName, fn , false);
		}
	}
	sHover.prototype.getByClass=function(oParent,className){
		var aResult=[];
		var arr=oParent.getElementsByTagName('*');
		var re=new RegExp('\\b'+className+'\\b',i);

		for (var i = 0; i < arr.length; i++) {
			if(re.test(arr[i].className)){
				aResult.push(arr[i]);
			}
		};
		return aResult;
	}
	sHover.prototype.getStyle=function(obj,attr){
		var value;
		if(obj.currentStyle){//IE
			value = obj.currentStyle[attr];
		}else{
			value = getComputedStyle(obj,false)[attr];
		}
		if(attr!='opacity'){
			value=parseInt(value,10);
		}
		if(isNaN(value)){
			value=obj['offset'+attr.charAt(0).toUpperCase()+attr.substring(1)];
		}
		return value;
	}
	sHover.prototype.getScroll=function(){
		var scroll={
			top :  document.body.scrollTop||document.documentElement.scrollTop,
			left : document.body.scrollLeft||document.documentElement.scrollLeft
		}
		return scroll
	}
	sHover.prototype.getPos=function(obj) {
		var pos = {left:0, top:0};
		while (obj) {
			pos.left += obj.offsetLeft;
			pos.top += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return pos;
	}
	sHover.prototype.getDir=function(e,item){
		var e=e||event;
		var w = this.getStyle(item,'width'),
	        h = this.getStyle(item,'height'),
	        x = ( e.clientX - this.getPos(item).left+this.getScroll().left - ( w / 2 ) ) * ( w > h ? ( h / w ) : 1 ),
	        y = (e.clientY - this.getPos(item).top+this.getScroll().top - (h / 2)) * (h > w ? (w / h) : 1),
	    direction = Math.round( ( ( ( Math.atan2( y, x ) * ( 180 / Math.PI ) ) + 180 ) / 90) + 3 ) % 4,
	    eventType = e.type;
	  	return direction;
	};
	
	var move=new sHover("move","sIntro");
	
	move.set({
	speed:7,						
	opacityChange:true
			});
	
	})
//视频播放器
$(function() {
	var playVideo = $('video');
	var playPause = $('.playPause'); //播放和暂停
	var currentTime = $('.timebar .currentTime'); //当前时间
	var duration = $('.timebar .duration'); //总时间
	var progress = $('.timebar .progress-bar'); //进度条
	var volumebar = $('.volumeBar .volumewrap').find('.progress-bar');
	playVideo[0].volume = 0.4; //初始化音量
	playPause.on('click', function() {
		playControl();
	});
	$('.playContent').on('click', function() {
		playControl();
	}).hover(function() {
		$('.turnoff').stop().animate({
			'right': 0
		}, 500);
	}, function() {
		$('.turnoff').stop().animate({
			'right': -40
		}, 500);
	});
	
	$(".videoName span").click(function(){
				playVideo[0].pause();
				$('.playTip').removeClass('glyphicon-pause').addClass('glyphicon-play').fadeIn();
		});
	
	$(document).click(function() {
		$('.volumeBar').hide();
	});
	playVideo.on('loadedmetadata', function() {
		duration.text(formatSeconds(playVideo[0].duration));
	});

	playVideo.on('timeupdate', function() {
		currentTime.text(formatSeconds(playVideo[0].currentTime));
		progress.css('width', 100 * playVideo[0].currentTime / playVideo[0].duration + '%');
	});
	playVideo.on('ended', function() {
		$('.playTip').removeClass('glyphicon-pause').addClass('glyphicon-play').fadeIn();
		playPause.toggleClass('playIcon');
	});
	
	$(window).keyup(function(event){
		event = event || window.event;
			if(event.keyCode == 32)playControl();
			if(event.keyCode == 27){
			$('.fullScreen').removeClass('cancleScreen');
			$('#willesPlay .playControll').css({
				'bottom': -48
			}).removeClass('fullControll');
			};
		event.preventDefault();
	});
	//全屏
	$('.fullScreen').on('click', function() {
		if ($(this).hasClass('cancleScreen')) {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozExitFullScreen) {
				document.mozExitFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
			$(this).removeClass('cancleScreen');
			$('#willesPlay .playControll').css({
				'bottom': -48
			}).removeClass('fullControll');
		} else {
			if (playVideo[0].requestFullscreen) {
				playVideo[0].requestFullscreen();
			} else if (playVideo[0].mozRequestFullScreen) {
				playVideo[0].mozRequestFullScreen();
			} else if (playVideo[0].webkitRequestFullscreen) {
				playVideo[0].webkitRequestFullscreen();
			} else if (playVideo[0].msRequestFullscreen) {
				playVideo[0].msRequestFullscreen();
			}
			$(this).addClass('cancleScreen');
			$('#willesPlay .playControll').css({
				'left': 0,
				'bottom':0
			}).addClass('fullControll');
		}
		return false;
	});
	//音量
	$('.volume').on('click', function(e) {
		e = e || window.event;
		$('.volumeBar').toggle();
		e.stopPropagation();
	});
	$('.volumeBar').on('click mousewheel DOMMouseScroll', function(e) {
		e = e || window.event;
		volumeControl(e);
		e.stopPropagation();
		return false;
	});
	$('.timebar .progress').mousedown(function(e) {
		e = e || window.event;
		updatebar(e.pageX);
	});
	var updatebar = function(x) {
		var maxduration = playVideo[0].duration; //Video 
		var positions = x - progress.offset().left; //Click pos
		var percentage = 100 * positions / $('.timebar .progress').width();
		//Check within range
		if (percentage > 100) {
			percentage = 100;
		}
		if (percentage < 0) {
			percentage = 0;
		}

		//Update progress bar and video currenttime
		progress.css('width', percentage + '%');
		playVideo[0].currentTime = maxduration * percentage / 100;
	};
	//音量控制
	function volumeControl(e) {
		e = e || window.event;
		var eventype = e.type;
		var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));
		var positions = 0;
		var percentage = 0;
		if (eventype == "click") {
			positions = volumebar.offset().top - e.pageY;
			percentage = 100 * (positions + volumebar.height()) / $('.volumeBar .volumewrap').height();
		} else if (eventype == "mousewheel" || eventype == "DOMMouseScroll") {
			percentage = 100 * (volumebar.height() + delta) / $('.volumeBar .volumewrap').height();
		}
		if (percentage < 0) {
			percentage = 0;
			$('.otherControl .volume').attr('class', 'volume glyphicon glyphicon-volume-off');
		}
		if (percentage > 50) {
			$('.otherControl .volume').attr('class', 'volume glyphicon glyphicon-volume-up');
		}
		if (percentage > 0 && percentage <= 50) {
			$('.otherControl .volume').attr('class', 'volume glyphicon glyphicon-volume-down');
		}
		if (percentage >= 100) {
			percentage = 100;
		}
		$('.volumewrap .progress-bar').css('height', percentage + '%');
		playVideo[0].volume = percentage / 100;
		e.stopPropagation();
		e.preventDefault();
	}

	function playControl() {
			playPause.toggleClass('playIcon');
			if (playVideo[0].paused) {
				playVideo[0].play();
				$('.playTip').removeClass('glyphicon-play').addClass('glyphicon-pause').fadeOut();
			} else {
				playVideo[0].pause();
				$('.playTip').removeClass('glyphicon-pause').addClass('glyphicon-play').fadeIn();
			}
		}
		//关灯
	$('.btnLight').click(function(e) {
		e = e || window.event;
		if ($(this).hasClass('on')) {
			$(this).removeClass('on');
			$('body').append('<div class="overlay"></div>');
			$('.overlay').css({
				'position': 'absolute',
				'width': 100 + '%',
				'height': $(document).height(),
				'background': '#000',
				'opacity': 1,
				'top': 0,
				'left': 0,
				'z-index': 999
			});
			$('.playContent').css({
				'z-index': 1000
			});
			$('.playControll').css({
				'bottom': -48,
				'z-index': 1000
			});

			$('.playContent').hover(function() {
				$('.playControll').stop().animate({
					'height': 48,
				},500);
			}, function() {
				setTimeout(function() {
					$('.playControll').stop().animate({
						'height': 0,
					}, 500);
				}, 2000)
			});
		} else {
			$(this).addClass('on');
			$('.overlay').remove();
			$('.playControll').css({
				'bottom': 0,
			});
		}
		e.stopPropagation();
		e.preventDefault();
	});
});

//秒转时间
function formatSeconds(value) {
	value = parseInt(value);
	var time;
	if (value > -1) {
		hour = Math.floor(value / 3600);
		min = Math.floor(value / 60) % 60;
		sec = value % 60;
		day = parseInt(hour / 24);
		if (day > 0) {
			hour = hour - 24 * day;
			time = day + "day " + hour + ":";
		} else time = hour + ":";
		if (min < 10) {
			time += "0";
		}
		time += min + ":";
		if (sec < 10) {
			time += "0";
		}
		time += sec;
	}
	return time;
}
//滚动监听
$(function(){
	
	'use strict';
    var lastId,
        topMenu = $(".computer, .mobile"),
        topMenuHeight = topMenu.outerHeight()+100,
        menuItems = topMenu.find("a"),
        scrollItems = menuItems.map(function(){
          var item = $($(this).attr("href"));
          if (item.length) { return item; }
        });
    menuItems.click(function(e){
      var href = $(this).attr("href"),
          offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
      $('html, body').stop().animate({ 
          scrollTop: offsetTop
      }, 300);
      e.preventDefault();
    });
    $(window).scroll(function(){
       var fromTop = $(this).scrollTop()+topMenuHeight;
       var cur = scrollItems.map(function(){
         if ($(this).offset().top < fromTop)
           return this;
       });
       cur = cur[cur.length-1];
       var id = cur && cur.length ? cur[0].id : "";
       
       if (lastId !== id) {
           lastId = id;
           menuItems
             .parent().removeClass("computerabackground")
             .end().filter("[href=#"+id+"]").parent().addClass("computerabackground");//滚动监听自动改变点击文字的颜色
       }                   
    });
	
	$('.right-icon').click(function(){
        $('.mobile li').slideToggle();
    });
	//导航条自动固定
/*$(window).scroll(function(){
         $('.main-header').toggleClass('scrolled', $(this).scrollTop() > 1);
     });*/


//回顶部
 /*   $('a[href="#top"]').click(function(){
        $('html, body').animate({scrollTop: 0}, 'slow');
        return false;
    });

//小屏是导航条下拉
  


    /************** LightBox *********************/
   /*   $(function(){
        $('[data-rel="lightbox"]').lightbox();
      });
*/

});
//ajax和正则表达式
$(function(){
	function createxhr(){
		if(window.XMLHttpRequest){
			var xhr=null;
			xhr=new XMLHttpRequest;
			return xhr;
		}else{
			xhr=new ActiveXObject("Microsoft.XMLhttp")
			};
	};
	function getxhr(){
		var xhr= createxhr();
		xhr.open("post","message.php",true);
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.onreadystatechange=function(){
			if(xhr.readyState == 4 && xhr.status == 200){
			var text=xhr.responseText;
			if(text=="1"){
				alert("发送成功！");
				};
					};
						};
		var name= $(".name").val();
		var info= $(".telornumber").val();
		var text= $(".text").val();
			if(name==""){
				alert("名称不能为空！！");
				}else if(info==""){
					alert("邮箱或手机号不能为空！！")
					}else if(text==""){
						alert("输入信息不能为空！！")
						}else{
					xhr.send("name="+name+"&info="+info+"&text="+text);
					};
				};
	var clic=true;
	$(".submitbutton").click(function(){
		if(clic){
			getxhr();
				clic=false;
					}else{
					alert("请勿重复提交，刷新后重试。")
				};
		});
	});
//弹出大图片
$(function(){
	       $(".white-panel").click(function(){
			   var imagesnumber=$(this).index("#gallery-wrapper .white-panel");
			   $(".alertimage").fadeIn(200);
			   $(".image-alert").append("<img src=img/"+imagesnumber+".jpg>");
			   $(".image-alert img").addClass("img-responsive");
			   checkCookie();
			   //$(".image-alert img").css({width:"100%"});
			   }); 
			$(".alertimage").click(function(){
			   $(this).fadeOut(200);
			   	$(".image-alert").empty();
				});
//				
			$(".myportfolio button").click(function(){
			   var imagesnumber=$(this).index(".myportfolio button");
			   $(".alertimage").fadeIn(200);
			   $(".image-alert").append("<img src=bigimages/bigbuttonimg"+imagesnumber+".jpg>");
			   $(".image-alert img").addClass("img-responsive");
			   checkCookie();
			   //$(".image-alert img").css({width:"100%"});
			   }); 
			$(".alertimage").click(function(){
			   $(this).fadeOut(200);
			   	$(".image-alert").empty();
				});
//弹出提示
			$(".tips img").click(function(){
				$(".tips").hide(200);
				//设置cookies
				});
//封装函数，是否显示提示			
	/*function show(){
		if(0){
			  //$(".tips").css("display","none");
			  alert(1)
				}else{
					  $(".tips").show();
					};
		};		*/
//cookies  存在问题还需改进
var change=true;
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
		return ""
		}
		
		function setCookie(c_name,value,expiredays)
		{
		var exdate=new Date()
		exdate.setDate(exdate.getDate()+expiredays)
		document.cookie=c_name+ "=" +escape(value)+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
		}
		
		function checkCookie()
		{
		username=getCookie('username')
		if (username=='yes'||change==false)
		  {
			  $(".tips").css("display","none")
			  }
		else 
		  {
			setCookie('username','yes',60)
			$(".tips").show()
			change=false;
	  }
}
//cookies end

	});
	