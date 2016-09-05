/**
 * [首页滚动插件]
 * @author  Puter
 * @time 2016-01-18 16:59:18
 */
(function() {
    var Roll = function(container, params) {
        var rollNun = 1;
        var defaults = {
            timeout: 3000,
            rolltime: 10,
            height:'auto',
        };
        params = params || {};
        for (var def in defaults) {
            if (typeof params[def] === 'undefined') {
                params[def] = defaults[def];
            } else if (typeof params[def] === 'object') {
                for (var deepDef in defaults[def]) {
                    if (typeof params[def][deepDef] === 'undefined') {
                        params[def][deepDef] = defaults[def][deepDef];
                    }
                }
            }
        };
        if(params.height == 'auto'){
        	params.height = $(container).children().height();
        }

        function _roll() {
            rollNun++;

            var _top = 1;
            var t = setInterval(function() {
                if (_top == params.height) {
                    clearInterval(t);
                    if (rollNun == $(container).children().length) {
                        $('.main-news-list')[0].scrollTop = 0;
                        rollNun = 1;
                        return;
                    }
                }
                //console.log($(container)[0]);
                if($(container).length>0){
                    $(container)[0].scrollTop = $(container)[0].scrollTop + 1;
                    _top++;
                }
                
            }, params.rolltime);

        }

        function init() {
            $(container).children('*:first-child').clone().appendTo($(container))
            setInterval(_roll, params.timeout);
        }

        init();

    }

    window.Roll = Roll;


})();

/*===========================
AMD Export
===========================*/
if (typeof(module) !== 'undefined')
{
    module.exports = window.Roll;
}
else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.Roll;
    });
}