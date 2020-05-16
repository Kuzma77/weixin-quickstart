// components/myGood/myGood.
Component({
  /**
   * 组件的属性列表
   */
  options: {
    //styleIsolation: 'isolated',
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    head:{
      type:String
    },
    list:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  // externalClasses: ['my-container'],
  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function(e){
      var myEventDetail = e.currentTarget.dataset.item; // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  }
})
