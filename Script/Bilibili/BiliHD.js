/*
bilibili fan drama open 1080P+

QX:
^https?:\/\/api\.bilibili\.com\/(pgc\/player\/api\/playurl|x/vip/web/user/|x/web-interface/nav\?) url script-response-body Bilivip.js

QX MITM = api.bilibili.com
*/

var body = $response.body;
var url = $request.url;

const path1 = '/pgc/player/api/playurl';
const path2 = "/vip/web/user/";
const path3 = "/web-interface/nav\?";

if (url.indexOf(path1) != -1) {
    let obj = JSON.parse(body);   
    obj["has_paid"] = true;
	obj["quality"] = obj["accept_quality"][0];
	obj.vip_type = 2;
	obj.vip_status = 1;
 	body = JSON.stringify(obj);  
 };

if (url.indexOf(path2) != -1){
let obj = JSON.parse(body);
 obj["data"]["vip"]["vip_status"] = 1;
  obj.data["vip"]["vip_type"] = 2;
  obj.data["vip"]["vip_pay_type"] = 1;
  obj.data["vip"]["vip_due_date"]=1669824160000;
   obj["data"]["vip"]["theme_type"] = 2;
   obj.data["pay"]["couponBalance"] =10000;
   obj.data["point"]["balance"]= 8888;
  obj.data["music"] = 1000;
body=JSON.stringify(obj);
};
if (url.indexOf(path3) != -1){
let obj = JSON.parse(body);
  obj.data["vipStatus"] = 1;
  obj.data["vipType"] = 2;
  obj.data.has_shop = true;
  obj.data.officialVerify["type"]= 1;
  obj.data["vip_pay_type"]= 1;
  obj.data.vip_theme_type = 1;
  obj.data.vipDueDate = 1669824160;
  obj.data["level_info"]["current_level"] = 9;
body=JSON.stringify(obj);
};

$done({body});