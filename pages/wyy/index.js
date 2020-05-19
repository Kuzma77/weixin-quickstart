// pages/wyy/wyy.js
const API = require('../../api')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tab: 0,
    banner:[],
    swiperCurrent: 0,
    audioCtx:null,
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
    var audioCtx = wx.createInnerAudioContext();
    this.setData({
      audioCtx : audioCtx,
    })
    this.getBanner()
  },
  getBanner: function() {
    API.getBanner({
      type: 2
    }).then(res => {
      if (res.code === 200) { //更加严谨
        this.setData({
          banner: res.banners
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setMusic(0)
    this.setPlay(0)
    this.getTime(0)
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
    console.log(this.data.audioCtx)
    console.log(this.data.playList[index].src)
    this.data.audioCtx.src = this.data.playList[index].src
  },
  setPlay:function(index){
    this.setData({
      play: this.data.playList[index]
    })
  },
  getTime:function(index){
    this.data.playList[index].time=this.data.audioCtx.duration
    console.log(this.data.playList[index].time)
  },
  silderChange:function(e){
    console.log(e.detail.value)
  },
  //播放
  play:function(){
    this.data.audioCtx.play()
    this.setData({
      state:'running'
    })
  },
  //暂停
  paused:function(){
    this.data.audioCtx.pause()
    this.setData({
      state:'paused'
    })
  },
  //下一首
  next:function(){
    var index = this.data.playIndex >= this.data.playList.length-1? 0:this.data.playIndex + 1
    this.setMusic(index)
    this.setPlay(index)
    this.play()
  },
  //上一首
  per:function(){
    var index = this.data.playIndex <= 0? this.data.playList.length-1:this.data.playIndex - 1
    this.setMusic(index)
    this.setPlay(index)
    this.play()
  },
  changePlay:function(e){
    var index = e.currentTarget.dataset.id
    this.setMusic(index)
    this.setPlay(index)
    this.play()
  }
})