// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  userdata:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
    var openid = wx.getStorageSync('openid');
    var nick=wx.getStorageSync('nick');
    //console.log(openid);
    wx.request({
      url: 'https://www.haixiaowen.com/wechat/miniapp.recorder/read',
      data:{
        'openid':openid,
        'nick':nick
      },
      success:function(res){
       // var result=res;
       // console.log(result);
       wx.setStorage({
         key: 'userdata1',
         data: res.data,
       })
       // var userdata=res.data
        
        //console.log(res.data);
        
        res.data.forEach(function(item,index){
          console.log(item);
        })
       
        
      }

    })
      */   
     
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
    var that=this;
    var openid = wx.getStorageSync('openid');
    var nick = wx.getStorageSync('nick');
    wx.showLoading({
      title:'加载中'
    })
    wx.request({
      url:'https://www.haixiaowen.com/wechat/miniapp.recorder/read',
      //url: 'http://172.16.0.62/wechat/miniapp.recorder/read',
      data:{
        'openid': openid,
        'nick': nick
      },
      success: function (res) {
        wx.hideLoading()
        // var result=res;
        // console.log(result);
        wx.setStorage({
          key: 'userdata',
          data: res.data,
        })
        var userdata = res.data
        console.log(userdata)
        that.setData({
          userdata: res.data
        })
    }
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
    var that = this;
    var openid = wx.getStorageSync('openid');
    var nick = wx.getStorageSync('nick');
    wx.showLoading({
      title: '加载中'
    })
    wx.request({
      url: 'https://www.haixiaowen.com/wechat/miniapp.recorder/read',
      //url: 'http://172.16.0.62/wechat/miniapp.recorder/read',
      data: {
        'openid': openid,
        'nick': nick
      },
      success: function (res) {
        wx.hideLoading()
        // var result=res;
        // console.log(result);
        wx.setStorage({
          key: 'userdata',
          data: res.data,
        })
        var userdata = res.data
        that.setData({
          userdata: res.data
        })
      }
    })
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
  play: function (e) {
    //添加音效
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true  // 是否自动开始播放，默认为 false
    innerAudioContext.loop = false  // 是否循环播放，默认为 false
    wx.setInnerAudioOption({ // ios在静音状态下能够正常播放音效
      obeyMuteSwitch: false,   // 是否遵循系统静音开关，默认为 true。当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音。
      success: function (e) {
        console.log(e)
        console.log('play success')
      },
      fail: function (e) {
        console.log(e)
        console.log('play fail')
      }
    })
    innerAudioContext.src = e.target.dataset.uri;  // 音频资源的地址
    innerAudioContext.onPlay(() => {  // 监听音频播放事件
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => { // 监听音频播放错误事件
      console.log(res.errMsg)
      console.log(res.errCode)
    })

  }
})