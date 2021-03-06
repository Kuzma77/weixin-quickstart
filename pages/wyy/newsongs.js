// pages/wyy/songs.js
const API = require('../../api')
const app = getApp();
const API_BASE_URL = 'http://localhost:3000';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songs:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    this.getNewSong();
   wx.setNavigationBarTitle({
     title: '最新音乐',
   })
  },
  getNewSong: function () {
    API.getNewSong({}).then(res => {
      wx.hideLoading()
      if (res.code === 200) {
        this.setData({
          newsong: res.result
        })
      }
    })
  },

  // 获取到歌曲ID
  handlePlayAudio: function (event) {
    const audioId = event.currentTarget.dataset.id; //获取到event里面的歌曲id赋值给audioId
    app.globalData.audioId = audioId
    wx.navigateTo({                                 //获取到id带着完整url后跳转到play页面
      url: '../../pages/wyy/index'
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