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

// var training_item = trainingitem()
// function trainingitem() {
//   var arr = [
//     {
//       id: '力量', content: [
//         {
//           "name": "深蹲",
//           "image": "/image/trainingItem/strength/weightlifting.png"
//         },
//         {
//           "name": "弓箭步",
//           "image": "/image/trainingItem/strength/lunge.png"
//         },
//         {
//           "name": "平板支撑",
//           "image": "/image/trainingItem/strength/plank.png"
//         },
//         {
//           "name": "仰卧起坐",
//           "image": "/image/trainingItem/strength/sit-up.png"
//         }
//       ]
//     },
//     {
//       id: '耐力', content: [
//         {
//           "name": "测功仪",
//           "image": "/image/trainingItem/resistance/rowingmachine.png"
//         },
//         {
//           "name": "跑步",
//           "image": "/image/trainingItem/resistance/running.png"
//         }
//       ]
//     },
//     {
//       id: '协调性', content: [
//         {
//           "name": "游泳",
//           "image": "/image/trainingItem/harmony/swimming.png"
//         }
//       ]
//     },
//     {
//       id: '水上', content: [
//         {
//           "name": "赛艇-八单",
//           "image": "/image/trainingItem/rowing/rowing8+.png"
//         },
//         {
//           "name": "赛艇-四单无舵",
//           "image": "/image/trainingItem/rowing/rowing4-.png"
//         },
//         {
//           "name": "龙舟",
//           "image": "/image/trainingItem/rowing/dragon.JPG"
//         }
//       ]
//     }
//   ]   // 具体的训练项目
//   return arr
// }
function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}  

module.exports = {
  json2Form:json2Form,
  formatTime: formatTime,
  // trainingitem: trainingitem,
  // default_indicator: default_indicator
}
