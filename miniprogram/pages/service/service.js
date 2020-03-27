const app = getApp();
Page({
  data: {
    goodsList: [{
      goods_id: 1,
      goods_type: '类型1',
      mainPicture: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84002.jpg',
      goods_pictures: [{
        id: 0,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
      }, {
        id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
      }, {
        id: 2,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
      }, {
        id: 3,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
      }],
      goods_name: '商品01',
      goods_introduction: '测试测试测试测试测试测试测试测试测试测试测试',
      goods_manufactor: '不知道',
      goods_date: '2020/3/26 23:02',
      goods_price: 10,
    }, {
      goods_id: 1,
      goods_type: '类型2',
      mainPicture: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
      goods_pictures: [{
        id: 0,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
      }, {
        id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
      }, {
        id: 2,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
      }, {
        id: 3,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
      }],
      goods_name: '商品02',
      goods_introduction: '测试2测试测2试测2试测2试测试测试测试测试测试测试',
      goods_manufactor: '不知道2',
      goods_date: '2020/3/26 23:22',
      goods_price: 20,
    }, {
      goods_id: 1,
      goods_type: '类型3',
      mainPicture: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
      goods_pictures: [{
        id: 0,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
      }, {
        id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
      }, {
        id: 2,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
      }, {
        id: 3,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
      }],
      goods_name: '商品03',
      goods_introduction: '3测试3测试测试测试测试测试测试测试测试测试测试',
      goods_manufactor: '不知道3',
      goods_date: '2020/3/26 23:33',
      goods_price: 30,
    }, {
      goods_id: 1,
      goods_type: '类型4',
      mainPicture: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
      goods_pictures: [{
        id: 0,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
      }, {
        id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
      }, {
        id: 2,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
      }, {
        id: 3,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
      }],
      goods_name: '商品04',
      goods_introduction: '4测试测试测试测试测试测试测试测试测试测试测试4',
      goods_manufactor: '不知道4',
      goods_date: '2020/3/26 23:44',
      goods_price: 40,
    }],
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    iconList: [{
      icon: 'cartfill',
      color: 'red',
      badge: 0,
      name: '代购'
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
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '排行榜'
    }, {
      icon: 'clothesfill',
      color: 'blue',
      badge: 0,
      name: '皮肤'
    }, {
      icon: 'discoverfill',
      color: 'purple',
      badge: 0,
      name: '发现'
    }, {
      icon: 'questionfill',
      color: 'mauve',
      badge: 0,
      name: '帮助'
    }, {
      icon: 'commandfill',
      color: 'purple',
      badge: 0,
      name: '问答'
    }, {
      icon: 'brandfill',
      color: 'mauve',
      badge: 0,
      name: '版权'
    }],
    gridCol: 3,
    skin: false
  },

  onLoad: function (options) {
  },

  goService: function (e) {
    switch (e.target.dataset.index) {
      case 0:
        wx.navigateTo({
          url: 'shopping/shopping',
        })
      break;
    }
  }

})