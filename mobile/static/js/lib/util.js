/**
 * 工具类库
 */
define(['zepto'], function(zepto) {
    var URL_SENDSMS = '/Shop/User/GetVerifyCode';//短信验证码地址


    var _ajax = function(url,type,data,callback){
        $.ajax({
            url: url,
            type: type,
            dataType: 'json',
            data: data,
            success:function(result){
                callback ? callback.call(this,result) : '';
            },
            error:function(result){
                callback ? callback.call(this,result) : '';
            }
        })
    }

    /**
     * ajax方法
     * @param  {[type]}   url      [地址]
     * @param  {[type]}   type     [类型post，get]
     * @param  {[type]}   data     [提交的数据]
     * @param  {Function} callback [回调]
     * @return {[type]}            [description]
     */
    var ajax = function(url,type,data,callback){
        if(isApp()){
            _ajax('/Shop/Asset/Token', 'get', {
                username:getMobile()
            }, function(result){
                if(result && result.code =='0'){
                    if(typeof data == "object"){
                        data.access_token = result.data.access_token;
                    }else{
                        data += '&access_token=' + result.data.access_token;
                    }
                }
                _ajax(url,type,data,callback);
            });
        }else{
            _ajax(url,type,data,callback);
        }
        

    }

    var sendSMS = function(mobile,callback){
        ajax(URL_SENDSMS,'POST',{mobile:mobile},function(result){
            if(result && result.code == '0'){
                callback.call(this,true)
            }else{
                callback.call(this,false)
            }
        })
    }

    var toast = function(text){
        $.toast(text);
    }

    //确认提示框
    var confirm = function(text,fn){
        var _html = '<div class="weui_dialog_confirm"><div class="weui_mask"></div><div class="weui_dialog"><div class="weui_dialog_hd"><strong class="weui_dialog_title"></strong></div><div class="weui_dialog_bd">'+ text +'</div><div class="weui_dialog_ft"><a href="javascript:;" class="weui_btn_dialog default">取消</a> <a href="javascript:;" class="weui_btn_dialog primary">确定</a></div></div></div>';
        var obj = $(_html).appendTo($('.page')>0 ? $('.page') : $(document.body));
        obj.find('.primary').bind('click', function(event) {
            $('.weui_dialog_confirm').remove();
            fn ? fn.call(this) : '';
        });
        obj.find('.default').bind('click', function(event) {
            $('.weui_dialog_confirm').remove();
        });
    }

    var alert = function(text,fn){
        var _html = '<div class="weui_dialog_alert"><div class="weui_mask"></div><div class="weui_dialog"><div class="weui_dialog_hd"><strong class="weui_dialog_title"></strong></div><div class="weui_dialog_bd">'+ text +'</div><div class="weui_dialog_ft"><a href="javascript:;" class="weui_btn_dialog primary">确定</a></div></div></div>';
        var obj = $(_html).appendTo($('.page').length>0 ? $('.page') : $(document.body));
        obj.find('.primary').bind('click', function(event) {
            $('.weui_dialog_alert').remove();
            fn ? fn.call(this) : '';
        });
    }

    var loading = function(text){
        if(text=='close'){
            $('.weui_loading_toast').remove();
            return;
        }
        text = !text ? '数据加载中' : text;
        var _html = '<div class="weui_loading_toast"><div class="weui_mask_transparent"></div><div class="weui_toast"><div class="weui_loading"><div class="weui_loading_leaf weui_loading_leaf_0"></div><div class="weui_loading_leaf weui_loading_leaf_1"></div><div class="weui_loading_leaf weui_loading_leaf_2"></div><div class="weui_loading_leaf weui_loading_leaf_3"></div><div class="weui_loading_leaf weui_loading_leaf_4"></div><div class="weui_loading_leaf weui_loading_leaf_5"></div><div class="weui_loading_leaf weui_loading_leaf_6"></div><div class="weui_loading_leaf weui_loading_leaf_7"></div><div class="weui_loading_leaf weui_loading_leaf_8"></div><div class="weui_loading_leaf weui_loading_leaf_9"></div><div class="weui_loading_leaf weui_loading_leaf_10"></div><div class="weui_loading_leaf weui_loading_leaf_11"></div></div><p class="weui_toast_content">'+ text +'</p></div></div>';
        $(_html).appendTo($('.page').length>0 ? $('.page') : $(document.body));
    }

    var toast_ok = function(text){
        $('.weui_loading_toast').remove();
        text = !text ? '已完成' : text;
        var _html = '<div class="weui_toast_ok"><div class="weui_mask_transparent"></div><div class="weui_toast"><i class="weui_icon_toast"></i><p class="weui_toast_content">'+ text +'</p></div></div>';
        $(_html).appendTo($('.page').length>0 ? $('.page') : $(document.body));
        setTimeout(function(){
            $('.weui_toast_ok').remove()
        },700)
    }

    var tip = function(text){
        $('.weui_loading_toast').remove();
        text = !text ? '已完成' : text;
        var _html = '<div class="weui_toast_ok"><div class="weui_mask_transparent"></div><div class="weui_toast" style="min-height:12px;padding:7px 16px;width:auto;bottom:20%;top:auto;"><p class="weui_toast_content" style="margin:0;">'+ text +'</p></div></div>';
        var obj = $(_html).appendTo($('.page').length>0 ? $('.page') : $(document.body));
        $(obj).find('.weui_toast').css({
            'margin-left':$(obj).find('.weui_toast').width()/2*-1
        })
        setTimeout(function(){
            $('.weui_toast_ok').remove()
        },700)
    }


    var isApp = function(){
        if(typeof twapp !== 'undefined'){
            return true;
        }else{
            return false;
        }
    }

    var getMobile = function(){
        if(isApp()){
            return twapp.getChars();
        }else{
            return "";
        }
    }
    


    　　　　
    return {　　　　
        ajax:ajax,
        sendSMS:sendSMS,
        toast:toast,
        confirm:confirm,
        alert:alert,
        loading:loading,
        toast_ok:toast_ok,
        tip:tip,
        isapp:isApp,
        getMobile:getMobile
    };

    　　
});



/*
扩展数组，提供remove方法
*/
(function() {

    //查找字符串
    Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    };
    //替换字符串
    Array.prototype.replace = function(reg, rpby) {
            var ta = this.slice(0),
                d = '\0';
            console.log(ta);
            var str = ta.join(d);
            str = str.replace(reg, rpby);
            return str.split(d);
        }
        //移除某一项
    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };
})();
