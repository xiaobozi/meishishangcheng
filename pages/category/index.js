// pages/index3/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  //商品详情的选项卡逻辑
  show(e){
    let {i} = e.currentTarget.dataset
    let json = this.data.json.map((ele,idx)=>{
      ele.isActive = (i == idx) ?  true : false
      return ele
    })
    let active = this.data.json[i]
    this.setData({active,json})
  },
  //因为用了navigateTo,传递该对象,导致格式不一致,所以需要先格式下该对象在传递
  navi(e){
    let {item} = e.currentTarget.dataset
    let json2 = require("./details-data.js")
    let obj = json2[item.id]
    wx.navigateTo({
      url: '/pages/index2/index',
      events : {
        fn2 : cb => cb(obj) 
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    let json = require("./cate-detail.js")
    //页面加载时,给每个详情设置一个isActve属性来做选项卡
    json.forEach(e=>{
      e.isActive = false
    })
    let active = json[0]
      json[0].isActive = true
    this.setData({json,active})
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