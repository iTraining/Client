// pages/AddorEditPlans/AddorEditPlans.js
var fileData = require('../../utils/data.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount_meta: 0,
    meta_list: [],
    // indicator_name和indicator_unit弄成了map
    indicator_nameMAPunit: { 'distance': 'km', 'time': 'min', 'weigh':'kg', 'frequency':'number/min', 'friction':'N', 'rest_time':'min', 'amount':'number'},
    train_item_list: [],  // 项目名称列表，供用户选取其中一个项目作为计划之一 在onLoad函数中通过team_id向服务器索取
    index_name: 0,        // 供用户选取项目名称的picker下标

    indicator_name_list: [],  // 与用户选择的项目关联的指标名称
    test_indicator_index: 0,  // 用于测试指标的picker下标
    indicator_unit_list: [],  // 与用户选择的项目关联的指标单位
    indicator_value_list: [],  // 用户输入的指标数值
    training_class: 0,  // training_class为0表示训练，training_class为1表示测试

    item_index: 0,  // 要修改的项目的在references的下标
    edit: false,
    old_item_info: {},  // 想要编辑的项目，如果用户编辑项目时把项目名称改变了，那计划页面就要把之前的项目条款删掉

    train_item_info: {
      group_number: 0,   // 与用户输入事件绑定
      data1: 0,   // data1~6在getIndicatorValue事件中绑定
      data2: 0,
      data3: 0,
      data4: 0,
      data5: 0,
      data6: 0,
      test_index: -1,   // 如果计划类型时测试，那么该test_index与用户选择测试指标picker的事件绑定
      meta_id: 0,
      training_name: '',   // 项目名称绑定在item_name_Change事件中
      /*
      name: '',
      index_name: '',
      totalGroup: 0,
      num_perGroup: 0,
      train_model: '',
      index_style: 0,
      units: '',
      require_perGroup:0,
      */
    },
  },

  item_name_Change: function (e) {   // 用户从这个picker选了某个项目名称 那应该在下面展示出这个项目的关联指标，
    var that = this
    var item_name = that.data.train_item_list[e.detail.value]
    // 去meta_list里去找这个项目的关联指标
    for (var i = 0; i < that.data.amount_meta; i++) {
      if (that.data.meta_list[i].training_name == item_name) {  // 符合条件的i是这个项目在meta_list中的位置
        //that.data.indicator_name_list 是这个项目关联指标的名称
        //that.data.indicator_unit_list 是这个项目关联指标的单位
        var index = []
        index = index.concat(that.data.meta_list[i].index1)
        index = index.concat(that.data.meta_list[i].index2)
        index = index.concat(that.data.meta_list[i].index3)
        index = index.concat(that.data.meta_list[i].index4)
        index = index.concat(that.data.meta_list[i].index5)
        index = index.concat(that.data.meta_list[i].index6)
        var the_indicator_name_list = []
        for (var j = 0; j < 6; ++j) {   // 6是用户在给项目关联指标的上限数目
          if (index[j] != '无') {
            the_indicator_name_list = the_indicator_name_list.concat(index[j])
          }
        }
        // 确定这个项目关联指标的单位
        var the_indicator_unit_list = []
        for (var t1 = 0; t1 < the_indicator_name_list.length; t1++) {
          var unit = that.data.indicator_nameMAPunit[the_indicator_name_list[t1]]
          the_indicator_unit_list = the_indicator_unit_list.concat(unit)
        }
        console.log('当做背景的unit为：')
        console.log(the_indicator_unit_list)
        that.setData({
          'train_item_info.meta_id': i,
          'train_item_info.training_name': item_name,
          indicator_name_list: the_indicator_name_list,
          indicator_unit_list: the_indicator_unit_list,
        })
      }
    }
    that.setData({
      index_name: e.detail.value,
    })
  },

  test_indicator_Change: function (e) {
    var that = this
    var index = parseInt(e.detail.value)
    console.log('项目的测试指标是')
    console.log(index)
    console.log(that.data.indicator_name_list[index])
    that.setData({
      test_indicator_index: index,
      'train_item_info.test_index': index + 1,
    })
  },

  getTotalGroups: function (e) {
    var that = this
    that.setData({
        'train_item_info.group_number': e.detail.value,
    })
  },

  getIndicatorValue: function (e) {
    const curindex = e.target.dataset.current
    console.log('参数为用户输入的指标值对应的指标所在indicator_name_list中的下标')
    console.log(curindex)
    console.log('用户输入值为')
    console.log(e.detail.value)
    var that = this
    var str_data_i = 'train_item_info.data' + (curindex+1)
    that.setData({
      [str_data_i]: e.detail.value
    })
    console.log(str_data_i+'已经被设置为数值：')
    console.log(e.detail.value)
  },

  dataIsValid: function () {
    var that = this
    if (that.data.train_item_info.training_name == "") {
     that.showErrorToast('项目名称不能为空!');
     return false;
    } else if (that.data.train_item_info.group_number == 0 || this.data.train_item_info.group_number == "") {
      that.showErrorToast('完成组数须 > 0 !');
      return false;
    } else {
      if (that.data.train_item_info.data1 == 0 & that.data.train_item_info.data2 == 0 & that.data.train_item_info.data3 == 0 & that.data.train_item_info.data4 == 0 & that.data.train_item_info.data5 == 0 & that.data.train_item_info.data6 == 0) {
        that.showErrorToast('请至少添加一个指标的数值要求!');
        return false;
      }
    }
    return true;
  },
  showErrorToast: function (message) {
    wx.showToast({
      title: message,
      duration: 1000,
    })
  },
  setTrainData:function(e) {
   // 都已经跟相应的事件绑定设置到一块了
  },
  sure: function (e) {
    var that = this
    that.setTrainData()
    console.log('用户添加的项目信息为')
    console.log(that.data.train_item_info)
    if (that.dataIsValid() == false) {
      console.log('输入数据无效')
      return;
    } else {
     var pages = getCurrentPages();
     var prevPage = pages[pages.length - 2];  // 直接调用上一个页面的setData方法
     if (that.data.edit != false) {
       // 如果that.data.edit != false说明是修改或删除
       prevPage.data.trainPlanData.references[that.data.item_index] = that.data.train_item_info
       prevPage.setData({
         indi_index: prevPage.data.indi_index,
         trainPlanData: prevPage.data.trainPlanData,
       })
     } else if (that.data.edit == false) {
        var str_references = 'trainPlanData.references';
        var count = prevPage.data.indi_index + 1;
        prevPage.data.indi_index = count; // indi_index其实就是trainPlanData.indicators的length
        console.log("prev page data train plan data")
        console.log(prevPage.data.trainPlanData.references)
        console.log("train item info ")
        console.log(that.data.train_item_info)

        prevPage.data.trainPlanData.references = prevPage.data.trainPlanData.references.concat(that.data.train_item_info)

        prevPage.setData({
          //indi_index: prevPage.data.indi_index,
          // indicators: prevPage.data.indicators,
          indi_index: count,
          [str_references]: prevPage.data.trainPlanData.references
       })
     }
    }
    console.log('此处应该发生跳转回制定计划页面')
    wx.navigateBack({
      delta: 1
    })
  },
  delete_item: function (e) {
    var that = this
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  // 直接调用上一个页面的setData方法
    if (that.data.old_item_info.training_name != "") {
      // 删除项目，后续可以加再次确认的流程
      var count = prevPage.data.indi_index - 1;
      prevPage.data.indi_index = count;
      prevPage.data.trainPlanData.references.splice(that.data.item_index, 1);
      prevPage.setData({
        indi_index: prevPage.data.indi_index,
        trainPlanData: prevPage.data.trainPlanData,
      })
    } else {
      // 如果该项目并没有被添加
      that.showErrorToast("只可删除已添加的项目")
    }
    wx.navigateBack({
      delta: 1
    })
  },
  giveup: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://itraining.zhanzy.xyz/api/v1/schedule/meta',
      data:{
        team_id:options.team_id
      },
      method: "GET",
      header: {
        'Cookie': wx.getStorageSync("set-cookie")
      },
      success:function(res) {
        var t_training_name_list = that.data.train_item_list        
        console.log(res)
        wx.setStorageSync('meta_data', res.data.data)
        for(var i=0;i<res.data.data.length;i++) {
          t_training_name_list.push(res.data.data[i].training_name)
        }
        that.setData({
          train_item_list:t_training_name_list,
          meta_list:res.data.data
        })

        // 应该通过team_id向从数据库获取，这里 暂时用全局变量的方式
        
        var the_meta_list = res.data.data   // meta_list是team_id对应的项目信息列表
        var the_amount_meta = res.data.data.length
    
        that.data.train_item_list = []
        for (var i = 0; i < the_amount_meta; ++i) {
          that.data.train_item_list = that.data.train_item_list.concat(the_meta_list[i].training_name)
        }
        that.setData({
          amount_meta: the_amount_meta,
          meta_list: the_meta_list,
          train_item_list: that.data.train_item_list   // 用户可以选择的项目名称列表
        })

        if (options.flag == 'edit') {   // flag是'edit'就是要编辑项目信息  即修改或删除
          /* 因此要显示修改前的该项目计划信息,包括：
          indicator_name_list: [],  // 与用户之前选择的项目关联的指标名称
          test_indicator_index: 0,  // 用于测试指标的picker下标
          indicator_unit_list: [],  // 与用户之前选择的项目关联的指标单位
          indicator_value_list: [],  // 用户之前输入的指标数值
          training_class: 也要判断
          */
          that.data.old_item_info = wx.getStorageSync('want_edit_item')
          console.log('要修改的项目信息')
          console.log(that.data.old_item_info)
          var old_item_name = that.data.old_item_info.training_name
          var the_index_name = that.data.old_item_info.meta_id  // 这里的meta_id与该项目在meta列表里的序号相同
          for (var i = 0; i < that.data.amount_meta; i++) {
            if (that.data.meta_list[i].training_name == old_item_name) {  // 符合条件的i是这个项目在meta_list中的位置
              //that.data.indicator_name_list 是这个项目关联指标的名称
              //that.data.indicator_unit_list 是这个项目关联指标的单位
              var index = []
              index = index.concat(that.data.meta_list[i].index1)
              index = index.concat(that.data.meta_list[i].index2)
              index = index.concat(that.data.meta_list[i].index3)
              index = index.concat(that.data.meta_list[i].index4)
              index = index.concat(that.data.meta_list[i].index5)
              index = index.concat(that.data.meta_list[i].index6)
              var the_indicator_name_list = []
              for (var j = 0; j < 6; ++j) {   // 6是用户在给项目关联指标的上限数目
                if (index[j] != '无') {
                  the_indicator_name_list = the_indicator_name_list.concat(index[j])
                }
              }
              // 确定这个项目关联指标的单位
              /*
              the_indicator_name_list代表跟这个项目关联的指标名称
              that.data.indicator_nameMAPunit: { 'distance': 'km', 'time': 'min', 'weigh':'kg', 'frequency':'number/min', 'friction':'N', 'rest_time':'min', 'amount':'number'}
              */
              var the_indicator_unit_list = []
              for (var t1 = 0; t1 < the_indicator_name_list.length; t1++) {
                var unit = that.data.indicator_nameMAPunit[the_indicator_name_list[t1]]
                the_indicator_unit_list = the_indicator_unit_list.concat(unit)
              }
              console.log('当做背景的unit为：')
              console.log(the_indicator_unit_list)
              that.setData({
                indicator_name_list: the_indicator_name_list,
                indicator_unit_list: the_indicator_unit_list,
              })
            }
          }
          var the_indicator_value_list = []
          the_indicator_value_list = the_indicator_value_list.concat(that.data.old_item_info.data1)
          the_indicator_value_list = the_indicator_value_list.concat(that.data.old_item_info.data2)
          the_indicator_value_list = the_indicator_value_list.concat(that.data.old_item_info.data3)
          the_indicator_value_list = the_indicator_value_list.concat(that.data.old_item_info.data4)
          the_indicator_value_list = the_indicator_value_list.concat(that.data.old_item_info.data5)
          the_indicator_value_list = the_indicator_value_list.concat(that.data.old_item_info.data6)
          that.setData({
            old_item_info: that.data.old_item_info,
            indicator_value_list: the_indicator_value_list,
            index_name: the_index_name,
            item_index: options.item_index,   // 要修改的项目的在references的下标
            test_indicator_index: that.data.old_item_info.test_index,
            edit: true,
          })
          if (options.training_class == '测试') {
            that.setData({
              training_class: 1,
            })
          }
          console.log('要修改的项目信息')
          console.log(that.data.old_item_info)
          console.log('用户之前输入的指标数值为')
          console.log(that.data.indicator_value_list)
        } else if (options.flag == 'add') {
          if (options.training_class == '测试') {
            that.setData({
              training_class: 1,
            })
          }
          that.setData({
            'old_item_info.training_name': ''
          })
        }
        // 初始化项目指标
        var item_name = that.data.train_item_list[0]
        // 去meta_list里去找这个项目的关联指标
        for (var i = 0; i < that.data.amount_meta; i++) {
          if (that.data.meta_list[i].training_name == item_name) {  // 符合条件的i是这个项目在meta_list中的位置
            //that.data.indicator_name_list 是这个项目关联指标的名称
            //that.data.indicator_unit_list 是这个项目关联指标的单位
            var index = []
            index = index.concat(that.data.meta_list[i].index1)
            index = index.concat(that.data.meta_list[i].index2)
            index = index.concat(that.data.meta_list[i].index3)
            index = index.concat(that.data.meta_list[i].index4)
            index = index.concat(that.data.meta_list[i].index5)
            index = index.concat(that.data.meta_list[i].index6)
            var the_indicator_name_list = []
            for (var j = 0; j < 6; ++j) {   // 6是用户在给项目关联指标的上限数目
              if (index[j] != '无') {
                the_indicator_name_list = the_indicator_name_list.concat(index[j])
              }
            }
            // 确定这个项目关联指标的单位
            var the_indicator_unit_list = []
            for (var t1 = 0; t1 < the_indicator_name_list.length; t1++) {
              var unit = that.data.indicator_nameMAPunit[the_indicator_name_list[t1]]
              the_indicator_unit_list = the_indicator_unit_list.concat(unit)
            }
            console.log('当做背景的unit为：')
            console.log(the_indicator_unit_list)
            that.setData({
              'train_item_info.meta_id': i,
              'train_item_info.training_name': item_name,
              indicator_name_list: the_indicator_name_list,
              indicator_unit_list: the_indicator_unit_list,
            })
          }
        }
        that.setData({
          index_name: 0,
        })

      },
      fail:function(res) {
        console.log(res)
      }
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
  onShow: function (options) {

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