        
/*        var title = `电视节目预告`+``+ tv + `当前节目` 
        var subtitle = `    `+`电视台` +`             `+ `播出时间` +`           `+` `+ `节目` 
        var detail = tv + "    "+  time + "    " +prm
        $notify(title, subtitle, detail);

}, reason => {
    $notify("错误", "", reason.error);
});
*/


var c = 'cctv4'
var wurl = {
    url: "http://api.cntv.cn/epg/epginfo?serviceId=cbox&c=" + c,
};

$task.fetch(wurl).then(response => {
        var obj = JSON.parse(response.body);
        var tv = obj.cctv4.channelName;
        var prm = obj.cctv4.program[i].t;
        var time = obj.cctv4.program[i].showTime;
        var d = new Date()
        var h = d.getHours()
        var m = d.getMinutes()
        let t = time.split(':')    
        var a = t[0]        
        var b = t[1]
    
        var title = `电视节目预告`+ ``
        var subtitle = `    `+`电视台` +`             `+ `播出时间` +`           `+` `+ `节目` 

        var detail = tv + "    "+  time + "    " +prm  
      var  g = [obj.cctv4.program]

      for (i = 0; i < 36; i++)
      {
        return  obj.cctv4.program[i].t

      }
        

        $notify(title, subtitle, detail);

}, reason => {
    $notify("错误", "", reason.error);
});
 

