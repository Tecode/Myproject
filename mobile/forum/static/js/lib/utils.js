;(function(factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define(["zepto"], factory);
    } else {
        // 全局模式
        factory(Zepto);
    }
}(function() {
    //ajax加载模版
    var ajaxLoad = function(warp, url,data, fn) {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'html',
            data: data,
            beforeSend: function() {
                toast.loading();
            },
            success: function(result, textStatus, XMLHttpRequest) {
                toast.loading('close');
                $(warp).html(result);
                fn ? fn.call(this, result) : "";
            },
            error:function(result){
                //alert(JSON.stringfly(result));
                fn ? fn.call(this, false) : "";
            },
            complete: function(XMLHttpRequest, textStatus) {
                toast.loading('close');
            }
        });
    };

    //设置标题
    var setTitle = function(title){
        document.title = title;
        var $iframe = $('<iframe src="/favicon.ico" style="visibility: hidden;"></iframe>').on('load', function () {
            setTimeout(function () {
                $iframe.off('load').remove()
            }, 0)
        }).appendTo($(document.body));
    }

    var toast = {
        prompt:function(text){
            text = (text||text=='') ? text : '';
            if(text=='close'){
                $('#toast').remove();
                return;
            }
            if($('#toast').length>0){
                return;
            }
            var _html = '<div id="toast"><div class="weui_mask_transparent"></div><div class="weui_toast"><i class="weui_icon_warn"></i><p class="weui_toast_content">'+ text +'</p></div></div>';
            $(_html).appendTo(document.body);

            setTimeout(function(){
                $('#toast').remove();
            },2000);
            
        },
        tip:function(text,isClose){
            text = (text||text=='') ? text : '已完成';
            if(text=='close'){
                $('#toast').remove();
                return;
            }
            if($('#toast').length>0){
                return;
            }
            var _html = '<div id="toast"><div class="weui_mask_transparent"></div><div class="weui_toast"><i class="weui_icon_toast"></i><p class="weui_toast_content">'+ text +'</p></div></div>';
            $(_html).appendTo(document.body);
            if(!(isClose === false)){
                setTimeout(function(){
                    $('#toast').remove();
                },1000);
            }
        },
        loading:function(text){
            text = (text||text=='') ? text : '加载中';
            if(text=='close'){
                $('#loadingToast').remove();
                return;
            }
            if($('#loadingToast').length>0){
                return;
            }
            var _html = '<div id="loadingToast" class="weui_loading_toast"><div class="weui_mask_transparent"></div><div class="weui_toast"><div class="weui_loading"><div class="weui_loading_leaf weui_loading_leaf_0"></div><div class="weui_loading_leaf weui_loading_leaf_1"></div><div class="weui_loading_leaf weui_loading_leaf_2"></div><div class="weui_loading_leaf weui_loading_leaf_3"></div><div class="weui_loading_leaf weui_loading_leaf_4"></div><div class="weui_loading_leaf weui_loading_leaf_5"></div><div class="weui_loading_leaf weui_loading_leaf_6"></div><div class="weui_loading_leaf weui_loading_leaf_7"></div><div class="weui_loading_leaf weui_loading_leaf_8"></div><div class="weui_loading_leaf weui_loading_leaf_9"></div><div class="weui_loading_leaf weui_loading_leaf_10"></div><div class="weui_loading_leaf weui_loading_leaf_11"></div></div><p class="weui_toast_content">'+ text +'</p></div></div>';
            $(_html).appendTo(document.body);
        },
        listload:function(warp,text){
            text = (text||text=='') ? text : '载入中，请稍后...';
            if(text=='close'){
                $('.listload').remove();
                return;
            }
            if($('.listload').length>0){
                return;
            }
            var _html = '<div class="listload">'+ text +'</div>';
            $(_html).appendTo($(warp));
        },
        dialog:function(title,content,type,fn){
            var _html = '',dialogType = (type ? type : '1');
            if(dialogType=='1'){
                _html = '<div class=weui_dialog_confirm><div class=weui_mask></div><div class=weui_dialog><div class=weui_dialog_hd><strong class=weui_dialog_title>'+ title +'</strong></div><div class=weui_dialog_bd>'+ content +'</div><div class=weui_dialog_ft><a href="javascript:;" class="weui_btn_dialog default weui_btn_dialog_cancel">取消</a><a href="javascript:;" class="weui_btn_dialog primary weui_btn_dialog_query">确定</a></div></div></div>';
            }else if(dialogType=='2'){
                _html = '<div class=weui_dialog_alert><div class=weui_mask></div><div class=weui_dialog><div class=weui_dialog_hd><strong class=weui_dialog_title>'+ title +'</strong></div><div class=weui_dialog_bd>'+ content +'</div><div class=weui_dialog_ft><a href="javascript:;" class="weui_btn_dialog primary weui_btn_dialog_query">确定</a></div></div></div>';
            }
            var dialogObj = $(_html).appendTo(document.body);
            $(dialogObj).find('.weui_btn_dialog_query').bind('click', function(event) {
                $('.weui_dialog_confirm,.weui_dialog_alert').remove();
                fn ? fn.call(this,true) : '';
            });
            $(dialogObj).find('.weui_btn_dialog_cancel').bind('click', function(event) {
                $('.weui_dialog_confirm,.weui_dialog_alert').remove();
                fn ? fn.call(this,false) : '';
            });
        }
    }

    var ajax = function(url,data,fn){
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: data,
            success:function(result){
                fn ? fn.call(this,result) : '';
            },
            error:function(){
                fn ? fn.call(this,false) : '';
            }
        });
        
    }

    //表情
    var emotion = function(text){
        var data = {
            '[微笑]':'<img src="static/style/images/emotion/0.gif" />',
            '[撇嘴]':'<img src="static/style/images/emotion/1.gif" />',
            '[色]':'<img src="static/style/images/emotion/2.gif" />',
            '[发呆]':'<img src="static/style/images/emotion/3.gif" />',
            '[得意]':'<img src="static/style/images/emotion/4.gif" />',
            '[流泪]':'<img src="static/style/images/emotion/5.gif" />',
            '[害羞]':'<img src="static/style/images/emotion/6.gif" />',
            '[闭嘴]':'<img src="static/style/images/emotion/7.gif" />',
            '[睡]':'<img src="static/style/images/emotion/8.gif" />',
            '[大哭]':'<img src="static/style/images/emotion/9.gif" />',
            '[尴尬]':'<img src="static/style/images/emotion/10.gif" />',
            '[发怒]':'<img src="static/style/images/emotion/11.gif" />',
            '[调皮]':'<img src="static/style/images/emotion/12.gif" />',
            '[呲牙]':'<img src="static/style/images/emotion/13.gif" />',
            '[惊讶]':'<img src="static/style/images/emotion/14.gif" />',
            '[难过]':'<img src="static/style/images/emotion/15.gif" />',
            '[酷]':'<img src="static/style/images/emotion/16.gif" />',
            '[冷汗]':'<img src="static/style/images/emotion/17.gif" />',
            '[抓狂]':'<img src="static/style/images/emotion/18.gif" />',
            '[吐]':'<img src="static/style/images/emotion/19.gif" />',
            '[偷笑]':'<img src="static/style/images/emotion/20.gif" />',
            '[可爱]':'<img src="static/style/images/emotion/21.gif" />',
            '[白眼]':'<img src="static/style/images/emotion/22.gif" />',
            '[傲慢]':'<img src="static/style/images/emotion/23.gif" />',
            '[饥饿]':'<img src="static/style/images/emotion/24.gif" />',
            '[困]':'<img src="static/style/images/emotion/25.gif" />',
            '[惊恐]':'<img src="static/style/images/emotion/26.gif" />',
            '[流汗]':'<img src="static/style/images/emotion/27.gif" />',
            '[憨笑]':'<img src="static/style/images/emotion/28.gif" />',
            '[大兵]':'<img src="static/style/images/emotion/29.gif" />',
            '[奋斗]':'<img src="static/style/images/emotion/30.gif" />',
            '[咒骂]':'<img src="static/style/images/emotion/31.gif" />',
            '[疑问]':'<img src="static/style/images/emotion/32.gif" />',
            '[嘘]':'<img src="static/style/images/emotion/33.gif" />',
            '[晕]':'<img src="static/style/images/emotion/34.gif" />',
            '[折磨]':'<img src="static/style/images/emotion/35.gif" />',
            '[衰]':'<img src="static/style/images/emotion/36.gif" />',
            '[骷髅]':'<img src="static/style/images/emotion/37.gif" />',
            '[敲打]':'<img src="static/style/images/emotion/38.gif" />',
            '[再见]':'<img src="static/style/images/emotion/39.gif" />',
            '[擦汗]':'<img src="static/style/images/emotion/40.gif" />',
            '[抠鼻]':'<img src="static/style/images/emotion/41.gif" />',
            '[鼓掌]':'<img src="static/style/images/emotion/42.gif" />',
            '[糗大了]':'<img src="static/style/images/emotion/43.gif" />',
            '[坏笑]':'<img src="static/style/images/emotion/44.gif" />',
            '[左哼哼]':'<img src="static/style/images/emotion/45.gif" />',
            '[右哼哼]':'<img src="static/style/images/emotion/46.gif" />',
            '[哈欠]':'<img src="static/style/images/emotion/47.gif" />',
            '[鄙视]':'<img src="static/style/images/emotion/48.gif" />',
            '[委屈]':'<img src="static/style/images/emotion/49.gif" />',
            '[快哭了]':'<img src="static/style/images/emotion/50.gif" />',
            '[阴险]':'<img src="static/style/images/emotion/51.gif" />',
            '[亲亲]':'<img src="static/style/images/emotion/52.gif" />',
            '[吓]':'<img src="static/style/images/emotion/53.gif" />',
            '[可怜]':'<img src="static/style/images/emotion/54.gif" />',
            '[菜刀]':'<img src="static/style/images/emotion/55.gif" />',
            '[西瓜]':'<img src="static/style/images/emotion/56.gif" />',
            '[啤酒]':'<img src="static/style/images/emotion/57.gif" />',
            '[篮球]':'<img src="static/style/images/emotion/58.gif" />',
            '[乒乓]':'<img src="static/style/images/emotion/59.gif" />',
            '[咖啡]':'<img src="static/style/images/emotion/60.gif" />',
            '[饭]':'<img src="static/style/images/emotion/61.gif" />',
            '[猪头]':'<img src="static/style/images/emotion/62.gif" />',
            '[玫瑰]':'<img src="static/style/images/emotion/63.gif" />',
            '[凋谢]':'<img src="static/style/images/emotion/64.gif" />',
            '[示爱]':'<img src="static/style/images/emotion/65.gif" />',
            '[爱心]':'<img src="static/style/images/emotion/66.gif" />',
            '[心碎]':'<img src="static/style/images/emotion/67.gif" />',
            '[蛋糕]':'<img src="static/style/images/emotion/68.gif" />',
            '[闪电]':'<img src="static/style/images/emotion/69.gif" />',
            '[炸弹]':'<img src="static/style/images/emotion/70.gif" />',
            '[刀]':'<img src="static/style/images/emotion/71.gif" />',
            '[足球]':'<img src="static/style/images/emotion/72.gif" />',
            '[瓢虫]':'<img src="static/style/images/emotion/73.gif" />',
            '[便便]':'<img src="static/style/images/emotion/74.gif" />',
            '[月亮]':'<img src="static/style/images/emotion/75.gif" />',
            '[太阳]':'<img src="static/style/images/emotion/76.gif" />',
            '[礼物]':'<img src="static/style/images/emotion/77.gif" />',
            '[拥抱]':'<img src="static/style/images/emotion/78.gif" />',
            '[强]':'<img src="static/style/images/emotion/79.gif" />',
            '[弱]':'<img src="static/style/images/emotion/80.gif" />',
            '[握手]':'<img src="static/style/images/emotion/81.gif" />',
            '[胜利]':'<img src="static/style/images/emotion/82.gif" />',
            '[抱拳]':'<img src="static/style/images/emotion/83.gif" />',
            '[勾引]':'<img src="static/style/images/emotion/84.gif" />',
            '[拳头]':'<img src="static/style/images/emotion/85.gif" />',
            '[差劲]':'<img src="static/style/images/emotion/86.gif" />',
            '[爱你]':'<img src="static/style/images/emotion/87.gif" />',
            '[NO]':'<img src="static/style/images/emotion/88.gif" />',
            '[OK]':'<img src="static/style/images/emotion/89.gif" />',
            '[爱情]':'<img src="static/style/images/emotion/90.gif" />',
            '[飞吻]':'<img src="static/style/images/emotion/91.gif" />',
            '[跳跳]':'<img src="static/style/images/emotion/92.gif" />',
            '[发抖]':'<img src="static/style/images/emotion/93.gif" />',
            '[怄火]':'<img src="static/style/images/emotion/94.gif" />',
            '[转圈]':'<img src="static/style/images/emotion/95.gif" />',
            '[磕头]':'<img src="static/style/images/emotion/96.gif" />',
            '[回头]':'<img src="static/style/images/emotion/97.gif" />',
            '[跳绳]':'<img src="static/style/images/emotion/98.gif" />',
            '[挥手]':'<img src="static/style/images/emotion/99.gif" />'
        }
        var reg = /\[.+?\]/g;
        text = text.replace(reg,function(a,b){ 
            return data[a]; 
        });
        return text;
    }

    //获取地址栏参数
    function getQueryString(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]); return null;
    }

    return {　　　　　
        ajaxLoad: ajaxLoad,
        setTitle: setTitle,
        toast: toast,
        ajax:ajax,
        emotion:emotion,
        getQueryString:getQueryString
    };
}));
