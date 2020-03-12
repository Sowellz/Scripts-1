const cookieName ='京东到家'
const cookieKey = 'sy_cookie_dj'
const sy = init()
const cookieVal = sy.getdata(cookieKey);
sign()
function sign() {
    let url = {url: 'https://daojia.jd.com/client?functionId=signin%2FuserSigninNew&body=%7B%7D',
    headers: { Cookie:cookieVal}}
   
    sy.get(url, (error, response, data) => {
      sy.log(`${cookieName}, data: ${data}`)
      let result = JSON.parse(data)
      
      const title = `${cookieName}`
      let subTitle = ``
      let detail = ``
    
      if (result.code == 0) {
        subTitle = `签到结果:   成功`
        detail = `获取鲜豆：${result.result.points}`
      } else if(result.code==201){
        subTitle = `签到结果: 失败`
        detail = `说明: ${result.msg}`
      } else if(result.code==-1){
        subTitle = `签到结果：重复签到`
        detail = `说明: ${result.msg}`
      }else {
        subTitle = `签到结果: 未知`
        detail = `说明: ${result.msg}`
      }
      sy.msg(title, subTitle, detail)
      sy.log(`返回结果代码:${result.code}，返回信息:${result.msg}`)
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