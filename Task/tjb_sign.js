const cookieName = '淘宝特价版'
//const signurlKey = 'senku_signurl_pandeng'
//const signheaderKey = 'senku_signheader_pandeng'
const signurlKey = 'sy_signurl_tjb'
const signheaderKey = 'sy_signheader_tjb'
//const signbodyKey = 'sy_signbody_tjb'
const sy = init()
const signurlVal = sy.getdata(signurlKey)
const signheaderVal = sy.getdata(signheaderKey)
//const signBodyVal = sy.getdata(signbodyKey)

sign()

function sign() {
  const url = { url: signurlVal, headers: signheaderVal}
   url.headers['x-pv'] = `6.3`
   url.headers['x-app-conf-v'] = `1`
   
   
  sy.post(url, (error, response, data) => {
    sy.log(`${cookieName}, data: ${data}`)
    const res = JSON.parse(data)
    let subTitle = ``
    let detail = ``
    if (res.status == 200) {
      subTitle = `签到结果: 成功`
      //detail = `状态: ${res.ret}`
    } else {
      subTitle = `签到结果: 失败`
      detail = `状态: ${res.message}`
    }
    sy.msg(cookieName, subTitle, detail)
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
