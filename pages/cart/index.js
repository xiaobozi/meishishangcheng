// pages/index4/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allprcie : 0,
    allchecked : true
  },
  //+按钮的逻辑事件
  //根据传过来的对象的id进行数量的增加,调用setgoods,视图更新
  add(e){
    let {item} = e.currentTarget.dataset
    let newjson = this.data.json.map(e =>{
      if(e.id === item.id) e.num++
      return e
    })
    this.setgoods(newjson)
  },
  //－按钮的逻辑事件
  //根据传过来的对象的id进行数量的减少,且当数量0时,弹窗让用户是否删除该商品
  //在调用setgoods,视图更新
  subtract(e){
    let {item} = e.currentTarget.dataset
    if(item.num === 1){
      wx.showModal({
        success: (result) => {
            if(!result.cancel){
              let newjson = this.data.json.filter(e =>e.id != item.id)
              this.setgoods(newjson)
            }
          },
        title: '是否要删除商品',
      })
    }else{
      let newjson = this.data.json.map(e =>{
        if(e.id === item.id) e.num-- 
        return e
      })
      this.setgoods(newjson)
    }
  },
  //封装了一个设置本地存储和判断购物车是否为空,且调用了计算总价的函数
  //接受一个参数,该参数为更新过的json
  //通过该参数的length判断购物车是否为空,且重新计算总价
  setgoods(json){
    let flag = !json.length
    this.setData({json,flag})
    wx.setStorageSync('goods', json)
    this.computed(json)
  },
  //×按钮的逻辑事件,根据传过来的参数的id,进行过滤,在调取setgoods更新视图
  remove(e){
    let {item} = e.currentTarget.dataset
    let newjson = this.data.json.filter(e =>e.id != item.id)
    this.setgoods(newjson)
  },
  //全选按钮的逻辑事件
  //点击该按钮是,checked值取反,并更新所有的商品的checked属性,在调取setgoods视图更新
  allselect(){
    let {json,allchecked} = this.data
      allchecked = !allchecked
      json.forEach(e => e.checked = allchecked)
      this.setgoods(json)
      this.setData({allchecked})
  },
  //判断单选逻辑
  //根据传递的参数,取反该对象的checked,然后调取setgoods进行视图更新
  //在调取isallchecked判断是否全选
  select(e){
    let {item} = e.currentTarget.dataset
    let {json} = this.data
    json.forEach(e => e.id === item.id ? e.checked = !e.checked : '')
    this.setgoods(json)
    this.isallchecked(json)
  },
  //判断全选的函数
  isallchecked(json){
    this.setData({allchecked : json.every(e => e.checked)})
  },
  //计算总价的函数
  computed(json){
    let allprcie = json.reduce((pre, cur) =>cur.checked ? pre+=(+cur.price * +cur.num) : pre,0).toFixed(2)
    this.setData({allprcie})
  },
  //前往支付的页面
  topayment(){
    //没有商品时不能前往支付页面
    if(!this.data.json || !this.data.json.filter(e => e.checked).length){
      wx.showToast({
        title: '没有选中商品',
      })
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  },
   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //页面加载先获取本地存储的"goods",若没有则购物车为空
    wx.getStorage({key: 'goods'})
    .then(res =>{
      let json = res.data
      this.setgoods(json)
      this.isallchecked(json)
    },
      res => this.setData({flag : true}))
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  //每次切换该页面时,需要重新更新视图
  onShow: function () {
    wx.getStorage({key: 'goods'})
    .then(res =>{
      let json = res.data
      this.setgoods(json)
      this.isallchecked(json)
    },
      res => this.setData({flag : true}))
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