const cookieName ='快手极速版'
const cookieKey = 'cookie_ks'
const sy = init()
const cookieVal = sy.getdata(cookieKey);

var headerscommon = {
  'Accept': 'application/json, text/plain, */*',
'Accept-Encoding': 'gzip, deflate, br',
'Accept-Language': 'zh-cn',
'Connection': 'keep-alive',
'Cookie': cookieVal,
'Host': 'nebula.kuaishou.com',
'Referer': 'https://nebula.kuaishou.com/nebula/task/earning?source=timer&layoutType=4',
'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 ksNebula/2.1.3.65',
}

//签到结果
var signresult = '';

//签到信息
var turnstr = ' ';

//收益信息
var turnresult = new Array;

//签到奖励
var sign_result = new Array;
var hisresult;
sign()

function sign() {
  dosignhis().then((data) => {
    if (hisresult) {
     if (hisresult.has_signed_in_today) {
        signresult = `签到结果: 重复❗ 已连续签到${hisresult.current_day+1}天`;
        turnstr=turnstr+'无';
        doNotify();
        sy.done()
      }
      else {
        dosign().then((data) => {
            doturnover(1,200).then((data) => {
              doshare().then((data) => {

                doturnover(2,delay).then((data) => {
      
                  doNotify();
                  sy.done()
                })
              })
          })
        })
      }
    }
  });



function dosign() {
  return new Promise(resolve => {
    setTimeout(() => {
     try {
        var endurl = '/rest/n/nebula/sign/'
        url = { url: `https://nebula.kuaishou.com/rest/n/nebula/sign/sign`, headers: headerscommon }
        if (cookieVal == undefined || cookieVal == "0" || cookieVal == null) {
          sy.msg(cookieName, "未获取Cookie", '');
          return;
        }
      sy.post(url, (error, response, data) => { 
      sy.log(`${cookieName}, cookieVal`)
   
         var obj = JSON.parse(data);
          if (result.result == 1) {
            signresult = `签到结果: 成功🎉 ${result.data.toast}`
            sign_result = obj;

          } else if (result.result == 10007) {
            signresult = `签到结果: ${result.error_msg}`

          }
           else if(result.result == 10901){
        signresult = `签到结果: 今日已签到`
      
         } else {
        signresult = `签到结果: 未知`
          } 
          resolve('done');
        })
      }
      catch (err) {
        resolve('done')
        sy.log(signresult)
        sy.msg(signresult)
      }
      //sy.done()
     })
    })
  }

 
function cash() {

  return new Promise(resolve => {
    setTimeout(() => {
     try {
        var endurl = '/rest/n/nebula/sign/query'
        url = { url: `https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview`, headers: headerscommon }
        if (cookieVal == undefined || cookieVal == "0" || cookieVal == null) {
          sy.msg(cookieName, "未获取Cookie", '');
          return;
        }
    sy.post(url, (error, response, data) => { 
      sy.log(`${cookieName}, data: ${data}`)
      var obj = JSON.parse(data);
          if (result.result == 1) {
            turnresult = `现金收益:${result.data.allCash}元 金币收益: ${result.data.totalCoin}`
            turnresult = obj;

          } else if (result.result == 10007) {
            turnresult = `${result.error_msg}`

          }
           else if(result.result == 10901){
        signresult = `现金收益:${result.data.allCash}元 金币收益: ${result.data.totalCoin}`
      
         } else {
        signresult = `未知`
          } 
          resolve('done');
        })
      }
      catch (err) {
        resolve('done')
        sy.log(turnresult)
      }
      //sy.done()
     })
    })
  }
function doNotify() {
  var ret = signresult+'\n';

  for (var i = 0; i < turnresult.length; i++) {
    if (turnresult[i].status == 1) {
      ret = ret + '***获得：' + turnresult[i].prizes[0].name + '(' + turnresult[i].prizes[0].amount + ')元🧧\n';
    }
  }
  sy.msg('快手极速版', '', ret);
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
  post = (options, callback) => {
    if (isQuanX()) {
      if (typeof options == "string") options = { url: options }
      options["method"] = "POST"
      $task.fetch(options).then(response => {
        response["status"] = response.statusCode
        callback(null, response, response.body)
      }, reason => callback(reason.error, null, null))
    }
    if (isSurge()) $httpClient.post(options, callback)
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;}
  sy.done()