// pages/wyy/wyy.js
const API = require('../../api')
const app = getApp();
const API_BASE_URL = 'http://localhost:3000';
const audioCtx = wx.createInnerAudioContext();
//const URL = 'http://m7.music.126.net/20200520121442/2a810e925558614c9cb98c36b322c7e6/ymusic/b71b/90a1/a8c1/086be29a8f5dc41752e70e1ef935a8ca.mp3'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tab: 0,
    banner:[],
    swiperCurrent: 0,
    playList:[],
    songsheet_index: [], //首页歌单列表前6
    songsheet: [], //歌单全部
    newsong_index: [], //首页最新音乐前6
    newsong: [], //最新音乐全部
    state:'paused',
    showTime1: '0:00',
    showTime2: '0:00',
    duration: 0,
    percent: 0,
    // play:{
    //   name:'那个短发姑娘(Demo)',
    //   al:{
    //     picUrl:'https://p1.music.126.net/IT1ESyrIKhtmCc1XkEsPiA==/109951162835935771.jpg'
    //   },
    //   ar:{
    //     name:'杨力'
    //   }
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if(options != null){
    // console.log(options);
    // const audioid = options.id; // onLoad()后获取到歌曲视频之类的id
    // this.changePlay(audioid); //把从wxml获取到的值传给play()
    // }
    let that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.setNavigationBarTitle({
      title: '音乐播放器',
    })
    console.log('onLoad')
    this.getBanner();
    this.getsongsheet();
    this.getNewSong();
    this.getPlayList()
  },
  getPlayList: function(){
    const lists = app.globalData.playList
    this.setData({
      playList:lists
    })
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
  getsongsheet: function() {
    API.getsongsheet({
      order: 'hot'
    }).then(res => {
      wx.hideLoading()
      if (res.code === 200) {
        console.log(res.playlists)
        this.setData({
          songsheet: res.playlists,
          songsheet_index: res.playlists.slice(0, 6)
        })
      }
    })
  },
  getNewSong: function() {
    API.getNewSong({}).then(res => {
      if (res.code === 200) {
        console.log(res.result)
        this.setData({
          newsong: res.result,
          newsong_index: res.result.slice(0, 6)
        })
      }
    })
  },
  go_newsong:function(){
    console.log(this.data.newsong)
    wx.navigateTo({
      url: '../../pages/wyy/newsongs'
    })
  },
  go_songsheet:function(){
    wx.navigateTo({
      url:'../../pages/wyy/songLists'
    })
  },
  handleSheet: function (event) { //event 对象，自带，点击事件后触发，event有type,target，timeStamp，currentTarget属性
    // console.log(event)
    const sheetId = event.currentTarget.dataset.id; //获取到event里面的歌曲id赋值给audioId
    wx.navigateTo({                                 //获取到id带着完整url后跳转到play页面
      url: `../../pages/wyy/moreSongs?id=${sheetId}`
    })
  },
  handlePlayAudio:function(e){
    const audioId = e.currentTarget.dataset.id; //获取到event里面的歌曲id赋值给audioId
    app.globalData.audioId = audioId
    this.handelId()
    // 请求歌曲音频的地址，失败则播放出错，成功则传值给createBgAudio(后台播放管理器，让其后台播放)
  },
  handelId:function(audioId){
    audioId =  app.globalData.audioId
    var list = {}
    list.audioId = audioId
    wx.request({
      url: API_BASE_URL + '/song/url',
      data: {
        id: audioId
      },
      success: res => {
        // console.log('歌曲音频url:',res)
        if (res.data.data[0].url === null) {  //如果是MV 电台 广告 之类的就提示播放出错，并返回首页
          // console.log('播放出错')
          wx.showModal({
            content: '服务器开了点小差~~',
            cancelColor: '#DE655C',
            confirmColor: '#DE655C',
            showCancel: false,
            confirmText: '返回',
            complete() {
              wx.switchTab({
                url: '/pages/wyy/index'
              })
            }
          })
        } else {
          console.log(res.data.data[0].url)
          list.url = res.data.data[0].url
          // this.data.audioCtx.src = res.data.data[0].url
          this.play(res.data.data[0].url)
        }
      }
    })
    
     //获取到歌曲音频，则显示出歌曲的名字，歌手的信息，即获取歌曲详情；如果失败，则播放出错。
     wx.request({
      url: API_BASE_URL + '/song/detail',
      data: {
        ids: audioId    //必选参数ids
      },
      success: res => {
        // console.log('歌曲详情', res);
        if (res.data.songs.length === 0) {
          // console.log('无法获取到资源')
          wx.showModal({
            content: '服务器开了点小差~~',
            cancelColor: '#DE655C',
            confirmColor: '#DE655C',
            showCancel: false,
            confirmText: '返回',
            complete() {
              wx.switchTab({
                url: '/pages/wyy/index'
              })
            }
          })
        } else {
          console.log(res.data.songs[0])
          this.setData({
            play: res.data.songs[0],  //获取到歌曲的详细内容，传给song
          })
          list.play = res.data.songs[0]
          const lists = []
          app.globalData.playList.forEach(element => {
          lists.push(element.audioId)
         });
         if(lists.indexOf(list.audioId) == -1){
           app.globalData.playList.push(list)
         }
         console.log(lists)
          this.getPlayList()
          // console.log(res.data.songs[0].name)
          //app.globalData.songName = res.data.songs[0].name;
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.setMusic(0)
    // this.setPlay(0)
    // this.getTime(0)
    //this.createAudio(URL)
    this.handelId()
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this
    audioCtx.onTimeUpdate(function (callback) {
      _this.setData({
        percent: audioCtx.currentTime
      })
      _this.changeShowTime1(_this.data.percent)
    })
    audioCtx.onEnded(function (callback) {
      _this.setData({
        percent: 0
      })
      audioCtx.play()
    })
    audioCtx.onSeeking(function (callback) {
      _this.setData({
        percent: audioCtx.currentTime
      })
      _this.changeShowTime1(_this.data.percent)
    })
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
  // setMusic:function(index){
  //   this.setData({
  //     playIndex: index
  //   })
  //   // console.log(this.data.audioCtx)
  //   // console.log(this.data.playList[index].src)
  //   // this.data.audioCtx.src = this.data.playList[index].src
  // },
  // setPlay:function(index){
  //   this.setData({
  //     play: this.data.playList[index]
  //   })
  // },
  // getTime:function(index){
  //   this.data.playList[index].time=this.data.audioCtx.duration
  //   console.log(this.data.playList[index].time)
  // },
  // silderChange:function(e){
  //   console.log(e.detail.value)
  // },
  setTime:function(){

  },
  //播放
  play:function(url){
    console.log(audioCtx.duration)
    //audioCtx.stop()
    audioCtx.src = url
    audioCtx.play()
    this.setData({
      state:'running',
      duration:audioCtx.duration
    })
    this.changeShowTime2(this.data.duration)
    this.changeShowTime1(this.data.percent)
    console.log(this.data.playList)
  },
  changePlay:function(audioId){
 // 请求歌曲音频的地址，失败则播放出错，成功则传值给createBgAudio(后台播放管理器，让其后台播放)
 wx.request({
  url: API_BASE_URL + '/song/url',
  data: {
    id: audioId
  },
  success: res => {
    // console.log('歌曲音频url:',res)
    if (res.data.data[0].url === null) {  //如果是MV 电台 广告 之类的就提示播放出错，并返回首页
      // console.log('播放出错')
      wx.showModal({
        content: '服务器开了点小差~~',
        cancelColor: '#DE655C',
        confirmColor: '#DE655C',
        showCancel: false,
        confirmText: '返回',
        complete() {
          wx.switchTab({
            url: '/pages/wyy/index'
          })
        }
      })
    } else {
      console.log(res.data.data[0].url)
      this.data.audioCtx.src = res.data.data[0].url
      this.play()
    }
  }
})

 //获取到歌曲音频，则显示出歌曲的名字，歌手的信息，即获取歌曲详情；如果失败，则播放出错。
 wx.request({
  url: API_BASE_URL + '/song/detail',
  data: {
    ids: audioId    //必选参数ids
  },
  success: res => {
    // console.log('歌曲详情', res);
    if (res.data.songs.length === 0) {
      // console.log('无法获取到资源')
      wx.showModal({
        content: '服务器开了点小差~~',
        cancelColor: '#DE655C',
        confirmColor: '#DE655C',
        showCancel: false,
        confirmText: '返回',
        complete() {
          wx.switchTab({
            url: '/pages/wyy/index'
          })
        }
      })
    } else {
      console.log(res.data.songs[0])
      this.setData({
        play: res.data.songs[0],  //获取到歌曲的详细内容，传给song
      })
      // console.log(res.data.songs[0].name)
      //app.globalData.songName = res.data.songs[0].name;
    }
  },
})
  },
  //暂停
  paused:function(){
    audioCtx.pause()
    this.setData({
      state:'paused'
    })
  },
  //下一首
  next:function(){
    var audioId = app.globalData.audioId
    var playList = app.globalData.playList
    for (let i = 0; i < playList.length; i++) {
      const id = playList[i].audioId;
      if(id === audioId ){
        if(i<playList.length-1){
          app.globalData.audioId = playList[i+1].audioId
          this.handelId()
        }else{
          app.globalData.audioId = playList[0].audioId
          this.handelId()
        }
      }
    }
    // var index = this.data.playIndex >= this.data.playList.length-1? 0:this.data.playIndex + 1
    // this.setMusic(index)
    // this.setPlay(index)
    this.play()
  },
  //上一首
  per:function(){
    var audioId = app.globalData.audioId
    var playList = app.globalData.playList
    for (let i = 0; i < playList.length; i++) {
      const id = playList[i].audioId;
      if(id === audioId){
        if(i>0){
           app.globalData.audioId = playList[i-1].audioId
        this.handelId()
        }else{
          app.globalData.audioId = playList[playList.length-1].audioId
          this.handelId()
        }
      }
    }
    // var index = this.data.playIndex <= 0? this.data.playList.length-1:this.data.playIndex - 1
    // this.setMusic(index)
    // this.setPlay(index)
    // this.play()
  },
  // changePlay:function(e){
  //   var index = e.currentTarget.dataset.id
  //   this.setMusic(index)
  //   this.setPlay(index)
  //   this.play()
  // }
  //进度条实现
  sliderChange:function(e){
    var second = e.detail.value
    audioCtx.seek(second)
  },
  //时间转化
  changeShowTime1:function(second){
    var a = Math.floor(second/60)
    var b = Math.floor((second-60*a))
    this.setData({
      showTime1: this.PrefixInteger(a,2)+":"+this.PrefixInteger(b,2)
    })
  },
  changeShowTime2:function(second){
    var a = Math.floor(second/60)
    var b = Math.floor((second-60*a))
    this.setData({
      showTime2: this.PrefixInteger(a,2)+":"+this.PrefixInteger(b,2)
    })
  },
  //自动补0
  PrefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}
})