var require = {
    baseUrl: 'static/js',
    paths:{
        zepto:'lib/zepto',
        css:'lib/css',
        sm:'lib/mobile/js/sm',
        smcitypicker:'lib/mobile/js/sm-city-picker.min',
        swiper:'lib/swiper/js/swiper.min',
        roll:'lib/roll',
        avalon:'lib/avalon.mobile.shim',
        util:'lib/util',
        city:'lib/city',


    },
    shim: {
        sm: {
            deps: ['zepto']
        },
        smcitypicker:{
            deps: ['sm']
        },
        city:{
            deps:['sm']
        },
        swiper:{
            deps: ['zepto']
        },
        roll:{
            deps:['zepto']
        },
        util:{
            deps:['css!../css/weui.min.css','zepto']
        }
    }
};


