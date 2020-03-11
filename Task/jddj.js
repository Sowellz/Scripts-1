const cookieName ='京东到家'
const cookieKey = 'chen_cookie_dj'
const chen = init()
const cookieVal = chen.getdata(cookieKey)
sign()
function sign() {
    let url = {url: 'https://daojia.jd.com/client?functionId=signin%2FuserSigninNew&body=%7B%7D',
    headers: {Cookie:cookieVal}}
   
    chen.get(url, (error, response, data) => {
      //chen.log(`${cookieName}, data: ${data}`)
      let result = JSON.parse(data)
      
      const title = `${cookieName}`
      let subTitle = ``
      let detail = ``
    
      if (result.code == 0) {
        subTitle = `签到结果: 成功`
        detail = `获取鲜豆：${result.result.points}`
        chen.msg(title, subTitle, detail)
      } else if(result.code==201){
        subTitle = `签到结果: 失败`
        detail = `说明: 未登录`
        chen.msg(title, subTitle, detail)
        
      } else {
      
      }
      //chen.log(`${result.totalBalanceAmount}`)
    })
   chen.done()
var time = `${new Date().getTime()}`
 
points()
function points() {
    let url = {url: 'https://daojia.jd.com/client?_jdrandom=${time+1}&functionId=signin%2FshowSignInMsgNew&isNeedDealError=true&body=%7B%22cityId%22%3A1607%2C%22platform%22%3A4%2C%22longitude%22%3A114.30774%2C%22latitude%22%3A22.703693%2C%22source%22%3A%22H5%22%7D&lat=22.703693&lng=114.30774&lat_pos=22.703693&lng_pos=114.30774&city_id=1607&deviceToken=H5_DEV_CDCCA1FA-89AB-4A36-82F0-92861F7E6E43&deviceId=H5_DEV_CDCCA1FA-89AB-4A36-82F0-92861F7E6E43&channel=&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=H5_DEV_CDCCA1FA-89AB-4A36-82F0-92861F7E6E43${time}',
    headers: {Cookie:cookieVal}}
   
    chen.get(url, (error, response, data) => {
      chen.log(`${cookieName}, data: ${data}`)
      let result = JSON.parse(data)
      
      const title = `${cookieName}`
      let subTitle = ``
      let detail = ``
    
      if (result.code == 0) {
        subTitle = `签到结果: 重复`
        detail = `鲜豆个数：${result.result.userInfoResponse.points}  ${result.result.sevenDaysRewardResponse.tomorrowSingInRewardText} ${result.result.sevenDaysRewardResponse.alreadySignInDays}`
        chen.msg(title, subTitle, '')
      } else {
      
      }
      //chen.log(title, subTitle, detail)
    })
    chen.done()
    }
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