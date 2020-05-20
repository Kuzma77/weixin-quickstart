// pages/wyy/moreSongs.js
const API = require('../../api')
const app = getApp();
const API_BASE_URL = 'http://localhost:3000';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    wx.setNavigationBarTitle({
      title: '歌单详情',
    })
    const sheetId = options.id;
    // console.log(sheetId)
    wx.request({
      url: API_BASE_URL + '/playlist/detail',
      data: {
        id: sheetId    //http://neteasecloudmusicapi.zhaoboy.com/song/url?id=xxx,id为必选参数
      },
      success: res => {
        // console.log(res.data.playlist.trackIds) //打印出歌曲ID数组
        // console.log(res.data.playlist.trackIds.length) //打印出歌曲ID数组长度
          
          // console.log(res.data.playlist.trackIds[i].id)
        const waitForPlay = new Array;
        for (let i = 0; i <= res.data.playlist.trackIds.length - 1;i++){ //循环打印出其id
          waitForPlay.push(res.data.playlist.trackIds[i].id) //循环push ID 到waitForPlay数组
          app.globalData.waitForPlaying = waitForPlay  //让waitForPlay数组给全局数组
          // console.log(app.globalData.waitForPlaying)
        }
        wx.hideLoading()
        this.setData({
          songList: res.data.playlist.tracks
        })  
      }
    })
  },
  handlePlayAudio: function (event) { //event 对象，自带，点击事件后触发，event有type,target，timeStamp，currentTarget属性
    // console.log(event)
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