// pages/SquarePage/square.js
var util = require('../../utils/util.js');

const app = getApp()
Page({
  data: {
    account_moment: 0,        // 动态的条数
    moment_list: [],       // 动态列表
    punch_date_list: [],      // 与动态信息列表相对应
    /*
    moment_list: [
      {avator: '', nickname: '', title: '', description: '',
      image_url: '', punch_date: '2018-06-06'},
      {avator: '', nickname: '', title: '', description: '',
      image_url: '', punch_date: '2018-06-06'},
      ...
    ]
    */
    indi_index: 0,            // indi_index是动态的数目 用于检查数据的准确性
    //imageList: [],
    userInfo: {},





    //punch_list: []  // 每一个元素都是每个用户的打卡内容呀（心得+若干张图片）

    navTab: ["干货", "动态"],
    currentNavTab:"0",
    location: '',
    county: '',
    today: "",
    weatherData: '',
    air: '',
    dress: ''
  },
  // 切换
  switchNav: function (e) {  // 向服务器获取动态信息前需要传起始和截止日期的时间
  var that = this
    console.log(e);
    this.setData({
      currentNavTab: e.currentTarget.dataset.idx
    });
    var now_date = util.getNowDate()
    var ee_date = util.getOtherDate(now_date, 1)
    var bb_date = util.getOtherDate(ee_date, -3)
    console.log("明天是", ee_date)
    console.log("明天的三天前是", bb_date )
    // 要在这里向服务器获取moment数据
    wx.request({
      url: 'https://itraining.zhanzy.xyz/api/v1/moment',
      data: {
        b_date: bb_date,
        e_date: ee_date,
      },
      header: {
        'Cookie': wx.getStorageSync("set-cookie")
      },
      method: "GET",
      success: function (res) {
        console.log("动态信息：")
        console.log(res.data.data)
        that.setData({
          moment_list: res.data.data,
          account_moment: res.data.data.length,
        })
        // 调整一下时间格式
        for (var i = 0; i < that.data.account_moment; ++i) {
          var date = that.data.moment_list[i].punch_date
          var punch_date = (new Date(date)).toLocaleString()
          that.data.punch_date_list = that.data.punch_date_list.concat(punch_date)
        }
        that.setData({
          punch_date_list: that.data.punch_date_list
        })
        console.log("调整时间格式后的动态发布时间")
        console.log(that.data.punch_date_list)
      },
       fail: function (res) {
        console.log("错误获取动态信息", res)
      }
    })
  },
  onLoad: function (options) {

    //更新当前日期
    app.globalData.day = util.formatTime(new Date()).split(' ')[0];
    this.setData({
      today: app.globalData.day
    });
    //定位当前城市
    this.getLocation();
  },
  loadMore: function (e) {
    console.log('加载更多')
    var curid = this.data.indi_index
    if (this.data.moment_list[curid].length === 0) return
    var that = this
    that.data.moment_list[curid] = that.data.moment_list[curid].concat(that.data.moment_list[curid])
    that.setData({
      moment_list: moment_list,
    })
  },
  getLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        //当前的经度和纬度
        let latitude = res.latitude
        let longitude = res.longitude
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${app.globalData.tencentMapKey}`,
          success: res => {
            app.globalData.defaultCity = app.globalData.defaultCity ? app.globalData.defaultCity : res.data.result.ad_info.city;
            app.globalData.defaultCounty = app.globalData.defaultCounty ? app.globalData.defaultCounty : res.data.result.ad_info.district;
            that.setData({
              location: app.globalData.defaultCity,
              county: app.globalData.defaultCounty
            });
            that.getWeather();
            that.getAir();
          }
        })
      }
    })
  },

  getWeather: function (e) {
    var length = this.data.location.length;
    var city = this.data.location.slice(0, length - 1); //分割字符串
    console.log(city);
    var that = this;
    var param = {
      key: app.globalData.heWeatherKey,
      location: city
    };
    //发出请求
    wx.request({
      url: app.globalData.heWeatherBase + "/s6/weather",
      data: param,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        app.globalData.weatherData = res.data.HeWeather6[0].status == "unknown city" ? "" : res.data.HeWeather6[0];
        var weatherData = app.globalData.weatherData ? app.globalData.weatherData.now : "暂无该城市天气信息";
        var dress = app.globalData.weatherData ? res.data.HeWeather6[0].lifestyle[1] : { txt: "暂无该城市天气信息" };
        that.setData({
          weatherData: weatherData, //今天天气情况数组 
          dress: dress //生活指数
        });
      }
    })
  },
  //获取当前空气质量情况
  getAir: function (e) {
    var length = this.data.location.length;
    var city = this.data.location.slice(0, length - 1);
    var that = this;
    var param = {
      key: app.globalData.heWeatherKey,
      location: city
    };
    wx.request({
      url: app.globalData.heWeatherBase + "/s6/air/now",
      data: param,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        app.globalData.air = res.data.HeWeather6[0].status == "unknown city" ? "" : res.data.HeWeather6[0].air_now_city;
        that.setData({
          air: app.globalData.air
        });
      }
    })
  },

  TurnToTrainingItemList:function() {
    wx.navigateTo({
      url: '/pages/finishItemAndRelease/finishAndRelease',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  TurnToInjuryArticlesList:function() {
    wx.navigateTo({
      url: '/pages/injuryArticleList/injuryArticleList',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  TurnToFoodArticlesList:function(){
    wx.navigateTo({
      url: '/pages/trainingPlanPage/trainingPlanPage',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})