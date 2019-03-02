
// pages/index/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad: function (options) {
    var that = this;
    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.onError(function(){
      wx.showToast({
        title: '录音失败',
      })
    });
    this.recorderManager.onStop(function(res){
      that.setData({
        src: res.tempFilePath
      })
      console.log(res.tempFilePath )
      wx.showToast({
        title: '录音成功',
      })
    });

    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError((res) => {
      that.tip("播放录音失败！")
    })
    this.wechatlogin();
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
/**微信登录并获取userinfo*/
  , wechatlogin: function () {
    wx.login({
      success(res) {
        wx.showToast({
          title: "登录成功",
        })
        }
        })
  }

  /**
  * 提示
  */
  , tip: function (msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false
    })
  }

  /**
   * 录制mp3音频
  */
  , startRecordMp3: function () {
    this.recorderManager.start({
      format: 'mp3'
    });
  }

  /**
   * 停止录音
   */
  ,stopRecord: function(){
    this.recorderManager.stop()
  }

  /**
   * 播放录音
   */
  , playRecord: function(){
    var that = this;
    var src = this.data.src;
    if (src == '') {
      this.tip("请先录音！")
      return;
    }
    this.innerAudioContext.src = this.data.src;
    this.innerAudioContext.play()
  }
  /*
显示文件路径
*/
  , showfilepath: function () {
    var that = this;
    var src = this.data.src;
    if (src == '') {
      this.tip("请先录音！")
      return;
    }
    this.tip(src)
  }
  /*上传文件函数*/
  , uploadToServer: function (file) {
    this.wechatlogin();
    wx.uploadFile({
      url: '这里填写server文件夹中index.php上传到远程服务器的链接',
      filePath: file,
      name: 'file',
      formData:{
       //formdata
      },
      success(file){
        wx.showToast({
          title: '恭喜,上传成功',
        })
      },
      fail(file){
        wx.showToast({
          title: '上传失败',
        })
      }
    })
  }
  /**上传文件 **/
  , readyUpload:function(){
     //var that=this;
     var src=this.data.src;
     this.uploadToServer(src)
  }

})
