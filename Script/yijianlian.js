
var body = $response.body;
var url = $request.url;

const path1 = "\/auth\/user\/profile";
const path2 = "\/notice\/latest";
const path3 = "\/auth\/node\/list";
const path4 = "\/auth\/node\/connect";

if (url.indexOf(path1) != -1){
   let obj = JSON.parse(body);
    obj.data.userId= "288053317541241856";
    obj.data.phone= "18532658412";
    obj.data.expired= "true";
    obj.data.expireTime= "2021-03-08 21:16:15";
    obj.data.signedDuration= 60;
    obj.data.loginTime= "2020-03-05 21:01:15";
    obj.data.signedDays= "6";        
  
 body=JSON.stringify(obj);};


if (url.indexOf(path2) != -1){
   let obj = JSON.parse(body);
    obj.data.count= 360;
    obj.data.latestTime= "2021-03-08 21:16:15";
             
 body=JSON.stringify(obj);};
 
 
if (url.indexOf(path3) != -1){
   let obj = JSON.parse(body);
       obj.message= "执行成功";
       obj.code= 0;
             
 body=JSON.stringify(obj);};


if (url.indexOf(path4) != -1){
   let obj = JSON.parse(body);
       obj.message= "执行成功";
       obj.code= 0;
             
 body=JSON.stringify(obj);};

$done({body});

   