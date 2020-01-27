/*
iQIYI VIP Checkin Get Cookie.

About the author:
If reproduced, indicate the source
Telegram channel: @NobyDa
Telegram bots: @NobyDa_bot

说明: 当爱奇艺应用程序打开，点击“我的” ，如果通知获得 cookie 成功，您可以使用签入脚本。 因为脚本会自动判断 cookie 是否被更新，所以你不需要手动禁用它。 剧本每天早上9点上演。 您可以修改执行时间。 请注意，以下配置只是一个本地脚本配置，请将两个脚本放入 Quantumult x / script，cookie 脚本只适用于中国苹果商店的爱奇艺应用程序

[rewrite_local]
# Get iQIYI cookie. 【QX TF188+】:
https?:\/\/.*\.iqiyi\.com\/.*authcookie= url script-request-header Sunert/Task/iQIYI_GetCookie_QX.js

# MITM = *.iqiyi.com

[task_local]
0 9 * * * iQIYI_DailyBonus_QX.js

*/

var regex = /authcookie=([A-Za-z0-9]+)/;
var iQIYI = regex.exec($request.url)[1];

if ($prefs.valueForKey("CookieQY") != undefined) {
  if ($prefs.valueForKey("CookieQY") != iQIYI) {
    var cookie = $prefs.setValueForKey(iQIYI, "CookieQY");
    if (!cookie) {
      $notify("更新爱奇艺签到Cookie失败‼️", "", "")
    } else {
      $notify("更新爱奇艺签到Cookie成功 🎉", "", "")
    }
  }
} else {
  var cookie = $prefs.setValueForKey(iQIYI, "CookieQY");
  if (!cookie) {
    $notify("首次写入爱奇艺Cookie失败‼️", "", "")
  } else {
    $notify("首次写入爱奇艺Cookie成功 🎉", "", "")
  }
}
$done({})