/*
入口文件
 */
require(['zepto','avalon','utils','director'], function(zepto,avalon,utils,director) {

    var routes = {
        '/circle':{
            on:function(){
                utils.setTitle('同事圈');
                if($('.circle-info').length>0){
                    toast.loading();
                    $('.circle').show();
                    $('.circle-info').hide();
                    var top = $(document.body).data('top');
                    $(document.body).scrollTop(top);
                    toast.loading('close');
                }else{
                    utils.ajaxLoad('.index-main','template/circle.html');
                }
                
            },
            '/:type':{
                on:function(type){
                    utils.setTitle('同事圈');
                    if($('.circle-info').length>0){
                        $('.circle').show();
                        $('.circle-info').hide();
                    }else{
                        utils.ajaxLoad('.index-main','template/circle.html');
                    }
                }
            }
        },
        '/circleinfo/:pid':{
            on:function(pid){
                utils.setTitle('同事圈');
                if($('.circle-info').length>0){
                    $('.circle').hide();
                    utils.ajaxLoad('.circle-info','template/circleinfo.html?pid='+pid);
                    $('.circle-info').show();
                }else{
                    utils.ajaxLoad('.index-main','template/circleinfo.html?pid='+pid);
                }
                
            }
        },
        '/circleexamine':{
            '/:pid':{
                on:function(pid){
                    utils.setTitle('帖子审核');
                    utils.ajaxLoad('.index-main','template/circleinfo.html?pid='+pid);
                }
            }
        },
        '/circlepub':{
            on:function(){
                utils.setTitle('同事圈');
                utils.ajaxLoad('.index-main','template/circlepub.html');
            }
        }
    };
    var router = new Router(routes).configure({
        notfound:function(){
            //layer.msg('请求地址不存在',{offset: 0});
        }
    });
    if(utils.getQueryString('state') != 'state'){
        router.init(utils.getQueryString('state'));
    }
    window.router = router;

})

//解决点击延迟
require(['fastclick'],function(FastClick){
    //FastClick.attach(document.body);
});

