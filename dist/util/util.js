"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//此工具JS处理wx相关接口promise化，以及请求的promise化
exports.default = {
        //请求方法异步化request(url,method,data)
        //method默认为GET:request(url,data)
        //需求post模式request(url,'POST',data)
        request: function request() {
                var arg = Array.prototype.slice.call(arguments);
                var url = void 0,
                    method = void 0,
                    data = void 0;
                if (arg.length < 2 || arg.length > 3) {
                        throw new Error("参数错误");
                }
                if (typeof arg[0] === "string") {
                        url = arg[0];
                } else {
                        throw new Error("URL必须为字符串");
                }
                if (arg.length == 2) {
                        if (_typeof(arg[1]) === "object") {
                                method = "GET";
                                data = arg[1];
                        } else {
                                throw new Error("data必须为object");
                        }
                }
                if (arg.length == 3) {
                        if (typeof arg[1] === "string") {
                                method = arg[1];
                        } else {
                                throw new Error("method必须为string");
                        }
                        if (_typeof(arg[2]) === "object") {
                                data = arg[2];
                        } else {
                                throw new Error("data必须为object");
                        }
                }
                return new Promise(function (resolve, reject) {
                        wx.request({
                                url: url,
                                method: method,
                                data: data,
                                header: {
                                        'content-type': 'application/json'
                                },
                                success: function success(res) {
                                        resolve(res);
                                },
                                fail: function fail(res) {
                                        reject(res);
                                }
                        });
                });
        },

        //检查用户登录是否过期
        checkSession: function checkSession() {
                return new Promise(function (resolve, reject) {
                        wx.checkSession({
                                success: function success() {
                                        resove("ok");
                                },
                                fail: function fail() {
                                        reject("error");
                                }
                        });
                });
        },

        //用户登录
        //返回的res.code可以用来获取用户的open_id，session_key
        userLogin: function userLogin() {
                return new Promise(function (resolve, reject) {
                        wx.login({
                                success: function success(res) {
                                        resolve(res);
                                },
                                fail: function fail(res) {
                                        reject(res);
                                }
                        });
                });
        },

        //获取用户信息
        //
        getUserInfo: function getUserInfo() {
                return new Promise(function (reolve, reject) {
                        wx.getUserInfo({
                                success: function success(res) {
                                        resolve(res);
                                },
                                fail: function fail(res) {
                                        reject(res);
                                }
                        });
                });
        },

        //获取用户授权设置
        //传入对应的key获取此功能是否授权，授权返回true,否则返回false
        //不传入key情况下，返回授权列表
        getSetting: function getSetting(key) {
                return new Promise(function (resolve, reject) {
                        wx.getSetting({
                                success: function success(res) {
                                        if (key) {
                                                if (res.authSetting['scope.' + key]) {
                                                        resolve("true");
                                                } else {
                                                        resolve("false");
                                                }
                                        } else {
                                                resolve(res);
                                        }
                                },
                                fail: function fail(res) {
                                        reject("error");
                                }
                        });
                });
        },

        //打开请求窗口，让用户授权
        //不传入key：让用户打开所有授权
        //传入授权key，让用户打开单个授权
        openSetting: function openSetting(key) {
                return new Promise(function (resolve, reject) {
                        if (key) {
                                wx.authorize({
                                        scope: "scope." + key,
                                        success: function success(res) {
                                                resolve(res);
                                        },
                                        fail: function fail(res) {
                                                reject(res);
                                        }
                                });
                        } else {
                                wx.openSetting({
                                        success: function success(res) {
                                                resolve(res);
                                        },
                                        fail: function fail(res) {
                                                reject(res);
                                        }
                                });
                        }
                });
        },

        //获取第三方平台自定义字段
        getExtConfig: function getExtConfig() {
                return new Promise(function (resolve, reject) {
                        if (wx.getExtConfig) {
                                wx.wx.getExtConfig({
                                        success: function success(res) {
                                                resolve(res);
                                        },
                                        fail: function fail(res) {
                                                reject(res);
                                        }
                                });
                        } else {
                                throw new Error("接口不兼容,请升级微信");
                        }
                });
        }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiXSwibmFtZXMiOlsicmVxdWVzdCIsImFyZyIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwiYXJndW1lbnRzIiwidXJsIiwibWV0aG9kIiwiZGF0YSIsImxlbmd0aCIsIkVycm9yIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ3eCIsImhlYWRlciIsInN1Y2Nlc3MiLCJyZXMiLCJmYWlsIiwiY2hlY2tTZXNzaW9uIiwicmVzb3ZlIiwidXNlckxvZ2luIiwibG9naW4iLCJnZXRVc2VySW5mbyIsInJlb2x2ZSIsImdldFNldHRpbmciLCJrZXkiLCJhdXRoU2V0dGluZyIsIm9wZW5TZXR0aW5nIiwiYXV0aG9yaXplIiwic2NvcGUiLCJnZXRFeHRDb25maWciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7a0JBQ2U7QUFDUDtBQUNBO0FBQ0E7QUFDQUEsZUFKTyxxQkFJRTtBQUNELG9CQUFJQyxNQUFJQyxNQUFNQyxTQUFOLENBQWdCQyxLQUFoQixDQUFzQkMsSUFBdEIsQ0FBMkJDLFNBQTNCLENBQVI7QUFDQSxvQkFBSUMsWUFBSjtBQUFBLG9CQUFRQyxlQUFSO0FBQUEsb0JBQWVDLGFBQWY7QUFDQSxvQkFBR1IsSUFBSVMsTUFBSixHQUFXLENBQVgsSUFBY1QsSUFBSVMsTUFBSixHQUFXLENBQTVCLEVBQThCO0FBQ3RCLDhCQUFNLElBQUlDLEtBQUosQ0FBVSxNQUFWLENBQU47QUFDUDtBQUNBLG9CQUFHLE9BQU9WLElBQUksQ0FBSixDQUFQLEtBQWlCLFFBQXBCLEVBQTZCO0FBQ3RCTSw4QkFBSU4sSUFBSSxDQUFKLENBQUo7QUFDUCxpQkFGQSxNQUVJO0FBQ0csOEJBQU0sSUFBSVUsS0FBSixDQUFVLFdBQVYsQ0FBTjtBQUNQO0FBQ0Qsb0JBQUdWLElBQUlTLE1BQUosSUFBWSxDQUFmLEVBQWlCO0FBQ1QsNEJBQUcsUUFBT1QsSUFBSSxDQUFKLENBQVAsTUFBaUIsUUFBcEIsRUFBNkI7QUFDckJPLHlDQUFPLEtB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QUFJUCxLQUFKLENBQVUsYUFBVixDQUFOO0FBQ1A7QUFDUixpQkFiTSxDQUFQO0FBY1A7QUFoS00sQyIsImZpbGUiOiJ1dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy/mraTlt6XlhbdKU+WkhOeQhnd455u45YWz5o6l5Y+jcHJvbWlzZeWMlu+8jOS7peWPiuivt+axgueahHByb21pc2XljJZcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgICAgIC8v6K+35rGC5pa55rOV5byC5q2l5YyWcmVxdWVzdCh1cmwsbWV0aG9kLGRhdGEpXHJcbiAgICAgICAgLy9tZXRob2Tpu5jorqTkuLpHRVQ6cmVxdWVzdCh1cmwsZGF0YSlcclxuICAgICAgICAvL+mcgOaxgnBvc3TmqKHlvI9yZXF1ZXN0KHVybCwnUE9TVCcsZGF0YSlcclxuICAgICAgICByZXF1ZXN0KCl7ICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBhcmc9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIGxldCB1cmwsbWV0aG9kLGRhdGE7XHJcbiAgICAgICAgICAgICAgICBpZihhcmcubGVuZ3RoPDJ8fGFyZy5sZW5ndGg+Myl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIuWPguaVsOmUmeivr1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICBpZih0eXBlb2YoYXJnWzBdKT09PVwic3RyaW5nXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw9YXJnWzBdO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVSTOW/hemhu+S4uuWtl+espuS4slwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGFyZy5sZW5ndGg9PTIpeyAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mKGFyZ1sxXSk9PT1cIm9iamVjdFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q9XCJHRVRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPWFyZ1sxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGF0YeW/hemhu+S4um9iamVjdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihhcmcubGVuZ3RoPT0zKXsgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YoYXJnWzFdKT09PVwic3RyaW5nXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kPWFyZ1sxXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJtZXRob2Tlv4XpobvkuLpzdHJpbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mKGFyZ1syXSk9PT1cIm9iamVjdFwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPWFyZ1syXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGF0YeW/hemhu+S4um9iamVjdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDp1cmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOm1ldGhvZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOmRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWlsKHJlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8v5qOA5p+l55So5oi355m75b2V5piv5ZCm6L+H5pyfXHJcbiAgICAgICAgY2hlY2tTZXNzaW9uKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5jaGVja1Nlc3Npb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc292ZShcIm9rXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFpbCgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7ICAgICAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8v55So5oi355m75b2VXHJcbiAgICAgICAgLy/ov5Tlm57nmoRyZXMuY29kZeWPr+S7peeUqOadpeiOt+WPlueUqOaIt+eahG9wZW5faWTvvIxzZXNzaW9uX2tleVxyXG4gICAgICAgIHVzZXJMb2dpbigpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3gubG9naW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwocmVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL+iOt+WPlueUqOaIt+S/oeaBr1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgZ2V0VXNlckluZm8oKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVvbHZlLHJlamVjdCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3guZ2V0VXNlckluZm8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwocmVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy/ojrflj5bnlKjmiLfmjojmnYPorr7nva5cclxuICAgICAgICAvL+S8oOWFpeWvueW6lOeahGtleeiOt+WPluatpOWKn+iDveaYr+WQpuaOiOadg++8jOaOiOadg+i/lOWbnnRydWUs5ZCm5YiZ6L+U5ZueZmFsc2VcclxuICAgICAgICAvL+S4jeS8oOWFpWtleeaDheWGteS4i++8jOi/lOWbnuaOiOadg+WIl+ihqFxyXG4gICAgICAgIGdldFNldHRpbmcoa2V5KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4LmdldFNldHRpbmcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGtleSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUuJytrZXldKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFwidHJ1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcImZhbHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwocmVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiZXJyb3JcIik7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL+aJk+W8gOivt+axgueql+WPo++8jOiuqeeUqOaIt+aOiOadg1xyXG4gICAgICAgIC8v5LiN5Lyg5YWla2V577ya6K6p55So5oi35omT5byA5omA5pyJ5o6I5p2DXHJcbiAgICAgICAgLy/kvKDlhaXmjojmnYNrZXnvvIzorqnnlKjmiLfmiZPlvIDljZXkuKrmjojmnYNcclxuICAgICAgICBvcGVuU2V0dGluZyhrZXkpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoa2V5KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5hdXRob3JpemUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGU6XCJzY29wZS5cIitrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWlsKHJlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4Lm9wZW5TZXR0aW5nKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwocmVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy/ojrflj5bnrKzkuInmlrnlubPlj7Doh6rlrprkuYnlrZfmrrVcclxuICAgICAgICBnZXRFeHRDb25maWcoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHd4LmdldEV4dENvbmZpZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3gud3guZ2V0RXh0Q29uZmlnKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwocmVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwi5o6l5Y+j5LiN5YW85a65LOivt+WNh+e6p+W+ruS/oVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbn0iXX0=