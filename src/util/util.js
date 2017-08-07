//此工具JS处理wx相关接口promise化，以及请求的promise化
export default {
        //请求方法异步化request(url,method,data)
        //method默认为GET:request(url,data)
        //需求post模式request(url,'POST',data)
        request(){           
                let arg=Array.prototype.slice.call(arguments);
                let url,method,data;
                if(arg.length<2||arg.length>3){
                        throw new Error("参数错误");
                }
                 if(typeof(arg[0])==="string"){
                        url=arg[0];
                }else{
                        throw new Error("URL必须为字符串");
                }
                if(arg.length==2){                      
                        if(typeof(arg[1])==="object"){
                                method="GET";
                                data=arg[1];
                        }else{
                                throw new Error("data必须为object");
                        }  
                }
                if(arg.length==3){        
                        if(typeof(arg[1])==="string"){
                                        method=arg[1]
                        }else{
                                throw new Error("method必须为string");
                        }
                        if(typeof(arg[2])==="object"){
                                data=arg[2];
                        }else{
                                throw new Error("data必须为object");
                        } 
                 }  
                return new Promise((resolve,reject)=>{
                        wx.request({
                                url:url,
                                method:method,
                                data:data,
                                header: {
                                        'content-type': 'application/json'
                                },
                                success(res){
                                        resolve(res);
                                },
                                fail(res){
                                        reject(res);
                                }
                        });
                })
        },
        //检查用户登录是否过期
        checkSession(){
                return new Promise((resolve,reject)=>{
                        wx.checkSession({
                                success(){
                                        resove("ok");
                                },
                                fail(){
                                        reject("error");
                                }
                        })
                });        
        },
        //用户登录
        //返回的res.code可以用来获取用户的open_id，session_key
        userLogin(){
                return new Promise((resolve,reject)=>{
                        wx.login({
                                success(res){
                                        resolve(res);
                                },
                                fail(res){
                                        reject(res);
                                }
                        })
                })               
        },
        //获取用户信息
        //
        getUserInfo(){
                return new Promise((reolve,reject)=>{
                        wx.getUserInfo({
                                success(res){
                                        resolve(res);
                                },
                                fail(res){
                                        reject(res);
                                }
                        })      
                });
        },
        //获取用户授权设置
        //传入对应的key获取此功能是否授权，授权返回true,否则返回false
        //不传入key情况下，返回授权列表
        getSetting(key){
                return new Promise((resolve,reject)=>{
                        wx.getSetting({
                                success(res){
                                        if(key){
                                                if(res.authSetting['scope.'+key]){
                                                        resolve("true");
                                                }else{
                                                        resolve("false");
                                                }  
                                        }else{
                                                resolve(res);
                                        }
                                                                         
                                },
                                fail(res){
                                       reject("error"); 
                                }
                        })
                })
        },
        //打开请求窗口，让用户授权
        //不传入key：让用户打开所有授权
        //传入授权key，让用户打开单个授权
        openSetting(key){
                return new Promise((resolve,reject)=>{
                        if(key){
                                wx.authorize({
                                        scope:"scope."+key,
                                        success(res){
                                                resolve(res);
                                        },
                                        fail(res){
                                                reject(res);
                                        }
                                })
                        }else{
                                wx.openSetting({
                                        success(res){
                                                resolve(res);
                                        },
                                        fail(res){
                                                reject(res);
                                        }
                                });
                        }                     
                });
        },
        //获取第三方平台自定义字段
        getExtConfig(){
                return new Promise((resolve,reject)=>{
                        if(wx.getExtConfig){
                                wx.wx.getExtConfig({
                                        success(res){
                                                resolve(res);
                                        },
                                        fail(res){
                                                reject(res);
                                        }
                                })
                        }else{
                                throw new Error("接口不兼容,请升级微信")
                        }
                });
        }
}