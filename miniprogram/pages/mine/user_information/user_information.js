const app = getApp();
Page({

  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    submitflag: false,
    userDatabaseflag: false, //false 表示用户在数据库没有数据
    city: ['广东省', '广州市', '海珠区'],
    address: null,
    phoneNum: null,
    name: null,
    code: null,
    idNum: null,
    type:0,
    _id: null
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.queryDatabase(options);
  },

  submitFlagChange: function () {
    if (this.data.city && this.data.address && this.data.phoneNum){
      this.setData({
        submitflag : true
      })
    }else{
      this.setData({
        submitflag: false
      })
    }
  },

  submit: function(){
    console.log(this.data)
    if(this.data.userDatabaseflag){
      console.log("更新数据")
      this.upDatabase();
    }else{
      console.log("添加数据")
      this.addDatabase();
    }
  },

  addDatabase: function () {
    const db = wx.cloud.database()
    db.collection('user').add({
      data: {
        user_type: this.data.type,
        user_address: this.data.address,
        user_phoneNum: this.data.phoneNum,
        user_name: this.data.name,
        user_idNum: this.data.idNum,
        user_city:  this.data.city
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        console.log(res)
        wx.navigateBack({
          delta: 1
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

  queryDatabase: function (options) { //查询数据库，对应的openid，并回显示数据
    const db = wx.cloud.database()
    db.collection('user').where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        if(res.data.length > 0){
          this.setData({
            userDatabaseflag: true,
            address: res.data[0].user_address,
            city: res.data[0].user_city,
            idNum: res.data[0].user_idNum,
            name: res.data[0].user_name,
            phoneNum: res.data[0].user_phoneNum,
            type: res.data[0].user_type,
            _id: res.data[0]._id
          })
        }else{
          this.setData({
            name: options.name
          })
        }
        console.log(res)
        this.submitFlagChange();
        wx.hideLoading();
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  upDatabase: function () {
    const db = wx.cloud.database()
    db.collection('user').doc(this.data._id).update({
      data: {
        user_address: this.data.address,
        user_city: this.data.city,
        user_idNum: this.data.idNum,
        user_name: this.data.name,
        user_phoneNum: this.data.phoneNum
      },
      success: res => {
        wx.navigateBack({
          delta: 1
        })
      },
      fail: err => {
        console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },

  //获取用户输入数据
  getCity: function (e) { 
    this.setData({
      city: e.detail.value
    })
  },
  getAddress: function(e){
    this.setData({
      address: e.detail.value
    })
    this.submitFlagChange();
  },
  getName: function(e){
    this.setData({
      name: e.detail.value
    })
  },
  getPhoneNumber: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
    this.submitFlagChange();
  },
  getCode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  getIDNumber: function (e) {
    this.setData({
      idNum: e.detail.value
    })
  },

})