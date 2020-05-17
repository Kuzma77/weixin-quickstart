// pages/wyy/wyy.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tab: 0,
    silderList:[
      {
      id:1,
      src:'../../images/music/01.jpg'
    },
    {
      id:2,
      src:'../../images/music/02.jpg'
    },
    {
      id:3,
      src:'../../images/music/03.jpg'
    }],
    swiperCurrent: 0,
    playList:[],
    state:'paused',
    playIndex:0,
    play:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    wx.request( {
      url: 'http://localhost:8080/api/music/all',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function( res ) {
        that.setData({
          playList: res.data
        })
        console.log( res.data )
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var audioCtx = wx.createInnerAudioContext();
    this.setMusic(0)
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
  changeItem:function(e){
    this.setData({
      tab: e.currentTarget.dataset.item
    })
  },
  setMusic:function(index){
    this.setData({
      playIndex: index
    })
  }
})