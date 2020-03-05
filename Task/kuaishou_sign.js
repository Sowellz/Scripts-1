
const CookieName = '快手'
const CookieKey = 'cookie_ks'
const UserId = 'userId'
const matchid=/USERID=(\d+);/
const sy = init()
GetCookie();

function GetCookie() {
  if ($request.headers) {
    var CookieValue = $request.headers['Cookie'];

sign()

function sign() {
  const url = { url: signurlVal, headers: JSON.parse(signheaderVal) }
  url.body = '{}'
  sy.post(url, (error, response, data) => {
    
    const title = `${cookieName}`
    let subTitle = ''
    let detail = ''
    const result = JSON.parse(data.dailyTasks.todayIsSigned)
    if (result == true) {
      subTitle = `签到结果: 成功`
      detail = `签到状态: ${dailyTasks.todayIsSigned}, 签到描述: ${dailyTasks.desc}, 金币收益: ${data.totalCoin}）现金收益: ${data.totalCash}`
    } else if (result == false) {
      subTitle = `签到结果: 成功 (重复签到)`
    } else {
      subTitle = `签到结果: 失败`
      detail = `编码: ${result.code}, 说明: ${result.msg}`
    }
    sy.msg(title, subTitle, detail)
    console.log(subTitle,detail)
    $notify(title, subtitle, detail),
    sy.done()
  })
};

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
};
