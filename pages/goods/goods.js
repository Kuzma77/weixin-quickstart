// pages/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[{
      id:'1',
      name:'新款1',
      img:'/images/shoes/shoes-01.png',
      count: 1699
    },
    {
      id:'2',
      name:'新款2',
      img:'/images/shoes/shoes-02.png',
      count: 899
    },
    {
      id:'3',
      name:'新款3',
      img:'/images/shoes/shoes-03.png',
      count: 1299
    },
    {
      id:'4',
      name:'新款4',
      img:'/images/shoes/shoes-04.png',
      count: 899
    },
    {
      id:'5',
      name:'新款5',
      img:'/images/shoes/shoes-05.png',
      count: 1199
    }
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  onMyEvent: function(e){
    e.detail // 自定义组件触发事件时提供的detail对象
    console.log("您购买了"+e.detail)
    wx.navigateTo({ 
      url: '../../pages/detail/detail?item='+JSON.stringify(e.detail) 
    })
  }
})