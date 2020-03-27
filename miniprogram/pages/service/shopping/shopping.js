const app = getApp()
Page({
  data: {
    load: true,
    showGoodsFlag: false,
    showShoppingCartFlag: false,
    showSubmitModalFlag: false,
    goodsOpenType: 'goods',
    goods: null,
    goodsQuantity: 1,
    typeList: [
      { type: "类型1", id: 0 },
      { type: "类型2", id: 1 },
      { type: "类型3", id: 2 },
      { type: "类型4", id: 3 }],
    goodsList: [],
    scList: [],
    scTotalPrice: 0,
    scId: null,
    billIntroduction: null,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    cardCur: 0,
  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    this.queryGoodsDatabase(function(){
      wx.hideLoading()
    });
  },
  onReady() {
    
  },
  //商品类型列表
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let typeList = this.data.typeList;
    let tabHeight = 0;
    if (this.data.load) { //初始化 Main滚动栏
      for (let i = 0; i < typeList.length; i++) { //逐个获取选项卡 组件信息
        let view = wx.createSelectorQuery().select("#main-" + typeList[i].id);
        view.fields({
          size: true
        }, data => {
          typeList[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          typeList[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        typeList: typeList
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < typeList.length; i++) {
      if (scrollTop > typeList[i].top && scrollTop < typeList[i].bottom) {
        that.setData({
          VerticalNavTop: (typeList[i].id - 1) * 50,
          TabCur: typeList[i].id
        })
        return false
      }
    }
  },
  //展示商品的轮播图
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  towerSwiper(index) {
    let list = this.data.goodsList[index].goods_pictures;
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },
  //数据获取
  addGoodsQuantity(){
    this.setData({
      goodsQuantity: this.data.goodsQuantity + 1
    })
  },
  reduceGoodsQuantity(){
    if(this.data.goodsQuantity > 1){
      this.setData({
        goodsQuantity: this.data.goodsQuantity - 1
      })
    }
  },
  getBillIntroduction(e){
    this.setData({
      billIntroduction: e.detail.value
    })
  },
  //弹框开关设置
  showSubmitModal(){
    if (this.data.scList.length){
      this.setData({
        showSubmitModalFlag: true
      })
    }
  },
  closeSubmitModal(){
    this.setData({
      showSubmitModalFlag: false
    })
  },
  showShoppingCart(e) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    this.querySCDatabase(function(){
      wx.hideLoading()
    });
    this.setData({
      showShoppingCartFlag: true
    })
  },
  closeShoppingCart(e) {
    this.setData({
      showShoppingCartFlag: false,
      scTotalPrice: 0
    })
  },
  showGoods(e){
    if (e.currentTarget.dataset.type === 'goods'){
      this.towerSwiper(e.currentTarget.dataset.index);
      let goods = this.data.goodsList[e.currentTarget.dataset.index];
      this.setData({
        goods: goods,
        showGoodsFlag: true,
        goodsOpenType: e.currentTarget.dataset.type
      })
    } else if (e.currentTarget.dataset.type === 'sc'){
      var goodsId = e.currentTarget.dataset.goodsid
      for(var i=0;i<this.data.goodsList.length;i++){
        if(this.data.goodsList[i]._id === goodsId){
          this.towerSwiper(i);
          let goods = this.data.goodsList[i];
          this.setData({
            goods: goods,
            showGoodsFlag: true,
            goodsOpenType: e.currentTarget.dataset.type,
            scId: e.currentTarget.dataset.scid,
            goodsQuantity: e.currentTarget.dataset.quantity
          })
          break;
        }
      }
    }
    
  },
  closeGoods(e) {
    this.setData({
      showGoodsFlag: false,
      goodsQuantity: 1
    })
  },
  //数据库操作
  queryGoodsDatabase: function (callback) { //查询所以goods信息
    const db = wx.cloud.database()
    db.collection('goods').get({
      success: res => {
        var goodsList = res.data
        for(var i=0;i<res.data.length;i++){
          var date = res.data[i].goods_date
          var string = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate()
          goodsList[i].goods_date = string
        }
        this.setData({
          goodsList: goodsList
        })
        callback();
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
  addSCDatabase: function (goods, callback) { //添加商品到购物车
    const db = wx.cloud.database()
    db.collection('shopping_cart').add({
      data: {
        sc_goodsId: goods._id,
        sc_goodsName: goods.goods_name,
        sc_goodsMainPicture: goods.goods_mainPicture,
        sc_quantity: this.data.goodsQuantity,
        sc_price: this.data.goodsQuantity*goods.goods_price,
      },
      success: res => {
        callback();
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
  querySCDatabase: function (callback) { //查询当前用户，的购物车信息
    const db = wx.cloud.database()
    db.collection('shopping_cart').where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        var scTotalPrice = 0;
        for(var i=0;i<res.data.length;i++){
          scTotalPrice += res.data[i].sc_price
        }
        this.setData({
          scList: res.data,
          scTotalPrice: scTotalPrice
        })
        callback();
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
  deleteOneSCDatabase: function (id,callback) { //删除购物车中一个商品
    const db = wx.cloud.database()
    db.collection('shopping_cart').doc(id).remove({
      success: res => {
        callback();
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '删除失败',
        })
        console.error('[数据库] [删除记录] 失败：', err)
      }
    })
  },
  addBillDatabase: function (data, callback) { //添加订单
    const db = wx.cloud.database()
    db.collection('bill').add({
      data: {
        bill_introduction: data.bill_introduction,
        bill_type: 'shopping',
        bill_date: new Date(),
        bill_state: 0,
        bill_receiptUserId: '',
        bill_receiptUserName: '',
        bill_receiptUserAvatarUrl: '',
        bill_scId: data.bill_scId,
        bill_price: data.bill_price,
        bill_userName: app.globalData.nickName,
        bill_userAvatarUrl: app.globalData.avatarUrl
      },
      success: res => {
        callback();
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

  submitShoppingCart(e){
    if(this.data.billIntroduction == '' || this.data.billIntroduction == null){
      wx.showToast({
        title: '请填写简介内容',
        icon: 'none'
      })
    }else{
      wx.showLoading({
        title: '提交中...',
      })
      var that = this
      var scId = []
      for(var i=0;i<this.data.scList.length;i++){
        scId[i] = this.data.scList[i]._id
      }
      var data = {
        bill_introduction: this.data.billIntroduction,
        bill_scId: scId,
        bill_price: this.data.scTotalPrice
      }
      this.addBillDatabase(data,function(){
        wx.hideLoading()
        that.closeSubmitModal()
        wx.showToast({
          title: '提交成功',
        })
      })
    }
    
  },
  cleanShoppingCart(e){
    var that = this
    if(this.data.scList.length){
      wx.showLoading({
        title: '清理中....',
      })
      wx.cloud.callFunction({
        // 云函数名称
        name: 'massDeletionDatabase',
        // 传给云函数的参数
        data: {
          listName: "shopping_cart",
          indexName: "_openid",
          indexData: app.globalData.openid
        },
        success: function (res) {
          that.querySCDatabase(function () {
            that.setData({
              showShoppingCartFlag: true
            })
          });
          wx.hideLoading()
        },
        fail: console.error
      })
    }
    
  },
  addShopppingCart(e){
    var that = this
    wx.showLoading({
      title: '添加中..',
    })
    this.addSCDatabase(this.data.goods,function(){
      wx.hideLoading()
      wx.showToast({
        title: '已添加',
      })
      that.setData({
        goodsQuantity: 1
      })
      that.closeGoods()
    })
  },
  deleteShopppingCart(e){
    var that = this
    this.deleteOneSCDatabase(this.data.scId,function(){
      that.closeGoods()
      that.querySCDatabase(function () {
        that.setData({
          showShoppingCartFlag: true
        })
      });
    })
  }

})