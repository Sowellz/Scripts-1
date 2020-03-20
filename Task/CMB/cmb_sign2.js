/*
本脚本仅适用于招商银行签到，获取每日积分
获取Cookie方法:
1.将下方[rewrite_local]和[MITM]地址复制的相应的区域
下，
2.打开'招商银行'APP,登陆，点击'首页的'我的积分',即可获取Cookie. 


仅测试Quantumult x
by Macsuny

~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~
QX 1.0.6+ :
[task_local]
0 9 * * * cmb_sign.js

[rewrite_local]
^https?:\/\/mobile\.cmbchina\.com\/.+DynamicFuncRequest\.aspx.+ClientNo=\w+ script-request-header cmb_cookie.js
~~~~~~~~~~~~~~~~
[MITM]
hostname = cmb-signpoint.weijuju.com
~~~~~~~~~~~~~~~~

*/

const cookieName ='招商银行'
const cookieKey = 'cookie_cmb'
const sy = init()
const cookieVal = sy.getdata(cookieKey);
sign()
function sign() {
    let url = {url: 'https://cmb-signpoint.weijuju.com/mobile/sign',
    headers: { Cookie:cookieVal}}
   
    sy.post(url, (error, response, data) => {
      sy.log(`${cookieName}, data: ${data}`)
      let result = JSON.parse(data)
      const title = `${cookieName}`
      let subTitle = ``
      let detail = ``
    
     if (result.retCode == 0) {
      subTitle = `签到结果: ${result.msg}🎉`
      detail = `签到次数:${result.model.signDays}次,获得积分: ${result.point}分`
      } else if (result.retCode == 20100) {
      subTitle = `签到结果: 重复`
      detail = `说明: ${result.msg}!`
      } else  {
      subTitle = `签到结果: 失败`
      detail = `说明: ${result.msg}`
      }
      sy.msg(title, subTitle, detail)
     })
  }
  function init() {
    isSurge = () => {
      return undefined === this.$httpClient ? false : true
    }
    isQuanX = () => {
      return undefined === this.$task ? false : true
    }
    getdata = (key) => {
      if (isSurge()) return $persistentStore.read(key)
      if (isQuanX()) return $prefs.valueForKey(key)
    }
    setdata = (key, val) => {
      if (isSurge()) return $persistentStore.write(key, val)
      if (isQuanX()) return $prefs.setValueForKey(key, val)
    }
    msg = (title, subtitle, body) => {
      if (isSurge()) $notification.post(title, subtitle, body)
      if (isQuanX()) $notify(title, subtitle, body)
    }
    log = (message) => console.log(message)
    get = (url, cb) => {
      if (isSurge()) {
        $httpClient.get(url, cb)
      }
      if (isQuanX()) {
        url.method = 'GET'
        $task.fetch(url).then((resp) => cb(null, {}, resp.body))
      }
    }
    post = (url, cb) => {
      if (isSurge()) {
        $httpClient.post(url, cb)
      }
      if (isQuanX()) {
        url.method = 'POST'
        $task.fetch(url).then((resp) => cb(null, {}, resp.body))
      }
    }
    done = (value = {}) => {
      $done(value)
    }
    return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
  }