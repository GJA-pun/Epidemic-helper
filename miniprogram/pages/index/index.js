const app = getApp();
Page({

  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    tabNav: ['新闻类型01', '新闻类型02', '新闻类型03']
  },
  
  onLoad: function (options) {
    this.getNews();
  },

  tabSelect(e) {
    console.log(e);
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } 
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

  getNews(){
    wx.request({
      url: 'http://v.juhe.cn/toutiao/index?type=top&key=6057e8978b7629b1a0d482e46a51f11e', 
      header: {
        'content-type': 'application/json' 
      },
      success(res) {
        console.log(res.data)
      }
    })
  }

  
 
})