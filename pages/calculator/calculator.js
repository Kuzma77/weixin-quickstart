// pages/calculator/calculator.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: '0',
    num1: 0,
    num2: 0,
    
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
  bindText: function(e){
    if(this.data.result === '0'){
      var arr = ['+','-','*','/','%']
      if(arr.indexOf(e.currentTarget.dataset.text)!=-1){
        return
      }else{
        this.setData({
          result: e.currentTarget.dataset.text
        })
      }
    }else{
      this.setData({
        result: this.data.result.concat(e.currentTarget.dataset.text)
      })
    }
   
  },
  bindDel: function(){
    if(this.data.result.length===1){
      this.setData({
        result: '0'
      })
    }else{
    this.setData({
      result: this.data.result.slice(0,-1)
    })
  }
  },
  bindZero:function(){
    this.setData({
      result: '0'
    })
  },
  bindResult:function(){
    if(this.data.result.indexOf('+') != -1 ){
      var numArray = this.data.result.split('+')
      this.setData({
        result: Number(Number(numArray[0])+Number(numArray[1])).toFixed(2),
      })
    }
    else if(this.data.result.indexOf('-') != -1 ){
      var numArray = this.data.result.split('-')
      this.setData({
        result: Number(Number(numArray[0])-Number(numArray[1])).toFixed(2),
      })
    }
    else if(this.data.result.indexOf('*') != -1 ){
      var numArray = this.data.result.split('*')
      this.setData({
        result: Number(Number(numArray[0])*Number(numArray[1])).toFixed(2),
      })
    }
    else if(this.data.result.indexOf('/') != -1 ){
      var numArray = this.data.result.split('/')
      this.setData({
        result: Number(Number(numArray[0])/Number(numArray[1])).toFixed(2),
      })
    }
    else if(this.data.result.indexOf('%') != -1 ){
      var numArray = this.data.result.split('%')
      this.setData({
        result: Number(Number(numArray[0])%Number(numArray[1])).toFixed(2),
      })
    }
  }
})