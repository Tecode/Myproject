require(['zepto', 'avalon','sm','util'], function(zepto, avalon,sm,util) {
    var url = {
        submitReg:''
    }
    var c_pagereg = avalon.define({
    	$id:'pageReg',
    	codeTitle:'发送验证码',
    	userInfo:{
    		mobile:'18628950993',
    		code:'',
    		password:'',
            isagree:[1]
    	},
    	onSendCodes:function(){
            

    		if(c_pagereg.userInfo.mobile == '' || !(/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(c_pagereg.userInfo.mobile))){
    			util.toast("手机号码错误");
    			return;
    		}
    		if(c_pagereg.codeTitle != '发送验证码'){
    			return;
    		};

            util.sendSMS(c_pagereg.userInfo.mobile,function(result){
                if(result){
                    var time = 60;
                    c_pagereg.codeTitle = time +'s' ;
                    var si = setInterval(function(){
                        time = time-1;
                        if(time==0){
                            c_pagereg.codeTitle = '发送验证码' ;
                            clearInterval(si);
                        }else{
                            c_pagereg.codeTitle = time +'s' ;
                        }
                        
                    },1000);
                }else{
                    util.toast("短信发送失败");
                }
            });

    		
    	},
        onReg:function(){
            if(c_pagereg.userInfo.mobile == ''){
                util.toast("请填写手机号码");
                return;
            }
            if(c_pagereg.userInfo.code == ''){
                util.toast("请填写验证码");
                return;
            }
            if(c_pagereg.userInfo.password == ''){
                util.toast("请填写登录密码");
                return;
            }
            util.ajax(url.submitReg,'post',{
                mobile:c_pagereg.userInfo.mobile,
                verifycode:c_pagereg.userInfo.code,
                loginpwd:c_pagereg.userInfo.password
            },function(result){
                if(result && result.code=='0'){
                    util.toast("注册成功，请完善详细信息");
                    setTimeout(function(){
                        window.location.href="reg_info.html"
                    },500)
                }
                util.toast("注册成功，请完善详细信息");
                    setTimeout(function(){
                        window.location.href="reg_info.html"
                    },500)
            })
        }
    })

    avalon.scan();
})
