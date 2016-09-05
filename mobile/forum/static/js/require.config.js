var require = {
    baseUrl: 'static/js/',
    paths:{
        jquery:[
            'http://cdnjs.gtimg.com/cdnjs/libs/jquery/1.9.1/jquery.min',
            'lib/jquery'
        ],
        zepto:[
            'lib/zepto.min',
            'http://cdnjs.gtimg.com/cdnjs/libs/zepto/1.1.4/zepto.min'
        ],
        sammy:'lib/sammy',
        director:'lib/director.min',
        css:'lib/css',
        avalon: 'lib/avalon.mobile.shim',
        mmRouter: 'lib/mmRouter',
        mmHistory:'lib/mmHistory',
        utils:'lib/utils',
        fastclick:'lib/fastclick',
        plupload: 'lib/plupload/plupload.min'
    },
    shim: {
        utils:{
            deps:['zepto']
        },
        plupload:{
            exports:'plupload'
        }
    }
};

/*
扩展数组，提供remove方法
*/
//查找字符串
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
//替换字符串
Array.prototype.replace=function(reg,rpby){
    var ta=this.slice(0),d='\0';
    console.log(ta);
    var str=ta.join(d);
    str=str.replace(reg,rpby);
    return str.split(d);
}
//移除某一项
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
