/*

本脚本仅适用于喜马拉雅极速版签到
获取Cookie方法:
1.将下方[rewrite_local]和[MITM]地址复制的相应的区域
下，
2.APP登陆账号后，点击右下角'福利'选项,即可获取Cookie.


仅测试Quantumult x，Surge、Loon自行测试
by Macsuny

~~~~~~~~~~~~~~~~
Surge 4.0 :
[Script]
cron "0 9 * * *" script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/xmspeed.js
# 获取喜马拉雅极速版 Cookie.
http-request https:\/\/m\.ximalaya\.com\/speed\/task-center\/account\/coin,script-path=https://raw.githubusercontent.com/Sunert/Scripts/master/Task/xmspeed.js
~~~~~~~~~~~~~~~~
QX 1.0.6+ :
[task_local]
0 9 * * * xmspeed.js

[rewrite_local]
# Get cookie. QX 1.0.5(188+):
https:\/\/m\.ximalaya\.com\/speed\/task-center\/account\/coin url script-request-header xmspeed.js
~~~~~~~~~~~~~~~~
QX or Surge [MITM]
hostname = m.ximalaya.com
~~~~~~~~~~~~~~~~

task
0 0 * * * xmspeed.js

*/

const CookieName = '喜马拉雅极速版'
const signurlKey = 'sy_signurl_xmspeed'
const signheaderKey = 'sy_signheader_xmspeed'
const signbodyKey = 'sy_signbody_xmspeed'
const sy = init()
const signurlVal = sy.getdata(signurlKey)
const signheaderVal = sy.getdata(signheaderKey)
const signbodyVal = sy.getdata(signbodyKey)

let isGetCookie = typeof $request !== 'undefined'

if (isGetCookie) {
   GetCookie()
} else {
   sign()
}

function GetCookie() {
const requrl = $request.url
if ($request && $request.method != 'OPTIONS')  {
  const signurlVal = requrl
  const signheaderVal = JSON.stringify($request.headers)
  const signbodyVal = $request.body
  sy.log(`signurlVal:${signurlVal}`)
  sy.log(`signheaderVal:${signheaderVal}`)
  sy.log(`signbodyVal:${signbodyVal}`)

  if (signurlVal) sy.setdata(signurlVal, signurlKey)
  if (signheaderVal) sy.setdata(signheaderVal, signheaderKey)
  if (signbodyVal) sy.setdata(signbodyVal, signbodyKey)
  sy.msg(CookieName, `获取Cookie: 成功`, ``)
 }
}

function sign() {
      const title = `${CookieName}`
      let subTitle = ``
      let detail = ``
let signurl = {url: 'https://m.ximalaya.com/speed/task-center/check-in/check',
    headers: JSON.parse(signheaderVal), body: signbodyVal
} 
  signurl.headers['Host'] = 'm.ximalaya.com'
  signurl.headers['Origin'] = 'https://m.ximalaya.com/'
  signurl.headers['Referer'] = 'https://m.ximalaya.com/speed/task-center/home'
  signurl.headers['Accept'] = 'application/json, text/plain, */*'
  signurl.headers['Content-Type'] = 'application/json;charset=utf-8'
  signurl.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 iting/1.0.8 kdtunion_iting/1.0 iting(main)/1.0.8/ios_1'
    sy.post(signurl, (error, response, data) => {
    sy.log(`${CookieName}, data: ${data}`)
 //sy.log(signbodyVal)
    let result = JSON.parse(data) 
    if (result.errorCode == -1){
       subTitle = `签到失败: 配置缺失❌`
       detail = '说明:请重新获取Cookie'
      sy.msg(title, subTitle, detail)
     } 
  })
     let infourl = {url: 'https://m.ximalaya.com/speed/task-center/account/coin',
    headers: JSON.parse(signheaderVal)}        
    sy.get(infourl, (error, response, data) => {
    sy.log(`${CookieName}, data: ${data}`)
       let result = JSON.parse(data) 
     if (result.total != ""){
       subTitle = `签到结果:  成功`
       detail = `今日获取金币：${result.total}`
      } else {    
      }  
      sy.msg(title, subTitle, detail)
    
    sy.done()
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
sy.done()
