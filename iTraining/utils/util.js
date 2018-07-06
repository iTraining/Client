const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}  

function getNowDate() {
  //获取当前时间戳
  var timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  console.log("当前时间戳为：" + timestamp);
  //获取当前时间
  var n = timestamp * 1000;
  var date = new Date(n);
  var year = date.getFullYear();
  var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var YY_MM_DD = year.toString() + "-" + month.toString() + "-" + day.toString()
  return YY_MM_DD;
}
function getOtherDate(today, addDayCount) {
  /*
   today 是需要计算的某一天的日期例如"2017-07-07"，传 null 默认今天，
   addDayCount 是要推算的天数， -1是前一天，0是今天，1是后一天，以此类推
   */
  var dd;
  if (today) {
    dd = new Date(today);
  } else {
    dd = new Date();
  }
  dd.setDate(dd.getDate() + addDayCount); //获取addDayCount天后的日期 
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;//获取当前月份的日期 
  var d = dd.getDate();
  if (m < 10) {
    m = '0' + m;
  };
  if (d < 10) {
    d = '0' + d;
  };
  return y + "-" + m + "-" + d;
}
module.exports = {
  getNowDate: getNowDate,
  getOtherDate: getOtherDate,
  json2Form:json2Form,
  formatTime: formatTime,
  // trainingitem: trainingitem,
  // default_indicator: default_indicator
}

