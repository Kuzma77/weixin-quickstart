//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // const app = express()
    // app.use(bodyParse.json())
    // app.post('/',(req,res) => {
    //   console.log(req.body)
    //   res.json(req.body)
    // })
    // app.listen(3000,() => {
    //   console.log('server running at http://127.0.0,1:3000')
    // })
  },
  globalData: {
    userInfo: null,
    audioId: '458348749',
    playList:[],
    play:{
      name:'那个短发姑娘(Demo)',
      al:{
        picUrl:'https://p1.music.126.net/IT1ESyrIKhtmCc1XkEsPiA==/109951162835935771.jpg'
      },
      ar:{
        name:'杨力'
      }
    }
  }
})