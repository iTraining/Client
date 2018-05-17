/**
 * banner数据
 */
function getBannerData() {
  var arr = ['../../images/banner_01.png', '../../images/banner_02.png', '../../images/banner_03.png', '../../images/banner_04.png']
  return arr
}

function getDate() {
  var arr=[
    [
      {
        month:"5",
        day:"17",
        trainingItem:"深蹲，臥推"
      },
      {
        month:"5",
        day:"16",
        trainingItem: "深蹲,測功儀"
        
      },
      {
        month: "5",
        day:"14",
        trainingItem:"跑步"
      }
  ]]
  return arr;
}
/*
 * 首页 对应 标签 数据项
 */
function getIndexNavSectionData() {
  var arr = [

    [
      {
        subject: "前平推",
        coverpath: "../../image/trainingItem/strength/weightlifting.png",
        numOfGroups: '4',
        amount: '45kg',
        message: '提升性能力'
      },
      {
        subject: "深蹲",
        coverpath: "../../image/trainingItem/strength/weightlifting.png",
        numOfGroups: '4',
        amount:'45kg',
        message: '提升性能力'
      },
      {

        subject: "弓步蹲",
        coverpath: "../../image/trainingItem/strength/lunge.png",
        numOfGroups: '2',
        amount: '100m',
        message: '锻炼大腿'
      },
      {
        subject: "测功仪",
        coverpath: "../../image/trainingItem/resistance/rowingmachine.png",
        numOfGroups: '2',
        amount: '3000m',
        message: '陆上赛艇'
      },
      {

        subject: "卧推",
        coverpath: "../../image/trainingItem/strength/benchpress.png",
        numOfGroups: '4',
        amount: '50kg',
        message: '对上肢伸肌和胸大肌有显著作用'
      },
      {

        subject: " 平板支撑",
        coverpath: "../../image/trainingItem/strength/plank.png",
        numOfGroups: '4',
        amount: '2mins',
        message: '锻炼核心肌群，让你瘦得更健康，远离下背疼痛。'
      }
    ]
  ]
  return arr
}



module.exports = {
  getDate:getDate,
  getBannerData: getBannerData,
  getIndexNavSectionData: getIndexNavSectionData
}
