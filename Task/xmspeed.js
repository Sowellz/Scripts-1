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

const CookieName ='喜马拉雅极速版'
const CookieKey = 'sy_cookie_xmspeed'
const sy = init()
const cookieVal = sy.getdata(CookieKey);
let isGetCookie = typeof $request !== 'undefined'

if (isGetCookie) {
   GetCookie()
} else {
   sign()
}
function GetCookie() {
  if ($request.headers) {
    var CookieValue = $request.headers['Cookie'];
    
    if (sy.getdata(CookieKey) != (undefined || null)) {
      if (sy.getdata(CookieKey) != CookieValue) {
        var cookie = sy.setdata(CookieValue, CookieKey);
        if (!cookie) {
          sy.msg("更新" + CookieName + "Cookie失败‼️", "", "");
          sy.log(`[${CookieName}] 获取Cookie: 失败`);
        } else {
          sy.msg("更新" + CookieName + "Cookie成功 🎉", "", "");
      sy.log(`[${CookieName}] 获取Cookie: 成功, Cookie: ${CookieValue}`)
        }
      }
    } else {
      var cookie = sy.setdata(CookieValue, CookieKey);
      if (!cookie) {
        sy.msg("首次写入" + CookieName + "Cookie失败‼️", "", "");
      } else {
        sy.msg("首次写入" + CookieName + "Cookie成功 🎉", "", "");
      }
    }
  } else {
    sy.msg("写入" + CookieName + "Cookie失败‼️", "", "配置错误, 无法读取请求头, ");
  }
}

function sign() {
      const title = `${CookieName}`
      let subTitle = ``
      let detail = ``
    let url = {url: 'https://m.ximalaya.com/speed/task-center/account/coin',
    headers: { Cookie:cookieVal}}   
     
    sy.get(url, (error, response, data) => {
    sy.log(`${CookieName}, data: ${data}`)
      
     if (data == ""){
       subTitle = `签到失败: 配置缺失❌`
       detail = '说明:请重新获取Cookie'
     } else {
     let result = JSON.parse(data) 
       subTitle = `签到结果:  成功`
       detail = `今日获取金币：${result.total}`
      }  
      sy.msg(title, subTitle, detail)
    })
    sy.done()
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
