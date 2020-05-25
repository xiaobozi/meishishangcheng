// pages/pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  //调取wx的方法,进入修改地址的页面,修改后会更新本地存储,my页面中地址页面更新
  toaddress(){
    wx.chooseAddress({
      success: (res) => {
        this.setData({address : res})
        wx.setStorageSync("address",res)
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取本地存储中的goods,过滤掉没有打钩的商品,通过checked属性
     let json =  wx.getStorageSync('goods').filter(e => e.checked)
     //默认地址是从本地存储中拿的,这样能实现和my的地址同步
     let address = wx.getStorageSync('address')
      if(address){address =  address}
     //计算总价并保留2个小位数
     let allprcie = json.reduce((pre, cur)=> pre+= (+cur.num * +cur.price),0).toFixed(2)
     //视图更新
     this.setData({json,allprcie,address})
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