// pages/questionnaire/questionnaire.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    sex:[
      {value: '男', checked: 'true'},
      {value: '女'},
    ],
    study:[
      {value: 'HTML'},
      {value: 'JAVA', checked: 'true'},
      {value: 'CSS'},
      {value: 'Web'},
      {value: 'Js',},
      {value: 'Vue'}
    ],
    advice: ''
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
  bindAdvice(e){
    this.setData({
      name: e.currentTarget.dataset.name
    })
  },
  bindName(e){
    this.setData({
    advice: e.currentTarget.dataset.advice
  })
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const sex = this.data.sex
    for (let i = 0, len = sex.length; i < len; ++i) {
      sex[i].checked = sex[i].value === e.detail.value
    }
    this.setData({
      sex
    })
  },
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    const study = this.data.study
    const values = e.detail.value
    for (let i = 0, lenI = study.length; i < lenI; ++i) {
      study[i].checked = false
      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (study[i].value === values[j]) {
          study[i].checked = true
          break
        }
      }
    }
    this.setData({
      study
    })
  },
  submit(){
    wx.showModal({
      title: '信息提交',
      content: '确认提交信息？',
      confirmText: "确定",
      cancelText: "不了",
      success: function (res) {
          if (res.confirm) {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 1000
          });
          }else{
            return console.log('不操作')
          }
      }
    })
  }
  // submit: function(e){
  //   wx.request({
  //     method: 'POST',
  //     url: 'http://127.0.0.1:3000/',
  //     data: e.detail.value,
  //     success: function(res){
  //       console.log(res)
  //     }
  //   })
  // }
})