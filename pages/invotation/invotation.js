// pages/invotation/invotation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0,
    longitude: 0,
    time: (new Date()).toString(),
    objectArray: [
      {id: 5, unique: 'unique_5'},
      {id: 4, unique: 'unique_4'},
      {id: 3, unique: 'unique_3'},
      {id: 2, unique: 'unique_2'},
      {id: 1, unique: 'unique_1'},
      {id: 0, unique: 'unique_0'},
    ],
    numberArray: [1, 2, 3, 4],
    data: { loading: false },
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
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        var latitude = res.latitude // 纬度
        var longitude = res.longitude // 经度
        this.setData({
          latitude: latitude,
          longitude: longitude
        })
      }
    })
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
    console.log('下拉')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('触底')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  },
  markertap:function(e){
    console.log(e)
       var latitude = e.detail.value.latitude // 纬度
        var longitude = e.detail.value.longitude // 经度
        this.setData({
          latitude: latitude,
          longitude: longitude
        })
  },
  scantap:function(){
    this.setData({

      loading: true

    })
    // wx.scanCode({
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
    wx.getNetworkType({

      success: function(res) {

        // networkType字段的有效值：

        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        console.log(res.networkType)
        if (res.networkType == 'wifi') {

          // 从网络上下载pdf文档

          wx.downloadFile({

            url:'http://test.com/somefile.pdf',

            success: function (res) {

              // 下载成功之后进行预览文档

              wx.openDocument({

                filePath: res.tempFilePath

              })

            }

          })

        } else {

          wx.showToast({ title: '当前为非Wifi环境' })

        }
      }
    })
  },
  switch: function(e) {
    const length = this.data.objectArray.length
    for (let i = 0; i < length; ++i) {
      const x = Math.floor(Math.random() * length)
      const y = Math.floor(Math.random() * length)
      const temp = this.data.objectArray[x]
      this.data.objectArray[x] = this.data.objectArray[y]
      this.data.objectArray[y] = temp
    }
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addToFront: function(e) {
    const length = this.data.objectArray.length
    this.data.objectArray = [{id: length, unique: 'unique_' + length}].concat(this.data.objectArray)
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addNumberToFront: function(e){
    this.data.numberArray = [ this.data.numberArray.length + 1 ].concat(this.data.numberArray)
    this.setData({
      numberArray: this.data.numberArray
    })
  }
})