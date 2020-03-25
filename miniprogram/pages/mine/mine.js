const app = getApp();
Page({

  data: {
    userInfo:null,
    loadModal:true,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    List01: [{ //横向列表
      icon: 'cardboardfill',
      color: 'red',
      badge: 120,
      name: 'VR'
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 1,
      name: '录像'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '图像'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 22,
      name: '通知'
    }],
    List02: [{ //纵向列表
      icon: 'edit',
      color: 'gray',
      name: '个人信息'
    }],
  },

  onLoad:function(){
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask:true
    })
   
    if (!app.globalData.openid) { //判断openid已经获取
      app.callback = () => {
        console.log('再次回调', app.globalData.openid);
      };
    }

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
              wx.hideLoading()
            }
          })
        }
      }
    })
  },

  bindtapList01: function (e) {
    console.log(e)
  },

  bindtapList02:function(e){
    switch (e.target.dataset.index){
      case 0:
        wx.navigateTo({
          url: 'user_information/user_information?name=' + this.data.userInfo.nickName,
        })
      break;
    }
  }

})