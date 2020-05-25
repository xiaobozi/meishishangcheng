// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  //跳转到index2页面的函数,并且传递一个事件函数,并把需要传递的数据作为实参,下一个页面进行回调接受
  navi(e){
    let json = require("../category/details-data")
    let obj = json[e.currentTarget.dataset.item.id]
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
  //页面初始化渲染
  onLoad: function (options) {
      let json = require("./newest.js").newest
      this.setData({json})
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
    console.log(wx)
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