import RequestService from '../httpRequest'
import {getServiceUrl} from '../api'


export default {
    // 登录
    login(loginForm, callback) {
        RequestService.sendRequest()
            .url(`${getServiceUrl()}/api/v1/user/login`)
            .method('POST')
            .data(loginForm)
            .success((res) => {
                RequestService.clearRequestTime()
                callback(res)
            })
            .fail(() => {
                RequestService.reAjaxFun(() => {
                    this.login(loginForm, callback)
                })
            }).send()
    },
    // 获取验证码
    getCaptcha(uuid, callback) {

        RequestService.sendRequest()
            .url(`${getServiceUrl()}/api/v1/user/captcha?uuid=${uuid}`)
            .method('GET')
            .type('blob')
            .header({
                'Content-Type': 'image/gif',
                'Pragma': 'No-cache',
                'Cache-Control': 'no-cache'
            })
            .success((res) => {
                RequestService.clearRequestTime();
                callback(res);
            })
            .fail((err) => {  // 添加错误参数

            }).send()
    },
    // 注册账号
    register(registerForm, callback) {
        RequestService.sendRequest()
            .url(`${getServiceUrl()}/api/v1/user/register`)
            .method('POST')
            .data(registerForm)
            .success((res) => {
                RequestService.clearRequestTime()
                callback(res)
            })
            .fail(() => {
            }).send()
    },

    // 保存设备配置
    saveDeviceConfig(device_id, configData, callback) {
        RequestService.sendRequest()
            .url(`${getServiceUrl()}/api/v1/user/configDevice/${device_id}`)
            .method('PUT')
            .data(configData)
            .success((res) => {
                RequestService.clearRequestTime();
                callback(res);
            })
            .fail((err) => {
                console.error('保存配置失败:', err);
                RequestService.reAjaxFun(() => {
                    this.saveDeviceConfig(device_id, configData, callback);
                });
            }).send();
    },
    // 用户信息获取
    getUserInfo(callback) {
        RequestService.sendRequest()
            .url(`${getServiceUrl()}/api/v1/user/info`)
            .method('GET')
            .success((res) => {
                RequestService.clearRequestTime()
                callback(res)
            })
            .fail((err) => {
                console.error('接口请求失败:', err)
                RequestService.reAjaxFun(() => {
                    this.getUserInfo(callback)
                })
            }).send()
    },
    // 修改用户密码
    changePassword(oldPassword, newPassword, successCallback, errorCallback) {
        RequestService.sendRequest()
            .url(`${getServiceUrl()}/api/v1/user/change-password`)
            .method('PUT')
            .data({
                password: oldPassword,
                newPassword: newPassword,
            })
            .success((res) => {
                RequestService.clearRequestTime();
                successCallback(res);
            })
            .fail((error) => {
                RequestService.reAjaxFun(() => {
                    this.changePassword(oldPassword, newPassword, successCallback, errorCallback);
                });
            })
            .send();
    },
    
    // 已绑设备
     getAgentBindDevices(agentId, callback) {
         RequestService.sendRequest()
             .url(`${getServiceUrl()}/api/v1/user/agent/device/bind/${agentId}`)
             .method('GET')
             .success((res) => {
                 RequestService.clearRequestTime();
                 callback(res);
             })
             .fail((err) => {
                 console.error('获取设备列表失败:', err);
                 RequestService.reAjaxFun(() => {
                     this.getAgentBindDevices(agentId, callback);
                 });
             }).send();
     },
    // 解绑设备
    unbindDevice(device_id, callback) {
          RequestService.sendRequest()
            .url(`${getServiceUrl()}/api/v1/user/device/unbind/${device_id}`)
            .method('PUT')
            .success((res) => {
              RequestService.clearRequestTime();
              callback(res);
            })
            .fail((err) => {
              console.error('解绑设备失败:', err);
              RequestService.reAjaxFun(() => {
                this.unbindDevice(device_id, callback);
              });
            }).send();
    },
    // 绑定设备
    bindDevice(agentId, code, callback) {
        RequestService.sendRequest()
            .url(`${getServiceUrl()}/api/v1/user/agent/device/bind/${agentId}`)
            .method('POST')
            .data({ code })
            .success((res) => {
                RequestService.clearRequestTime();
                callback(res);
            })
            .fail((err) => {
                console.error('绑定设备失败:', err);
                RequestService.reAjaxFun(() => {
                    this.bindDevice(agentId, code, callback);
                });
            }).send();
    },
}
