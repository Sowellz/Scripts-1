/*
先把music.163.com加到[MITM]
把neteasemusic.cookie.js和neteasemusic.js传到On My iPhone - Quantumult X - Scripts (传到 iCloud 相同目录也可, 注意要打开 quanx 的 iCloud 开关)
再把两条脚本分别放到[rewrite_local]和[task_local]
浏览器访问并登录: https://music.163.com/m/login
打开浏览器访问: https://music.163.com/m/
QuanX提示: Cookie [网易云音乐] 写入成功
最后就可以把[rewrite_local]的脚本注释掉了
第 1 条脚本是用来获取 cookie 的, 用浏览器访问一次获取 cookie 成功后就可以删掉或注释掉了, 但请确保在登录成功后再获取 cookie.
[MITM]
music.163.com

[rewrite_local]
# 189及以前版本
^https:\/\/music\.163\.com\/m\/?.? url script-response-body Sunert/Task/neteasemusic.cookie.js
# 190及以后版本
^https:\/\/music\.163\.com\/m\/?.? url script-request-header Sunert/Task/neteasemusic.cookie.js

[task_local]
1 0 * * * neteasemusic.js

*/
const cookieName = '网易云音乐'
const cookieKey = 'chavy_cookie_neteasemusic'
const cookieVal = $request.headers['Cookie']

if (cookieVal) {
  let cookie = $prefs.setValueForKey(cookieVal, cookieKey)
  if (cookie) {
    let msg = `${cookieName}`
    $notify(msg, 'Cookie写入成功', '详见日志')
    console.log(msg)
    console.log(cookieVal)
  }
}

$done({})
