// pages/index5/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin : false,
    user : '',
    address : ''
  },
  //前往设置收货地址的方法
  toaddress(){
    //调取wx提供的方法进入收货地址的页面,当用户确定后,更新视图,且把该地址信息存入本地存储
    wx.chooseAddress({
      success: (res) => {
        this.setData({address : res})
        wx.setStorageSync("address",res)
      },
    })
  },
  //login方法获取用户信息,设置本地存储login,
  //并获取本地存储的地址信息,更新视图
  login(){
    wx.getUserInfo({
      success: (res) => {
        this.setData({user : res.userInfo, isLogin : true})
        wx.setStorageSync('login', true)
      },
    })
    this.setData({address :wx.getStorageSync('address')})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断是否登录了,若登录了调取login方法
      if( wx.getStorageSync('login')){
        this.login()
      }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  //每次页面展示是,更新页面
  onShow: function () {
    this.onLoad()
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