const cookieName ='快手极速版'
const cookieKey = 'cookie_ks'
const ny = init()
const cookieVal = ny.getdata(cookieKey);
sign()
function sign() {
    let url = {url:'https://nebula.kuaishou.com/rest/n/nebula/sign/query',
    headers: {Cookie:cookieVal}}
    url.headers['Connection'] = `keep-alive`
    url.headers['Content-Type'] = `application/json;charset=UTF-8`
    url.headers['Accept'] = `application/json, text/plain, */* `
    url.headers['Host'] = `nebula.kuaishou.com`
    url.headers['User-Agent'] = `Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 ksNebula/2.1.3.65`
    url.headers['Accept-Language'] = `zh-cn`
    url.headers['Accept-Encoding'] = `gzip, deflate, br`
    url.headers['Referer'] = `https://nebula.kuaishou.com/nebula/task/earning?source=timer&layoutType=4`
   
    ny.get(url, (error, response, data) => {
      ny.log(`${cookieName}, data: ${data}`)
      let result = JSON.parse(data)
      
      const title = `${cookieName}`
      let subTitle = ``
      let detail = ``
    
      if (result.code == 0) {
        subTitle = `签到结果:   成功`
        detail = `${result.data.nebulaSignInPopup.title}`
      } else if(result.code==10007){
        subTitle = `签到结果: 失败`
        detail = `说明: ${result.error_msg}`
      } else {
        subTitle = `签到结果: 重复签到`
        detail = `说明:${result.data.nebulaSignInPopup.title}`
      }
      ny.msg(title, subTitle, detail)
      ny.log(`${result.data.nebulaSignInPopup.title}`)
    })
    ny.done()
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