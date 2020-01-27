/* 

# 如果您不想使用APP,则可以直接网页浏览https://tieba.baidu.com ,弹出获取提示即可
先在浏览器登录 (先登录! 先登录! 先登录!)
先把tieba.baidu.com加到[MITM]
再配置重写规则:
Surge: 把两条远程脚本放到[Script]
QuanX: 把tieba.cookie.js和tieba.js传到On My iPhone - Quantumult X - Scripts (传到 iCloud 相同目录也可, 注意要打开 quanx 的 iCloud 开关)
再用浏览器访问一下: https://tieba.baidu.com 或者 https://tieba.baidu.com/index/
系统提示: 获取Cookie: 成功
最后就可以把第 1 条脚本注释掉了

#【需配置hostname = tieba.baidu.com】
https?:\/\/tieba\.baidu\.com\/?.? url script-request-header Sunert/Task/tieba.cookie.js
*/
const cookieName = '百度贴吧'
const cookieKey = 'chavy_cookie_tieba'
const chavy = init()
const cookieVal = $request.headers['Cookie']

if (cookieVal.indexOf('BDUSS') > 0) {
  let cookie = chavy.setdata(cookieVal, cookieKey)
  if (cookie) {
    let subTitle = '获取Cookie: 成功'
    chavy.msg(`${cookieName}`, subTitle, '')
    chavy.log(`[${cookieName}] ${subTitle}, cookie: ${cookieVal}`)
  }
} else {
  let subTitle = '获取Cookie: 失败'
  let detail = `请确保在已登录状态下获取Cookie`
  chavy.msg(`${cookieName}`, subTitle, detail)
  chavy.log(`[${cookieName}] ${subTitle}, cookie: ${cookieVal}`)
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

chavy.done()
