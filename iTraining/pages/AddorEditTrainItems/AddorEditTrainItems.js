// pages/AddorEditTrainItems/AddorEditTrainItems.js
var fileData = require('../../utils/data.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meta: {
      team_id: "none",
      training_name: '',
      index1: '无',
      index2: '无',
      index3: '无',
      index4: '无',
      index5: '无',
      index6: '无',
    },  //跟数据库交互的数据
    add: true,
    old_item_name: '',

    objArray: [
      {
        index_default_indicator: 0,
        indicator_name: ['distance', 'time', 'weigh', 'frquency', 'friction', 'rest_time', 'amount'],
        indicator_unit: ['km', 'min', 'kg', 'number/min', 'thisisfengzu', 'min', 'number']
      },
      {
        index_default_indicator: 0,
        indicator_name: ['distance', 'time', 'weigh', 'frquency', 'friction', 'rest_time', 'amount'],
        indicator_unit: ['km', 'min', 'kg', 'number/min', 'thisisfengzu', 'min', 'number']
      },
      {
        index_default_indicator: 0,
        indicator_name: ['distance', 'time', 'weigh', 'frquency', 'friction', 'rest_time', 'amount'],
        indicator_unit: ['km', 'min', 'kg', 'number/min', 'thisisfengzu', 'min', 'number']
      },
      {
        index_default_indicator: 0,
        indicator_name: ['distance', 'time', 'weigh', 'frquency', 'friction', 'rest_time', 'amount'],
        indicator_unit: ['km', 'min', 'kg', 'number/min', 'thisisfengzu', 'min', 'number']
      },
      {
        index_default_indicator: 0,
        indicator_name: ['distance', 'time', 'weigh', 'frquency', 'friction', 'rest_time', 'amount'],
        indicator_unit: ['km', 'min', 'kg', 'number/min', 'thisisfengzu', 'min', 'number']
      },
      {
        index_default_indicator: 0,
        indicator_name: ['distance', 'time', 'weigh', 'frquency', 'friction', 'rest_time', 'amount'],
        indicator_unit: ['km', 'min', 'kg', 'number/min', 'thisisfengzu', 'min', 'number']
      },
    ],  /* 用于for循环显示多个picker 数组的每个元素都是一个选择器*/
    team_id_list: [],
    team_name_list:[],
    team_id: 0,
    number_Indicator: 0,  // 要添加的指标数 即objArray的长度
    Max_number_Indicator: 6,  // 允许用户最多添加的指标数
    item_name: '',
    havedIndicator_list: [],  // 用户从default_indicator选择出的indicator,下标对应顺序应当和objArray的下标顺序一致
    pick_indicator: 0,
    selected_team_name:'none',
  },
  
  getItemName: function (e) {
    var that = this
    that.setData({
      item_name: e.detail.value,
    })
  },
  getTeam_id:function(e) {
    var that=this
    that.setData({
      'meta.team_id': e.detail.value,
    })
  },
  getNumberIndicator: function (e) {
    var that = this
    var num = e.detail.value
    console.log('用户输入的关联指标数为')
    console.log(e.detail.value)
    if (num > that.data.Max_number_Indicator) {
      that.showErrorToast("指标数最多为6")
    } else {
      that.setData({
        number_Indicator: e.detail.value,
      })
      console.log('默认关联指标列表为')
      console.log(that.data.objArray)
    }
  },
  forTeamChange: function (e) {
    var that = this
    var str_team_id = 'meta.team_id'
    that.setData({
      // 'meta.team_id': e.detail.value
      'meta.team_id': that.data.team_id_list[e.detail.value],
      selected_team_name:that.data.team_name_list[e.detail.value]
    })
    console.log("set team id ")
    console.log(that.data.meta.team_id)
  },
  indicator_change: function (e) {
    var that = this
    // e携带的自定义属性current来标记objArray里每个one_obj所对应的下标
    const curindex = e.target.dataset.current
    console.log('参数为')
    console.log(curindex)

    // 根据下标 改变该one_obj中的index_default_indicator值,同时改变havedIndicator_list
    that.data.objArray[curindex].index_default_indicator = e.detail.value
    that.data.havedIndicator_list[curindex] = that.data.objArray[curindex].indicator_name[e.detail.value]
    // 把改变某个one_obj的index_default_indicator值之后的全新objArray重新赋值给objArray, 同时更新havedIndicator_list
    that.setData({
      objArray: that.data.objArray,
      havedIndicator_list: that.data.havedIndicator_list,
    })
    console.log("用户添加的关联指标信息")
    console.log(that.data.havedIndicator_list)
  },
  setItemInfo: function() {
    var that = this
    // team_id已经在picker事件中设置
    var str_training_name = 'meta.training_name'
    var str_index1 = 'meta.index1'
    var str_index2 = 'meta.index2'
    var str_index3 = 'meta.index3'
    var str_index4 = 'meta.index4'
    var str_index5 = 'meta.index5'
    var str_index6 = 'meta.index6'

    // 已经事先在onLoad函数里给havedIndicator_list设置为最大数目6了 但好像没用
    var length = that.data.havedIndicator_list.length
    for (var i = length; i < that.data.Max_number_Indicator; i++) {
      that.data.havedIndicator_list[i] = '无'
    }
    that.setData({
      havedIndicator_list: that.data.havedIndicator_list,
    })
    console.log('项目指标信息')
    console.log(that.data.havedIndicator_list)
    that.setData({
      'meta.training_name': that.data.item_name,
      'meta.index1': that.data.havedIndicator_list[0],
      'meta.index2': that.data.havedIndicator_list[1],
      'meta.index3': that.data.havedIndicator_list[2],
      'meta.index4': that.data.havedIndicator_list[3],
      'meta.index5': that.data.havedIndicator_list[4],
      'meta_index6': that.data.havedIndicator_list[5]
    })
  },
  isValid: function () {
    var that = this
    console.log('添加的项目信息是')
    console.log(that.data.meta)
    if (that.data.meta.training_name == '') {
      that.showErrorToast("项目名称不能为空")
      return false
    } else if (that.data.number_Indicator == 0) {
      that.showErrorToast("请添加1~6个项目指标")
      return false
    } else {
      // 判断添加的指标是否重复
      var indicators = that.data.havedIndicator_list
      for (var i = 0; i < that.data.number_Indicator; i++) {
        for (var j = i + 1; j < that.data.number_Indicator; j++) {
          if (indicators[i] == indicators[j]) {
            that.showErrorToast("项目指标不能重复")
            return false
          }
        }
      }
    }
    return true
  },
  sure: function (e) {
    var that = this
    that.setItemInfo()
    if (!that.isValid()) {
      return;
    } else {
      console.log('添加的项目信息是')
      console.log(that.data.meta)
      console.log(that.data.meta.team_id)
      // 上传给服务器
      
      wx.request({
        url: 'https://itraining.zhanzy.xyz/api/v1/schedule/meta',
        header: {
          'Cookie': wx.getStorageSync("set-cookie")
        },
        data: {
          team_id:that.data.meta.team_id,
          training_name: that.data.meta.training_name,
          index1: that.data.meta.index1,
          index2: that.data.meta.index2,
          index3: that.data.meta.index3,
          index4: that.data.meta.index4,
          index5: that.data.meta.index5,
          index6: that.data.meta.index6,          
        },
        method: "POST",
        success: res => {
            console.log("添加项目信息成功")
            console.log(res)
        },
        fail:function(res) {
          console.log("添加项目信息失败")
          console.log(res)
        }
      })
      
      // 暂时用全局变量的方式
      var old_amount_meta = app.globalData.amount_meta
      var old_meta_list = app.globalData.meta_list

      console.log('用户添加项目前全局的项目信息如下')
      console.log(old_meta_list)

      app.globalData.amount_meta = old_amount_meta + 1
      app.globalData.meta_list = old_meta_list.concat(that.data.meta)

      console.log('用户添加项目后全局的项目信息如下')
      console.log(app.globalData.meta_list)

      wx.navigateBack({
        delta: 1
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    // 获取创建的队伍 
    var createdTeam=''
    wx.request({
      url: 'https://itraining.zhanzy.xyz/api/v1/team',
      method: "GET",
      header: {
        'Cookie': wx.getStorageSync("set-cookie")
      },
      data: {
        option: 'created'
      },
      success: function (res) {
        console.log("获取队伍信息成功")
        console.log(res)
        console.log(res.data.data)
        createdTeam=res.data.data
        console.log(createdTeam)
        var t_team_name_list = that.data.team_name_list
        var t_team_id_list=that.data.team_id_list
        for (var i = 0; i < createdTeam.length; i++) {
          t_team_name_list.push(createdTeam[i].name)
          t_team_id_list.push(createdTeam[i].team_id)
        }
        if(t_team_id_list.length!=0) {
          that.setData({
            team_id_list:t_team_id_list,
            team_name_list:t_team_name_list,
            'meta.team_id':t_team_id_list[0],
            'selected_team_name': t_team_name_list[0],
          })
        }
      },
      fail: function (res) {
        console.log("获取队伍信息失败")
        console.log(res)
      }
    })

    
   /*
    var default_indicator = fileData.getDefaultIndicator()
    var name_list = []
    var unit_list = []
    for (var i = 0; i < default_indicator.length; i++) {
      name_list = name_list.concat(default_indicator[i].id)
      unit_list = unit_list.concat(default_indicator[i].unit)
    }
    var str_indicator_name = 'one_obj.indicator_name';
    var str_indicator_unit = 'one_obj.indicator_unit';
    that.setData({
      [str_indicator_name]: name_list,
      [str_indicator_unit]: unit_list,
    })
    console.log("one_obj是")
    console.log(that.data.one_obj)*/
    console.log("接受到的参数是");
    console.log(options)
    if (options.flag != 'add') {  // 如果不是'add'那就是要修改
      // 修改该项目的指标信息
    } else {
      // 初始化Max_number_Indicator个指标信息
      for (var i = 0; i < that.Max_number_Indicator; i++) {
        that.data.havedIndicator_list = that.data.havedIndicator_list.concat('')
      }
      that.setData({
        havedIndicator_list: that.data.havedIndicator_list
      })
      // 添加该项目的指标信息
    }
  },
  showErrorToast: function (message) {
    wx.showToast({
      title: message,
      duration: 1000,
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