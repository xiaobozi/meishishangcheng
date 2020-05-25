// pages/index2/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    json : '',
    num : 0,
    nums : 0
  },
  //点击+时,数量增加
  add(){
    this.setData({
      num : ++this.data.num
    })
  },
  //加入购物车的逻辑
  addtocart(){
    let {json,num} = this.data
    //当购物的数量为0时,跳过下面的逻辑,不加入购物车
    if(num == 0){
      wx.showToast({ title: '还没有购买商品'})
      return
    }
    this.setData({
      nums : num
    })
    wx.showToast({title: '成功加入购物车'})
      //当数量不为0时,调用setjson()方法设置本地存储 
    this.setjson(Object.assign(json,{num,checked : true}))
  },
  //跳转到购物车的页面
  tocart(){
      wx.switchTab({
        url: '/pages/cart/index',
      })
  },
  //设置本地存储
  setjson(json){
    //先获取本地存储中的goods,根据id判断是否存在该对象,如果存在该对象就进行更新,不存在就添加
    //如何在存入本地存储
    //如果本地存储没有goods,就添加一个goods本地存储并把 该对象加入
    wx.getStorage({key: 'goods',})
    .then(res => {
      let newgoods = res.data.filter(e => {
        if(e.id == json.id){
          json.num += e.num
        }
        return e.id != json.id
      });
      newgoods.push(json)
      this.setData({
        num : json.num,
        nums : json.num
      })
      wx.setStorageSync('goods',newgoods)},
      res => wx.setStorageSync('goods', [json]));
     
  },
  //选项卡的逻辑
  show(a){
    let {goods} = this.data
    goods = goods.map((e,i) =>{
      e.isActive = (i === a.currentTarget.dataset.item )? true : false
      return e
    })
    this.setData({goods})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //当其他页面跳入此页面时,调用传递过来的事件,且传入一个回调,接受数据
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    let fn = json => this.setData({json})
    eventChannel.emit("fn2",fn)
    let goods = [{
      title : '商品详情',
      text : this.data.json.detail,
      isActive : true
    },{
      title : '产品详情',
      text : this.data.json.parameter,
      isActive : false
    },{
      title : '售后保障',
      text : this.data.json.service,
      isActive : false
    },]

    this.setData({goods})
    let json = wx.getStorageSync('goods')
    //当没有这个本地数据时跳过下面的代码,才不会报错
    if(json){
      json.forEach(e => e.id == this.data.json.id && this.setData({num : e.num,nums : e.num}))
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