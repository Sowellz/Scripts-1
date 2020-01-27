/*# 此处用于爱奇艺cookie获取，加mitm后打开APP，点击“我的”，待弹出获取成功即可
https:\/\/passport\.iqiyi\.com\/apis\/user\/info\.action.*authcookie url script-request-header Sunert/Task/
*/

var bonus = {
  url: 'https://tc.vip.iqiyi.com/taskCenter/task/queryUserTask?autoSign=yes&P00001=' + $prefs.valueForKey("CookieQY"),
};
$task.fetch(bonus).then(response => {
  var obj = JSON.parse(response.body);
  if (obj.msg == "成功") {
    if (obj.data.signInfo.code == "A00000") {
      console.log("success response: \n" + response.body);
      $notify("爱奇艺签到", "", obj.data.signInfo.msg + "！获得" + obj.data.signInfo.data.acquireGiftList[0] + ", 已连续签到" + obj.data.signInfo.data.continueSignDaysSum + "天 🎉");
    } else {
      console.log("failure response: \n" + response.body);
      $notify("爱奇艺签到", "", "失败, " + obj.data.signInfo.msg + "⚠️");
    }
  } else {
    $notify("爱奇艺签到,Cookie无效‼️‼️", "", response.body);
  }
}, reason => {
  $notify("爱奇艺签到,请求失败‼️‼️‼", "", reason.error);
});