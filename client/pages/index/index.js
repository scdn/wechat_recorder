
// pages/index/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function (options) {
    
    var that = this;
    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.onError(function(){
      wx.showToast({
        title: '录音失败',
        icon:'none'
      })
    });
    this.recorderManager.onStop(function(res){
      that.setData({
        src: res.tempFilePath
      });
      console.log(res.tempFilePath);
      wx.showToast({
        title: '录音成功',
      })
    });

    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError((res) => {
      wx.showToast({
        title: '请先录音',
        icon:'none'
      })
    })
    
   // this.wechatlogin();
   /**授权登录 开始**/
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              wx.setStorage({
                key: 'nick',
                data: res.userInfo.nickName
              })
              console.log(res.userInfo.nickName);
            }
          })
        }
      }
      /**失败 开始**/
      
      ,fail(res) {
        wx.showModal({
          title: '授权失败',
          content: '请开启"使用我的用户信息"',
          confirmText: '去设置',
          success(res) {
            res.confirm && wx.openSetting({
              success: function (res) {
                res.authSetting['scope.userInfo'] && wx.getUserInfo({
                  success: function (res) {
                    wx.setStorage({
                      key: 'nick',
                      data: res.userInfo.nickName
                    })
                  }
                })

              }
            })
          }
        })
      }
    
    
  
      /**失败结束 */
    })
   /**授权登录 结束 */
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
/**微信登录并获取userinfo*/
  wechatlogin: function () {
    wx.login({
      success(res) {
        wx.showToast({
          title: "登录成功",
        })
        }
        })
  }, 
  /**
  * 提示
  */
  tip: function (msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false
    })
  },

  /**
   * 录制mp3音频
  */
 startRecord: function () {
    this.recorderManager.start({
      format: 'mp3'
    });
  },
  /**
   * 停止录音
   */
  stopRecord: function(){
    this.recorderManager.stop()
  }, 
  /**
   * 播放录音
   */
  playRecord: function(){
    var that = this;
    //var src = this.data.src;
    if (that.data.src == '') {
      this.tip("请先录音！")
      return;
    }
    console.log(that.data.src);
    this.innerAudioContext.src = that.data.src;
    this.innerAudioContext.play()
  },
  /**结束播放 */
  stopPlay:function(){
    var that=this;
    this.innerAudioContext.src = that.data.src;
    this.innerAudioContext.stop()
  },
  /**播放/暂停切换**/
  mainHandle: function () {
    var that = this;
    console.log('测试' + that.data.src);
    if (that.data.src.paused) {
      that.data.src.play;
      that.setData({
        test: '123'
      })
    }
  }
  /*上传文件函数*/
   /*上传文件函数*/
   ,uploadToServer: function (file) {
    wx.uploadFile({
      url:'http://172.16.0.62/wechat/miniapp.recorder',
      filePath: file,
      name: 'file',
      formData: {
        'nick':wx.getStorageSync('nick'),
        'openid':wx.getStorageSync('openid')
      },
      success(res) {
        wx.showToast({
          title:res.data,
          //title: '恭喜,上传成功',
        }),
        console.log(res);
      },
      fail(res) {
        wx.showToast({
          title: '请先录音',
          icon:'none'
        })
      }
    })
  }
  /**上传文件 **/
  , readyUpload: function () {
    //var that=this;
    var src = this.data.src;
    this.uploadToServer(src)
  },
  bindGetUserInfo:function(e){
    console.log(e.detail.userInfo)
  }

})
