/*
本脚本仅适用于招商银行签到，获取每日积分
获取Cookie方法:
1.将下方[rewrite_local]和[MITM]地址复制的相应的区域
下，
2.打开'招商银行'APP,登陆，点击'首页的'我的积分'->签到',即可获取Cookie. 
3.签过到等明天重新获取Cookie

仅测试Quantumult X 不通过 无效
by Macsuny

~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~
QX 1.0.6+ :
[task_local]
0 9 * * * cmb_sign.js

[rewrite_local]
^https:\/\/cmb-signpoint\.weijuju\.com\/mobile\/sign$ url script-request-header cmb_cookie.js
~~~~~~~~~~~~~~~~
[MITM]
hostname = cmb-signpoint.weijuju.com
~~~~~~~~~~~~~~~~

*/
const cookieName = '招商银行'
const signurlKey = 'sy_signurl_cmb'
const signheaderKey = 'sy_signheader_cmb'
const signbodyKey = 'sy_signbody_cmb'
const sy = init()
const signurlVal = sy.getdata(signurlKey)
const signheaderVal = sy.getdata(signheaderKey)
const signBodyVal = sy.getdata(signbodyKey)
sign()

function sign() {
	  let signurl = {
		url: signurlVal, headers: JSON.parse(signheaderVal), body: signBodyVal
	}
    sy.post(signurl, (error, response, data) => {
      sy.log(`${cookieName}, data: ${data}`)
      let result = JSON.parse(data)
      const title = `${cookieName}`
      let detail = ``
      let subTitle = ``
   
     if (result.retCode == 0) {
      subTitle = `签到结果: ${result.msg}🎉`
      detail = `签到次数:${result.model.today}次,获得积分: ${result.point}分`
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
  msg = (title, subTitle, body) => {
    if (isSurge()) $notification.post(title, subTitle, body)
    if (isQuanX()) $notify(title, subTitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, resp, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, resp, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
