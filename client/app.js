//app.js
App({
  onLaunch: function () {
    wx.login({
     success(res){
       if(res.code){
         wx.request({
           url:'https://www.haixiaowen.com/wechat/miniapp.recorder/login',
           data:{
             code:res.code
           },
           success:function(res){
             if(res.data.openid){
               wx.setStorage({
                 key: 'openid',
                 data: res.data.openid,
               })
               console.log('openid:'+res.data.openid)
             }
           }
         })
         console.log('code获取成功')
       }else{
         console.log('code获取失败,登录不成功'+res.errMsg)
       }
     } 
    })
    /**检查版本更新 start*/
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log('是否有新版本:'+res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    /**检查版本更新 end */
  },
  globalData: {
    testdata:'这是测试数据'
  },
  TDATA:'测试数据'
})