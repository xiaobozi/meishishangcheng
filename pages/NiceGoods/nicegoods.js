// pages/NiceGoods/nicegoods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    json : '',
  },
  //跳转到index2页面,把事件函数和数据传递过去,
  navi(e){
    wx.navigateTo({
      url: '/pages/index2/index',
      events : {
        fn2 : cb => cb(e.currentTarget.dataset.item) 
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //通过url传递过来的参数在optios中,通过模板字符串能拿到需要的数据
  onLoad: function (options) {
    let json = require(`./${options.home}.js`)
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