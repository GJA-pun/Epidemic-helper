const app = getApp();
Page({

  data: {
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    tabNav: ['新闻类型01', '新闻类型02', '新闻类型03']
  },
  
  onLoad: function (options) {
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
  }
 
})