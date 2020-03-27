
var c = "cctv2"
var wurl = {
    url: "http://api.cntv.cn/epg/epginfo?serviceId=cbox&c="+c,
};

$task.fetch(wurl).then(response => {
      var obj = JSON.parse(response.body);
      var tv = obj[`${c}`].channelName;
    //var prm = obj[`${c}`].program[0].t;
    //var time = obj[`${c}`].program[0].showTime;
      //var d = new Date()
      //var h = d.getHours()
      //var m = d.getMinutes()
      //let t = time.split(':')        
      var title = tv + `节目预告`
      var subtitle =`现在播放:`+ obj[`${c}`].isLive      
     
                         detail = obj[`${c}`].program[0].showTime + "    " + obj[`${c}`].program[0].t+ `\n`  +obj[`${c}`].program[1].showTime + "    " + obj[`${c}`].program[1].t + `\n` +obj[`${c}`].program[2].showTime + "    " + obj[`${c}`].program[2].t + `\n` +obj[`${c}`].program[3].showTime + "    " + obj[`${c}`].program[3].t + `\n` +obj[`${c}`].program[4].showTime + "    " + obj[`${c}`].program[4].t + `\n` +obj[`${c}`].program[5].showTime + "    " + obj[`${c}`].program[5].t + `\n` +obj[`${c}`].program[6].showTime + "    " + obj[`${c}`].program[6].t + `\n`+ obj[`${c}`].program[7].showTime + "    " + obj[`${c}`].program[7].t + `\n` +obj[`${c}`].program[8].showTime + "    " + obj[`${c}`].program[8].t + `\n` +obj[`${c}`].program[9].showTime + "    " + obj[`${c}`].program[9].t + `\n` +obj[`${c}`].program[10].showTime + "   " + obj[`${c}`].program[10].t + `\n` +obj[`${c}`].program[11].showTime + "   " + obj[`${c}`].program[11].t + `\n` +obj[`${c}`].program[12].showTime + "   " + obj[`${c}`].program[12].t + `\n` +obj[`${c}`].program[13].showTime + "    " + obj[`${c}`].program[13].t + `\n` +obj[`${c}`].program[14].showTime + "    " + obj[`${c}`].program[14].t + `\n` +obj[`${c}`].program[15].showTime + "    " + obj[`${c}`].program[15].t + `\n` +obj[`${c}`].program[16].showTime + "    " + obj[`${c}`].program[16].t + `\n` +obj[`${c}`].program[17].showTime + "    " + obj[`${c}`].program[17].t + `\n` +obj[`${c}`].program[18].showTime + "    " + obj[`${c}`].program[18].t + `\n` +obj[`${c}`].program[19].showTime + "    " + obj[`${c}`].program[19].t + `\n` +obj[`${c}`].program[20].showTime + "    " + obj[`${c}`].program[20].t + `\n` +obj[`${c}`].program[21].showTime + "    " + obj[`${c}`].program[21].t + `\n` +obj[`${c}`].program[22].showTime + "    " + obj[`${c}`].program[22].t + `\n` +obj[`${c}`].program[23].showTime + "    " + obj[`${c}`].program[23].t + `\n` +obj[`${c}`].program[24].showTime + "    " + obj[`${c}`].program[24].t + `\n` +obj[`${c}`].program[25].showTime + "    " + obj[`${c}`].program[25].t + `\n` +obj[`${c}`].program[26].showTime + "    " + obj[`${c}`].program[26].t + `\n` +obj[`${c}`].program[27].showTime + "    " + obj[`${c}`].program[27].t + `\n` +obj[`${c}`].program[28].showTime + "    " + obj[`${c}`].program[28].t + `\n` +obj[`${c}`].program[29].showTime + "    " + obj[`${c}`].program[29].t + `\n` +obj[`${c}`].program[30].showTime + "    " + obj[`${c}`].program[30].t + `\n` +obj[`${c}`].program[31].showTime + "    " + obj[`${c}`].program[31].t + `\n` +obj[`${c}`].program[32].showTime + "    " + obj[`${c}`].program[32].t + `\n` +obj[`${c}`].program[33].showTime + "    " + obj[`${c}`].program[33].t + `\n` +obj[`${c}`].program[34].showTime + "    " + obj[`${c}`].program[34].t + `\n` +obj[`${c}`].program[35].showTime + "    " + obj[`${c}`].program[35].t + `\n` +obj[`${c}`].program[36].showTime + "    " + obj[`${c}`].program[36].t 
  
    $notify(title, subtitle, detail);

}, reason => {
    $notify("错误", "", reason.error);
});
 

