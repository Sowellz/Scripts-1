let obj = JSON.parse($response.body);
    obj.data.userId= "288053317541241856";
    obj.data.phone= "18532658412";
    obj.data.expired= "true";
    obj.data.expireTime= "2021-03-08 21:16:15";
    obj.data.signedDuration= 360;
    obj.data.loginTime= "2020-02-08 21:16:15";
             
　$done({body: JSON.stringify(obj)});
