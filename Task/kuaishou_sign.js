/*


*/

const CookieName = '快手'
const CookieKey = 'cookie_ks'
const chavy = init()
var cookieVal = chavy.getdata(CookieKey);

sign()

function sign() {
  let url = {
    url: `https://nebula.kuaishou.com/rest/n/nebula/sign/query`,
    headers: {
      Cookie: cookieVal
    }
  }
  url.headers['Origin'] = 'nebula.kuaishou.com'
  url.headers['Referer'] = 'https://nebula.kuaishou.com/nebula/task/earning?source=timer&layoutType=4'
  url.headers['Accept'] = 'application/json, text/javascript, */*; q=0.01'
  url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 ksNebula/2.1.3.65'

  chavy.get(url, (error, response, data) => {
    let result = JSON.parse(data)
    let title = `${cookieName}`
    // 签到成功
    if (result && result.code == 1) {
      let subTitle = `签到结果: 成功`
      let detail = `连续签到 :${data.nebulaSignInPopup.subTitle}`
      chavy.msg(title, subTitle, detail)
    }
    // 用户未登录
    else if (result && result.code == 10007) {
      getsigninfo()
    }
    // 签到失败
    else {
      let subTitle = `签到结果: 失败`
      let detail = `说明: ${error_msg}`
      chavy.msg(title, subTitle, detail)
    }
    chavy.log(`${cookieName}, data: ${data}`)
  })

  chavy.done()
}
function getsigninfo() {
  let url = {
    url: `https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview`,
    headers: {
      Cookie: cookieVal
    }
  }
  url.headers['Host'] = 'nebula.kuaishou.com'
  url.headers['Origin'] = 'nebula.kuaishou.com'
  url.headers['Referer'] = 'https://nebula.kuaishou.com/nebula/task/earning?source=timer&layoutType=4'
  url.headers['Accept'] = 'application/json, text/javascript, */*; q=0.01'
  url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 ksNebula/2.1.3.65'

  chavy.get(url, (error, response, data) => {
    let title = `${cookieName}`
    let subTitle = `签到结果: 成功 (重复签到)`
    let detail = ``
    let result = JSON.parse(data)
    if (result && result.code == 0) detail = `连续签到 :${data.nebulaSignInPopup.subTitle&title}`
    chavy.msg(title, subTitle, detail)
    console.log(title, subTitle, detail)
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
