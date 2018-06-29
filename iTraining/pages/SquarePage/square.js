// pages/SquarePage/square.js
var util = require('../../utils/util.js');

const app = getApp()
Page({

  
  data: {
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
  switchNav: function (e) {
    console.log(e);
    this.setData({
      currentNavTab: e.currentTarget.dataset.idx
    });
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
      url: '/pages/trainingItemList/trainingItemList',
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
      url: '/pages/foodArticleList/foodArticleList',
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