var app = getApp()
var fileData = require('../../utils/data.js')

// pages/TrainingItemTodoList/TrainingItemTodoList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存储单个训练计划
    trainPlanData:{
      team_id: 0, // 其实是team_list的下标
      training_class: '训练',  // 其实是training_class_list的下标 0表示训练 1表示测试
      title: '',
      description: '',
      training_date: '2018-6-30',
      indicators:[],
      references:[],
    },
    indi_index: 0, // indi_index是训练计划中项目的数目 用于检查数据的准确性

    team_name_list: [],  
    team_id_list:[],
    selected_team_name:'none',
    training_class_list: ['训练', '测试'],
    training_class: 0,
    title: '',
    description: '',
    state: ['草稿', '发布'],
    training_date: '2018-09-01',
    just_added_item_info: {
      name: '',
      totalGroup: 0,
      num_perGroup: 0,
      train_model: '',
      units: '',
      require_perGroup: 0,
    },
    list: [],         // 已有的项目列表
    members: [],


    colors: ['red', 'orange', 'yellow', 'green', 'purple'],
    // banner 初始化
    banner_url: fileData.getBannerData(),
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    curNavId: 1,
  },
  // picker的下标需要在下面这三个函数更新
  forTeamChange: function (e) {
    var that = this
    var str_team_id = 'trainPlanData.team_id'
    that.setData({
      // 'meta.team_id': e.detail.value
       [str_team_id]:that.data.team_id_list[e.detail.value],
      selected_team_name: that.data.team_name_list[e.detail.value],
    })
  },
  trainingClassChange: function (e) {
    var that = this
    //var str_training_class = 'trainPlanData.training_class'
    that.setData({
      training_class: e.detail.value
    })
  },
  executeTimeChange: function (e) {
    var that = this
    var str_training_date = 'trainPlanData.training_date'
    // var t_date=new Date(e.detail.value).toLocaleString
    console.log(e.detail.value)
    // console.log(t_date)
    that.setData({
      [str_training_date]: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    // 获取创建的队伍 
    var createdTeam = ''
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
        createdTeam = res.data.data
        console.log(createdTeam)
        var t_team_id_list = that.data.team_id_list
        var t_team_name_list=that.data.team_name_list
        for (var i = 0; i < createdTeam.length; i++) {
          t_team_id_list.push(createdTeam[i].team_id)
          t_team_name_list.push(createdTeam[i].name)
        }
        var str_team_id = 'trainPlanData.team_id'
        if (t_team_id_list.length != 0) {
          that.setData({
            team_id_list: t_team_id_list,
            team_name_list:t_team_name_list,
            selected_team_name: t_team_name_list[0],
            [str_team_id]:t_team_id_list[0]
          })
        }
      }
    })

    /*  数据缓存的方式需要
    try {
      var train_item_info = wx.getStorageSync('train_item_info');
      if (train_item_info) {
        var count = that.data.indi_index +1;
        that.data.indi_index = count;
        that.data.indicators = that.data.indicators.concat(train_item_info)
        that.setData({
          indi_index: that.data.indi_index,
          indicators: that.data.indicators
        });
      }
    } catch (e) {
      console.log('没有添加训练项目')
    };
    */
    // that.setData({
    //   team_list: ['龙舟队', '赛艇队'],  // 计划的目标队伍，仅供局部测试
    //   //list: fileData.getIndexNavSectionData(),
    // })
    console.log('训练项目信息')
    console.log(that.data.indi_index)
    console.log(that.data.trainPlanData.indicators)
  },
  ToAddorEditPlans:function() {
    var that = this
    var str = 'add'
    console.log(that.data.trainPlanData.team_id)
    wx.navigateTo({
      url: '../AddorEditPlans/AddorEditPlans?flag=' + str + '&team_id=' + that.data.trainPlanData.team_id
    })
  },
  edit_item: function (event) {
    console.log('点击修改某个项目')
    console.log('待修改的项目信息')
    var want_edit_item = event.currentTarget.dataset.item
    var item_index = event.currentTarget.dataset.index
    console.log(want_edit_item) 
    wx.navigateTo({
      url: '../AddorEditPlans/AddorEditPlans?flag=' + 'edit' + '&item_index=' + item_index + '&old_item_name=' +want_edit_item.name + '&index_name=' + want_edit_item.index_name+'&index_style='+want_edit_item.index_style+'&totalGroup='+want_edit_item.totalGroup+'&num_perGroup='+want_edit_item.num_perGroup+'&require_perGroup='+want_edit_item.require_perGroup,
    })
  },
  set_trainPlanData: function (e) {
    console.log('计划header信息')
    console.log(e.detail.value)
    var that = this;
    var header_info = e.detail.value;
    var str_team_id = 'trainPlanData.team_id';
    var str_training_class = 'trainPlanData.training_class';
    var str_title = 'trainPlanData.title';
    var str_description = 'trainPlanData.description';
    var str_training_date = "trainPlanData.training_date";
    var str_indicators = 'trainPlanData.indicators';
    that.setData({
      [str_team_id]: header_info.team_id,
      [str_training_class]: that.data.training_class_list[header_info.training_class],
      [str_title]: header_info.title,
      [str_description]: header_info.description,
      [str_training_date]: header_info.training_date,
      // [str_indicators]: 已经在添加或修改项目中更新
    })
  },
  formSubmit: function (e) {
    console.log("提交")
    console.log(e)
    var that = this
    //var c = "trainPlanData[1].indicators"
    //that.data.trainPlanData = that.data.trainPlanData.concat(e.detail.value)
    that.set_trainPlanData(e)
    //console.log(that.data.trainPlanData)
    if (!that.dataIsValid(that.data.trainPlanData)) {
      return;
    } else {
      console.log('训练计划信息')
      console.log(that.data)
      console.log(that.data.trainPlanData)
      // 上传给服务器这一次的训练计划  
      wx.request({
        url: 'https://itraining.zhanzy.xyz/api/v1/schedule',
        method: "POST",
        header: {
          'Cookie': wx.getStorageSync("set-cookie")
        },
        data:{
          team_id: that.data.trainPlanData.team_id,
          title: that.data.trainPlanData.title,
          training_class: that.data.trainPlanData.training_class,
          description: that.data.trainPlanData.description,
          state:"发布",
          training_date: that.data.trainPlanData.training_date,
          references: that.data.trainPlanData.references
        },
        success:function(res) {
          console.log(res)
          that.showErrorToast("发布成功")
          // 返回到个人中心页面
          wx.navigateBack({
            delta: 1
          })
        },
        fail:function(res) {
          console.log(res)
        }
      })

      //这里暂时用数据缓存来方便后面打卡取这个计划
      // wx.setStorageSync('single_trainPlanData', that.data.trainPlanData)

      
    }
  },
  showErrorToast: function (message) {
    wx.showToast({
      title: message,
      icon:'none',
      duration: 1000,
    })
  },
  SaveToDrafts:function() {
    console.log("暂存草稿")
  },
  dataIsValid: function (trainPlanData) {
    var that = this
    console.log("data is valid")
    console.log(trainPlanData)
    if (that.data.indi_index == 0) {  // 如果训练项目数目为0
      that.showErrorToast("请添加训练项目")
      return false;
    } else if(trainPlanData.description==""){
      that.showErrorToast("计划简介不能为空")
      return false
    } else if(trainPlanData.title == "") {
      that.showErrorToast("计划标题不能为空")
      return false
    } else {
      if (trainPlanData.training_class == '测试') {
        // 如果是测试计划 那就只能有一个训练项目
        if (that.data.indi_index != 1) {
          that.showErrorToast("测试计划只允许添加一个项目")
          return false;
        }
      }
    }
    return true;
  },
  // 加载更多
  loadMore: function (e) {
    console.log('加载更多')
    var curid = this.data.indi_index

    if (this.data.trainPlanData.indicators[curid].length === 0) return

    var that = this
    var str_indicators = 'trainPlanData.indicators'
    that.data.trainPlanData.indicators[curid] = that.data.trainPlanData.indicators[curid].concat(that.data.trainPlanData.indicators[curid])
    that.setData({
      [str_indicators]: that.data.trainPlanData.indicators,
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
    var that =this
    console.log('已经添加的训练项目数和项目信息')
    console.log(this.data.indi_index)
    console.log(this.data.trainPlanData.references)
    this.setData({
      'trainPlanData.indicators': that.data.trainPlanData.references
    })
    console.log(this.data.trainPlanData.indicators)    
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