//需手动填入您获取的token值


const cookieName ='京东到家'
const cookieKey = 'sy_cookie_dj'
const sy = init()
const cookieVal = sy.getdata(cookieKey);
sign()
function sign() {
    let url = {url: 'https://daojia.jd.com/client?functionId=signin%2FuserSigninNew&body=%7B%7D',
    headers: { Cookie:cookieVal}}   
    sy.get(url, (error, response, data) => {
      //sy.log(`${cookieName}, data: ${data}`)
      let result = JSON.parse(data)
      const title = `${cookieName}`
      let subTitle = ``
      let detail = ``
      if (result.success&&res.result.points!='undefined') {
       subTitle = `签到结果:   成功`
       detail = `获取鲜豆：${result.result.points}`
       sy.msg(title, subTitle, detail)
       sy.done()
    } else {
   }
 })
}
pont()
function pont(){
      const timestamp = new Date().getTime();
      const token = 'H5_DEV_E4F6FF91-996D-488C-A4C5-FBEF3A9D6523' //填入地址中的deviceToken
      let turl = {url: 'https://daojia.jd.com/client?_jdrandom=$%7Btimestamp%7D&functionId=signin%2FshowSignInMsgNew&isNeedDealError=true&body=%7B%22cityId%22%3A1607%2C%22platform%22%3A4%2C%22longitude%22%3A114.30774%2C%22latitude%22%3A22.703693%2C%22source%22%3A%22H5%22%7D&lat=22.703693&lng=114.30774&lat_pos=22.703693&lng_pos=114.30774&city_id=1607&deviceToken=$%7Btoken%7D&deviceId=H5_DEV_E4F6FF91-996D-488C-A4C5-FBEF3A9D6523&channel=&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=$%7Btoken%7D$%7Btimestamp%7D',//填入deviceId='您获取的token'
    headers: { Cookie:cookieVal}}   
    sy.get(turl, (error, response, data) => {
      //sy.log(`${cookieName}, data: ${data}`)
      let result = JSON.parse(data)
      const title = `${cookieName}`
      let subTitle = ``
      let detail = ``
    
      if (result.success == true) {
        subTitle = `签到结果: 重复`
        detail = `鲜豆：${result.result.userInfoResponse.points}，已签到${result.result.sevenDaysRewardResponse.alreadySignInDays}天，${result.result.sevenDaysRewardResponse.todaySignInRewardText}`
      } else {
        subTitle = `签到结果: 未知`
        detail = `说明: ${result.msg}`
      }
      sy.msg(title, subTitle, detail)
      sy.log(`返回结果代码:${result.code}，返回信息:${result.msg}`)
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
